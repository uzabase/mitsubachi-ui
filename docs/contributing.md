# Contributing Guide

mitsubachi-ui（Web Components / Lit ベースのデザインシステムコンポーネントライブラリ）の開発ガイドです。

## 技術スタック

- フレームワーク: Lit 3
- 言語: TypeScript
- ビルドツール: Vite
- UIドキュメント: Storybook 10
- テスト: Vitest + Playwright (Browser Mode)
- リント: ESLint + Stylelint
- フォーマット: Prettier

## ディレクトリ構造

```
src/
├── components/             # UIコンポーネント
│   ├── button/             # kebab-case ディレクトリ
│   │   ├── base.ts         # 共通ベースクラス（内部用）
│   │   ├── button.styles.ts # Lit css タグによるスタイル定義
│   │   ├── mi-neutral-button.ts  # 公開コンポーネント
│   │   ├── mi-danger-button.ts
│   │   └── mi-icon-button.ts
│   ├── styles.ts           # makeStyles() ヘルパー（reset + foundation）
│   └── foundation.css      # 全コンポーネント共通の基盤スタイル
├── index.ts                # エントリーポイント（全コンポーネントをexport）
stories/                    # Storybook（src外のルートに配置）
├── button/
│   ├── mi-neutral-button.story.ts
│   └── mi-danger-button.story.ts
└── ...
tests/                      # テスト（src外のルートに配置）
├── button/
│   └── mi-button.test.ts
└── ...
```

## 開発コマンド

```bash
# Storybook起動
npm run storybook

# テスト
npm run test

# 型チェック
npm run typecheck

# リント・フォーマット
npm run lint              # ESLintチェック
npm run lint:fix          # ESLint自動修正
npm run format            # Prettier + Stylelint適用
npm run format:prettier:check  # フォーマットチェック

# ビルド
npm run build
```

## コミット・プッシュ・PRのワークフロー

一連の作業手順は [docs/commit-push-pr.md](./commit-push-pr.md) を参照してください。

## PR前の確認

PRを作成する前に、以下を実行してエラーがないことを確認してください。

```bash
npm run lint
npm run format:prettier:check
npm run typecheck
npm run test
npm run build
```

**Story を追加・変更した場合**は、[storybook-autodocs.md](./storybook-autodocs.md) を確認する。`!dev-only` がすべてのストーリーに含まれていることに加え、コンポーネントがカスタムイベントを公開しているときは同ドキュメントの「イベント（カスタムイベント）の実装チェック」に沿って Storybook Actions との対応と動作確認を行うこと。

## コミットルール

### フォーマット

```
<type>(<scope>): <概要>
```

- `type` と `scope` は英語
- `概要` は日本語で、変更内容を端的な1文にまとめる

### type（タイプ）

- refactor: UIの見た目が変わらない変更
- fix: UIの見た目が変わる変更、バグ修正
- feat: 新機能追加
- docs: ドキュメントのみの変更
- test: テストの追加・修正
- chore: ビルド・設定の変更

### 例

```
feat(Dialog): ActionDialogコンポーネントを追加
refactor(Button): デザイントークンをCSS変数に置き換え
fix(Tooltip): ホバー時の表示位置ずれを修正
```

## レスポンシブ対応

- PCファーストで設計
- ブレイクポイントは **720px の1箇所のみ**

## CI / リリース

### dist/ を Git で追跡する理由

一般的には npm に `dist/` 内のファイルをアップロードして配布するが、ミツバチは **リポジトリから直接インストール** する構成のため、リポジトリ内に `dist/` を置いている。そのため `dist/` は Git で追跡し、コミットに含める。

### dist/ の運用

- **`dist/` はソース変更と合わせてコミットする**（`npm run build` 後に `dist/` をステージング・コミットする。PRでビルド結果を確認できるようにする）
- main への push 時、GitHub Action が不足分があれば `dist/` を更新してコミットする（バックアップ運用）

### リリース

- リリースは `npm run release:patch` / `npm run release:minor` / `npm run release:major`
