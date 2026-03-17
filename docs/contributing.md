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

## PR前の確認

PRを作成する前に、以下を実行してエラーがないことを確認してください。

```bash
npm run lint
npm run format:prettier:check
npm run typecheck
npm run test
```

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

- `dist/` のコミットはGitHub Actionで自動実行される（手動コミット不要）
- リリースは `npm run release:patch` / `npm run release:minor` / `npm run release:major`
