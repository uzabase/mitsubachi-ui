# コミット・プッシュ・PR作成ワークフロー

セッションコンテキストとGit履歴を活用して、コミット・プッシュ・プルリクエスト作成までの一連のワークフローを実行するためのガイドです。

## 手順

### 1. 変更内容の把握

- `git status` で変更ファイルを確認する
- `git diff` でステージ済み・未ステージの差分を確認する
- セッション中の作業コンテキストも活用する

### 2. PR前の確認

PR作成前に以下を実行し、エラーがないことを確認する（`npm run build` で `dist/` を生成する）。

```bash
npm run lint
npm run format:prettier:check
npm run typecheck
npm run test
npm run build
```

### 3. コミット

- `docs/contributing.md` のコミットルールに従ってコミットメッセージを作成する
- 変更ファイルと **`dist/`**（PR前の確認でビルド済み）をステージングし、コミットを実行する

#### コミットメッセージフォーマット

```
<type>(<scope>): <概要>
```

- `type` と `scope` は英語
- `概要` は日本語で、変更内容を端的な1文にまとめる

#### type（タイプ）

| type | 用途 |
| --- | --- |
| refactor | UIの見た目が変わらない変更 |
| fix | UIの見た目が変わる変更、バグ修正 |
| feat | 新機能追加 |
| docs | ドキュメントのみの変更 |
| test | テストの追加・修正 |
| chore | ビルド・設定の変更 |

#### 例

```
feat(Dialog): ActionDialogコンポーネントを追加
refactor(Button): デザイントークンをCSS変数に置き換え
fix(Tooltip): ホバー時の表示位置ずれを修正
```

### 4. プッシュ

- 現在のブランチをリモートにプッシュする（`-u` フラグ付き）

```bash
git push -u origin <ブランチ名>
```

### 5. PRの作成

- `git diff main...HEAD` と `git log main..HEAD` で全体の変更を把握する
- 以下のフォーマットに従ってPR本文を構成し、`gh pr create` で直接PRを作成する
- PRタイトルは `docs/contributing.md` のコミットルール形式に準拠する
- ベースブランチは `main` とする
- 作成したPRのURLを表示する

#### PR本文のフォーマット

```markdown
## 概要

## 変更内容

- hoge
- fuga

## 変更の影響

- 見た目の変更: 有り or 無し
- レビュワーに確認してほしいこと：有り or 無し

## 参考リンク

- Notion：（該当する場合にURLを記載）
- Figma：[変更したコンポーネント名](URL) // コンポーネントのFigma URL
```

#### 各セクションのルール

- **概要**: 必須。変更の目的と背景を簡潔に記載する
- **変更内容**: 必須。初見で理解できるよう具体的に書く
- **変更の影響**: プレースホルダーのみ記載する（手動で記入する）
- **参考リンク**: プレースホルダーのみ記載する（手動で記入する）

## 補足

- **`dist/` はソース変更と合わせてコミットする**（`npm run build` 実行後、`dist/` をステージングに含める）
- `docs/review-checklist.md` を参照し、PR前にセルフレビューを行うと良い
- **Story を変更した場合**: `docs/storybook-autodocs.md` の「PR 提出前チェック（dev-only）」を確認する
