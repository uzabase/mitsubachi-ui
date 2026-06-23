---
name: commit-pr
description: >
  変更を確認・コミットし、push して PR を作成する（PR前チェック→コミット→push→PR）。
  Trigger on「コミットして」「PR作って」「プッシュして」「これで上げて」「変更を反映して」
  など、変更を確定して共有する依頼。新規実装・レビューそのものは使わない
  （/new-component・/review-component）。
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash
---

# Commit / Push / PR

**必ず `docs/commit-push-pr.md` を読み、その手順に従って実行する。** 以下は要約。

## 重要な原則（先に守る）

- **PR前の確認（lint / format / typecheck / test / build）が全て通るまでコミットしない。** エラーが出たら止めて報告する。
- **`dist/` をコミットに含める。** `npm run build` 実行後に `dist/` をステージングする（理由は `docs/contributing.md` の「dist/ を Git で追跡する理由」）。
- **push と PR 作成は破壊的・公開的な操作。実行前に必ずユーザーの承認を取る。** コミットメッセージ案・PR本文案を先に提示し、承認後に実行する。

## 手順

### 1. 変更内容の把握
- `git status` と `git diff` で変更を確認する。

### 2. PR前の確認
以下を順に実行し、エラーがないことを確認する:
```
npm run lint
npm run format:prettier:check
npm run typecheck
npm run test
npm run build
```
いずれか失敗したら、そこで止めてユーザーに報告する（コミットに進まない）。

### 3. コミット（メッセージは承認後）
- フォーマット: `<type>(<scope>): <概要>`（type/scope は英語、概要は日本語1文）
- type: refactor（見た目変わらず）/ fix（見た目変わる・バグ修正）/ feat / docs / test / chore
- 変更ファイル + `dist/` をステージング。
- **コミットメッセージ案を提示し、承認を得てからコミットする。**
- Story を変更した場合は `docs/storybook-autodocs.md` の「PR提出前チェック（dev-only）」を確認。

### 4. プッシュ（承認後）
- `git push -u origin <ブランチ名>`。**実行前に承認を取る。**

### 5. PR作成（承認後）
- `git diff main...HEAD` と `git log main..HEAD` で全体を把握。
- `docs/commit-push-pr.md` の PR本文フォーマットに従って本文を構成する。
  - 概要 / 変更内容 は記入。変更の影響・参考リンクはプレースホルダーのまま（ユーザーが手動記入）。
- PRタイトルはコミットルール形式。ベースブランチは `main`。
- **PR本文案を提示し、承認を得てから** `gh pr create` で作成する。
- 作成後、PR の URL を表示する。
