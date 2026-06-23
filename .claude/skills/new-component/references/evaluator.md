# Evaluator: mi- コンポーネント評価手順

`new-component`（Orchestrator）から Evaluator サブエージェントとして起動されたときに読む評価手順。
実装↔評価ループの評価担当。

> あなたは評価担当。**評価のみ。コードは絶対に修正しない。** 修正すると「実装と独立した評価」という
> ループの前提が壊れる。指摘を verdict ファイルに書いて、合否とパスだけ返して終わる。

## 手順

1. **決定的検証の結果をまず読む**。`$WORKDIR/checks-round-<round>.txt`（無ければ
   `${TMPDIR:-/tmp}/mitsubachi-agent-loop/latest-checks.txt`）に typecheck/lint/test の
   結果がある。Generator 完了時に SubagentStop フックが自動生成したもの。
   - **`RESULT: FAIL` の項目は、議論の余地なく「高 finding」**にする（客観的な地に足）。
     typecheck 失敗→「Web Standards / Lit」、lint 失敗→該当（CSS設計 等）、test 失敗→「テスト容易性」に紐づける。
   - ここはあなたが再評価する必要はない。**フックの結果をそのまま正とする**。
2. 起動プロンプトで渡された **変更ファイル一覧・`$WORKDIR/plan.md`・(あれば) Figma 差分**を読む。`git diff` で実際の変更も確認する。
3. **必ず `docs/review-checklist.md` を読み**、その10カテゴリ＋デザイン照合（Figma）で
   **主観的な判断**を評価する（API は直感的か・単一責任か・composability・a11y の意図など、
   動かすだけでは分からないこと）。客観項目（typecheck/lint/test で機械判定済み）は重複して指摘しない。
   - イベント関連は `docs/event-architecture.md`、Storybook は `docs/storybook-autodocs.md` を踏まえる。
   - 評価観点の正は `docs/review-checklist.md`。ここに観点を勝手に足さない。
4. 下の形式で `$WORKDIR/eval-round-<round>.md` に **verdict を書く**（フック由来の高 finding も含める）。
5. Orchestrator には **総合判定（PASS / FAIL）と verdict ファイルのパスだけ**返す（全文は返さない）。

## verdict の形式（eval-round-N.md）

```
## 評価サマリ
- 総合判定: PASS | FAIL
- ラウンド: N

## カテゴリ別
| 観点 | 判定 | 重要度 | 指摘（なぜ問題か / どう直すか） |
| API設計・開発者体験 | pass | -  | -
| コンポーネント設計   | pass | -  | -
| アクセシビリティ     | fail | 高 | …
| パフォーマンス       | pass | -  | -
| Web Standards / Lit | pass | -  | -
| フォーム連携         | n/a  | -  | -
| CSS設計             | fail | 中 | …
| 後方互換性           | pass | -  | -
| Storybook           | fail | 高 | !dev-only 欠落 …
| テスト容易性         | fail | 中 | …
| デザイン照合(Figma)  | fail | 高 | Figma値 → 実装値 …
```

判定が `n/a` の観点（例: フォーム送信しないコンポーネントの「フォーム連携」）は無理に finding を作らない。

## 判定ルール（ループの合否エンジン）

- **高 finding が1つでもあれば総合 FAIL**。Generator が次ラウンドで直す対象。
- **中 / 低 finding は報告のみ**。総合 FAIL にはしない（過剰反復を防ぐため）。
- 指摘は必ず「**なぜ問題か（平易に）**」「**どう直すか**」を添える。Generator がその1行だけ読んで直せる粒度で書く。

## 重要度の基準

ぶれると Generator の優先順位が崩れる。次を基準にする。

- **高**: ユーザー体験・アクセシビリティを壊す、API が plan.md / React 版と食い違う、`docs/` 規約違反（token ハードコード・`!dev-only` 欠落・論理プロパティ未使用 等）
- **中**: 規約には反しないが保守性・一貫性を下げる
- **低**: 好みの範囲、あれば良い程度

## Gotchas

評価でつまずいた点をここに足していく（気づくたび1行追加する）。

- diff が空なら Generator が保存し損ねている。空のまま PASS にせず、その旨を Orchestrator に返す。
- 「dist/ がコミットされている」等はプロジェクトの運用方針（`docs/contributing.md`）。運用に沿った差分を finding にしない。
- 高を付けすぎるとループが 3 ラウンドで終わらない。規約違反と体験破壊に絞る。
