#!/usr/bin/env bash
# SubagentStop フック（new-component-v2 の実装→評価ループ用）。
#
# 作業ツリーを変更したサブエージェント（＝Generator）の完了後に、決定的な検証
# （typecheck / lint / test）を走らせて結果を記録する。Evaluator はこの結果を読み、
# 失敗を「高 finding」として verdict に反映する。
#
# 冪等: `git status` のハッシュで変更の有無を判定し、変化が無いとき（例: コードを
# 変更しない Evaluator の完了後）はスキップする。Orchestrator 側の段取りは不要。
#
# 非ブロッキング: 常に exit 0。合否のゲートは Evaluator が担う（ここは記録だけ）。
set -u

BASE="${TMPDIR:-/tmp}/mitsubachi-agent-loop"
mkdir -p "$BASE"
OUT="$BASE/latest-checks.txt"
HASHFILE="$BASE/last-status-hash"

# フックのペイロード(stdin)を読み捨てて、書き込み側がブロックしないようにする。
cat >/dev/null 2>&1 || true

# 前回実行から作業ツリーが変わったときだけ動く（新規ファイルも拾うため porcelain）。
HASH=$(git status --porcelain 2>/dev/null | shasum 2>/dev/null | awk '{print $1}')
[ -n "$HASH" ] || exit 0
[ "$HASH" = "$(cat "$HASHFILE" 2>/dev/null)" ] && exit 0
printf '%s' "$HASH" > "$HASHFILE"

run() {
  printf '## npm run %s\n' "$1"
  if npm run "$1" >"$BASE/_chk.out" 2>&1; then
    printf 'RESULT: PASS\n\n'
  else
    printf 'RESULT: FAIL\n'
    tail -n 40 "$BASE/_chk.out"
    printf '\n'
  fi
}

{
  printf '# deterministic verification\n\n'
  run typecheck
  run lint
  run test
} > "$OUT" 2>&1

exit 0
