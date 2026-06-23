# Generator: mi- コンポーネント実装手順

`new-component`（Orchestrator）から Generator サブエージェントとして起動されたときに読む実装手順。
**目的は、`plan.md` を満たし、前ラウンドの評価（`eval-round-*.md`）の高 finding を解消する実装/修正を行うこと。**

> あなたは実装担当。**コミットはしない。評価もしない。** 編集して、変更点を短く報告して終わる。

## 最初に読むもの

- `$WORKDIR/plan.md` … 作るもの・公開 API・React 版との対応・Figma 値・手本コンポーネント
- 2ラウンド目以降: `$WORKDIR/eval-round-<前round>.md` … **高 finding を最優先で潰す**
- 手本にする既存 `mi-` コンポーネント（plan.md 記載）… 実装規約はこれに倣う

規約は推測で補わない。CSS・アクセシビリティ・フォーム連携などの細則は `docs/review-checklist.md`、
イベントは `docs/event-architecture.md`、Storybook は `docs/storybook-autodocs.md` を参照する。

## ファイル構成（docs/component-guide.md より）

```
src/components/<kebab-case>/
├── base.ts              # バリアントが複数ある場合の共通ベースクラス
├── <name>.styles.ts     # Lit css タグによるスタイル定義
├── mi-<name>.ts         # 公開コンポーネント（カスタム要素登録含む）
└── index.ts             # 必要に応じて

stories/<kebab-case>/mi-<name>.story.ts
tests/<kebab-case>/mi-<name>.test.ts
```

## 実装方針

`plan.md` の API を実装する。細かな手順を機械的に踏むより、**手本コンポーネントの作りに揃える**ことを優先する。
判断に迷ったら手本と docs を正とし、勝手な独自パターンを持ち込まない。

押さえる勘所（詳細は `docs/review-checklist.md` の各番号）:

- **スタイル**: `*.styles.ts` に Lit の `css` タグで記述。値は design token を使い、ハードコードを避ける（「7. CSS設計」）。
- **CSS 細則**: 論理プロパティ、`:focus-visible`、`:host`、class 名セレクタ（「7」）。
- **アクセシビリティ**: セマンティック HTML、必要な ARIA、Shadow DOM 越えのフォーカス管理（「3」）。
- **プロパティ**: `@property` / `@state` の使い分け。`reflect: true` のとき `attribute` でケバブケース名を明示（「4」「5」）。
- **フォーム連携**: 値を送信するなら `static formAssociated = true` + `ElementInternals`（「6」）。
- **API**: `plan.md` の通り。React 版と揃える部分は名前・型・デフォルト値まで一致させる。

## 登録

- 新コンポーネントを `src/index.ts` にエクスポート追加する。
- 既存の `sp-*` / `Sp*` エイリアス系列なら後方互換のため維持する（「8」）。

## Story とテスト

- Story は `stories/` の既存に倣い、`docs/storybook-autodocs.md` のルールに従う（`!dev-only` 必須、autodocs 任意、イベント公開時の Actions 連携）。
- テストは `tests/` の既存に倣う。

## 報告（Orchestrator に返す出力）

- **編集したファイルのパス一覧**
- 各変更の**短い要約**（diff 全文は貼らない）
- 前ラウンドの高 finding に対し、**どれをどう直したか**を1行ずつ
- 対応しなかった finding があれば理由（中/低で見送り、等）

## Gotchas

実装でつまずいた点をここに足していく（気づくたび1行追加する）。

- `eval-round-*.md` の **高 finding を最優先**。中/低 に時間を使って高を残すと、次ラウンドでまた FAIL になる。
- token のハードコードは Evaluator に「7. CSS設計」で必ず拾われる。最初から token を使う。
- `reflect: true` のプロパティで `attribute` を省くと属性名が全小文字になり「5」で指摘される。camelCase は明示する。
- スコープ外のリファクタはしない。`plan.md` にない変更は diff を汚し、評価の焦点をぼかす。
