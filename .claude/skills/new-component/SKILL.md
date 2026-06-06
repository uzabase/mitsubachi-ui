---
name: new-component
description: >
  新しい mi- Web Component を実装する。Figma と（あれば）React 版を参照元に、
  docs/component-guide.md のファイル構成と docs の各規約に従って実装する。
  ユーザーがコンポーネントの新規実装・追加を求めたときに使う。
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
---

# New Component

新しい `mi-` コンポーネントを実装する手順。**まず計画を示し、ユーザーの承認後に実装に入る。**

## 全体ルール

- ユーザーは JS / TS にあまり詳しくない。実装方針や判断は平易に説明する。
- 参照元（CLAUDE.md の通り）:
  - **API 設計 = React 版と対等に揃える**（両方にある機能はプロパティ名・型・イベント名・デフォルト値を一致させる。片方にしか無い機能はその版を正とし、無理に揃えない）
  - **実装規約 = 既存の `mi-` コンポーネント**（`src/components/` 配下に倣う）
- 規約は推測で補わず、必ず該当 docs を読んでから実装する。

## 手順

### 1. 入力の確認
ユーザーから渡されるもの: Figma URL、（あれば）React 版コンポーネントの path。
- Figma が渡されたら、デザインの値（余白・色・タイポ・状態）を把握する（MCP 経由で取得できるものは取得）。
- React 版があれば、公開 API（props・型・イベント・デフォルト値）を把握する。
- 似た既存コンポーネントを `src/components/` から探し、実装の手本にする。

### 2. 計画の提示（実装前に止まる）
以下を簡潔に示し、**承認を得てから実装に入る**:
- 作るファイル一式（下記ファイル構成に沿って）
- 公開する API（プロパティ・属性・スロット・イベント）と、React 版との対応関係
  （揃える部分と、どちらかにしか無い部分があればその理由）
- イベントを公開する場合は `docs/event-architecture.md` の方針に照らした判断
  （カスタムイベントは原則作らない。必要なら理由を述べ、チーム議論が要る旨を伝える）

### 3. 実装
`docs/component-guide.md` のファイル構成に従う:
```
src/components/<kebab-case>/
├── base.ts              # バリアントが複数ある場合の共通ベースクラス
├── <name>.styles.ts     # Lit css タグによるスタイル定義
├── mi-<name>.ts         # 公開コンポーネント（カスタム要素登録含む）
└── index.ts             # 必要に応じて

stories/<kebab-case>/mi-<name>.story.ts
tests/<kebab-case>/mi-<name>.test.ts
```
- スタイルは `*.styles.ts` に Lit の `css` タグで記述。値は design token を使い、ハードコードを避ける。
- CSS の細則（論理プロパティ、:focus-visible、:host、class名セレクタ等）は `docs/review-checklist.md` の「7. CSS設計」に従う。
- アクセシビリティ（セマンティック HTML、ARIA、フォーカス管理）は同「3. アクセシビリティ」に従う。
- `@property` / `@state` の使い分け、reflect 時の attribute 明示は同「4」「5」に従う。
- フォーム連携が必要なら同「6. フォーム連携」（formAssociated / ElementInternals）に従う。

### 4. 登録
- 新コンポーネントを `src/index.ts` にエクスポート追加する。
- 既存の `sp-*` / `Sp*` エイリアスがある系列なら、後方互換のため維持する（`docs/review-checklist.md`「8」）。

### 5. Story とテストの雛形
- Story は `stories/` 配下の既存に倣い、`docs/storybook-autodocs.md` のルール（`!dev-only` 必須、autodocs は任意、イベント公開時の Actions 連携）に従う。
- テストは `tests/` 配下の既存に倣う。

## 完了後

実装が一通りできたら、レビューは `/review-component` を、コミット〜PR は `/commit-pr` を使うよう案内する。
