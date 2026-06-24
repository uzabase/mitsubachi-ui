---
name: new-component
description: >
  新しい mi- Web Component を実装→評価の自動ループで作成する。Figma と（あれば）
  React 版を参照元に、docs/component-guide.md のファイル構成と docs の各規約に従う。
  ユーザーがコンポーネントの新規実装・追加を求めたときに使う。
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Bash, Task
hooks:
  SubagentStop:
    - hooks:
        - type: command
          command: "bash .claude/skills/new-component/scripts/run-checks.sh"
---

# New Component

新しい `mi-` コンポーネントを **実装→評価の自動ループ** で作る。
このスキルを実行するあなたは Orchestrator。**自分では実装も評価もしない。**
実装は Generator サブエージェント、評価は Evaluator サブエージェントに委譲する。
中間生成物はファイルに書き、会話には**パスと短い要約だけ**を流す。

## 全体ルール

- ユーザーは JS / TS にあまり詳しくない。実装方針や判断は平易に説明する。
- 参照元（CLAUDE.md の通り）:
  - **API 設計 = React 版と対等に揃える**（両方にある機能はプロパティ名・型・イベント名・デフォルト値を一致させる。片方にしか無い機能はその版を正とし、無理に揃えない）
  - **実装規約 = 既存の `mi-` コンポーネント**（`src/components/` 配下に倣う）
- **実装↔評価ループは自動**で回す（各ラウンドの修正前に承認を挟まない）。
- **commit / push / PR は承認制**。ループ後にレポートを提示し、`/commit-pr` へ繋ぐ。

---

## 手順

### 0. 入力確認と作業ディレクトリ作成

ユーザーから渡されるもの: Figma URL、（あれば）React 版コンポーネントの path。

- Figma が渡されたら、デザインの値（余白・色・タイポ・状態）を把握する（MCP 経由で取得できるものは取得）。
- React 版があれば、公開 API（props・型・イベント・デフォルト値）を把握する。
- 似た既存コンポーネントを `src/components/` から探し、実装の手本にする。

リポジトリ外に作業ディレクトリを作る（**コミットしない**中間生成物の置き場）:

```bash
WORKDIR="${TMPDIR:-/tmp}/mitsubachi-agent-loop/<kebab-name>"
mkdir -p "$WORKDIR"
```

### 0.5. plan.md を書く（= 計画を Memory に保存）

`$WORKDIR/plan.md` に次を書く。各 Generator はこれを読んで実装する:

- 作るコンポーネント名（`mi-<name>`）と概要
- 公開 API（プロパティ・属性・スロット・イベント）と **React 版との対応**（揃える部分／各版固有の部分とその理由）
- Figma のデザイン値（あれば）
- 手本にする既存コンポーネントの path
- イベントを公開する場合は `docs/event-architecture.md` に照らした判断（カスタムイベントは原則作らない）

### 1〜4. 実装↔評価ループ（最大3ラウンド）

`round` を 1 から始め、以下を繰り返す。

**A. Generator サブエージェントを起動**（`Task`）。プロンプトに必ず次の4点を含める:

- **目的**: `$WORKDIR/plan.md` に沿って実装する。round≥2 なら `$WORKDIR/eval-round-<round-1>.md` の **高 finding を解消**する。
- **入力**: `plan.md` のパス、直近の `eval-round-*.md` のパス、手本コンポーネントの path。
- **出力形式**: 編集したファイルのパス一覧＋変更点の短い要約（diff 全文は返さない）。
- **境界**: 実装手順は `.claude/skills/new-component/references/generator.md` を読んで従う。`docs/` の規約に従う。**コミットはしない**。中/低 finding は任意対応。スコープ外のリファクタはしない。

**B. 差分の確定と自動検証**: `git status` / `git diff` で変更ファイルを把握する。
Generator が完了した時点で **SubagentStop フックが自動で `typecheck`/`lint`/`test` を実行**し、
結果を `${TMPDIR:-/tmp}/mitsubachi-agent-loop/latest-checks.txt` に書く。
この内容を round の記録として `$WORKDIR/checks-round-<round>.txt` にコピーしておく。
（`build` は重いのでループでは走らせない。コミット時に `/commit-pr` が検証する。）

**C. Evaluator サブエージェントを起動**（`Task`）。プロンプトに4点を含める:

- **目的**: 変更を `docs/review-checklist.md` の観点で評価し合否を判定する。
- **入力**: 変更ファイル一覧、`$WORKDIR/plan.md`、**検証結果 `$WORKDIR/checks-round-<round>.txt`**、（あれば）Figma 差分。
- **出力形式**: 構造化 verdict を `$WORKDIR/eval-round-<round>.md` に書き、**総合判定（PASS/FAIL）とパスだけ**を返す。
- **境界**: 評価手順は `.claude/skills/new-component/references/evaluator.md` を読んで従う。**評価のみ。コードは修正しない。**

**D. 判定**（`eval-round-<round>.md` を読む）:

- **PASS（高 finding = 0）** → ループ終了。
- **FAIL かつ round < 3 かつ 新規の高 finding あり** → `round++` して A へ。
- **round == 3** → 終了（未解決の高 finding を残す）。
- **新規の高 finding が出ない（収束 or 手詰まり）** → 終了。

> 高 finding が1つでもあれば FAIL。中/低 finding は報告のみでループは止めない。

### 5. 登録とレポート

- 新コンポーネントが `src/index.ts` にエクスポートされているか確認（Generator がやっていなければ補足指示）。
- 既存の `sp-*` / `Sp*` エイリアスがある系列なら、後方互換のため維持する（`docs/review-checklist.md`「8」）。
- **評価レポートを提示**: 各ラウンドの総合判定の推移、最終状態、残った中/低 finding（あれば）、未解決の高 finding（3ラウンドで終わった場合）。

## 完了後

レビューを対話でやり直したいときは `/review-component`、コミット〜PR は `/commit-pr` を案内する。
**コミットは承認制**——勝手にコミットしない。

## Gotchas

ループ運用でつまずいた点をここに足していく（気づくたび1行追加する）。

- Evaluator は **diff を見て評価する**。Generator が起動前に変更を確定（保存）していないと評価対象が空になる。B の `git diff` 確認を飛ばさない。
- サブエージェントには `eval-round-*.md` の**全文ではなくパスを渡す**。会話に貼ると round を重ねるほどトークンが膨らむ。
- PASS 判定は「**高 finding = 0**」であって「指摘ゼロ」ではない。中/低 が残っていてもループは PASS で抜ける。
- 3ラウンドで PASS しないまま終わるのは異常ではない。未解決の高 finding を**正直にレポートに残す**（隠して PASS 扱いにしない）。
