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

## PRタイトルとマージ

PR作成者は通常どおり変更内容を説明する。作業中のコミットメッセージは自由で、リリース用のファイル追加やバージョン更新は不要。
メンテナーがマージ前にPRタイトルを次の形式へ整え、**Squash and merge** する。最終コミットのタイトルがrelease-pleaseの判定に使われるため、マージ画面でも確認する。

| タイトル                                                                  | 次回リリースへの影響              |
| ------------------------------------------------------------------------- | --------------------------------- |
| `fix: ボタンの表示崩れを修正`                                             | patch（不具合修正）               |
| `feat: テキストエリアを追加`                                              | minor（互換性を保った機能追加）   |
| `feat!: TextFieldの属性を変更`                                            | major（利用側の修正が必要な変更） |
| `docs: 開発手順を更新`                                                    | 公開不要                          |
| `chore: CI設定を更新` / `test: テストを追加` / `refactor: 内部実装を整理` | 通常は公開不要                    |

`fix(Button): ...` のような英語のscopeは任意。説明は日本語でよい。破壊的変更は `fix!:` や `refactor!:` のようにどのtypeでも `!` を付け、PR本文に影響と移行方法を書く。互換性の判断が難しければ技術担当者に確認する。
本番依存の更新など、利用者へ公開する必要がある変更は内容に応じて `fix:` / `feat:` とする。

## レスポンシブ対応

- PCファーストで設計
- ブレイクポイントは **720px の1箇所のみ**

## CI / リリース

### リリース

1. メンテナーが変更PRのタイトルを整えてmainへSquash mergeする。
2. [Release package](../.github/workflows/publish.yml) がrelease-pleaseを実行し、リリースPRを自動作成・更新する。複数の変更PRをまとめて1回のリリースにできる。
3. リリースPRのバージョン・CHANGELOGを確認し、公開したいタイミングでマージする。`package.json`、`package-lock.json`、`.release-please-manifest.json` はこのPRで更新される。リリースPR専用のマージ前CIは実行しない。
4. Gitタグ（`v2.18.0`形式）とGitHub Releaseが作られ、そのタグのソースを自動で検査・テスト・ビルドする。失敗した場合はnpm公開へ進まない。
5. environment `npm` の公開承認後、検査済みの成果物をnpm Trusted Publishing（OIDC）で公開する。

通常の変更PRのマージではnpmへ公開しない。公開時にバージョンを書き換えたり、mainへcommitをpushしたりする処理はない。
GitHub Releaseの作成とnpm公開は別の段階なので、GitHub Releaseが存在してもnpmへ公開済みとは限らない。Actionsの結果とnpmで確認する。

### 公開に失敗した場合

- Actionsで失敗したジョブを再実行する。
- コード修正が必要なら変更PRと次のリリースPRを作る。公開済みタグの付け替えやnpm版の上書きはしない。

公式資料：[release-please](https://github.com/googleapis/release-please)、[GitHub Action](https://github.com/googleapis/release-please-action)。
