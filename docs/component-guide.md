# コンポーネント作成ガイド

## ファイル構成

```
src/components/<kebab-case>/
├── base.ts              # 共通ベースクラス（バリアントが複数ある場合）
├── <name>.styles.ts     # Lit css タグによるスタイル定義
├── mi-<name>.ts         # 公開コンポーネント（カスタム要素登録含む）
└── index.ts             # エクスポート（必要に応じて）

stories/<kebab-case>/
└── mi-<name>.story.ts

tests/<kebab-case>/
└── mi-<name>.test.ts
```

## 実装時の参考

- **コンポーネント**: `src/components/` 配下の既存実装を参照
- **スタイル**: `*.styles.ts` に Lit の `css` タグで記述（CSS規約は [review-checklist.md](./review-checklist.md) の「8. CSS設計」参照）
- **ストーリー**: `stories/` 配下の既存ストーリーを参照。[storybook-autodocs.md](./storybook-autodocs.md) で autodocs の利用ルールを確認
- **テスト**: `tests/` 配下の既存テストを参照

## チェック

- 新コンポーネントは `src/index.ts` にエクスポートを追加する
- 実装規約は [review-checklist.md](./review-checklist.md) を参照
- コミット時は [commit-push-pr.md](./commit-push-pr.md) に従い、`npm run build` 実行後に `dist/` を含める
