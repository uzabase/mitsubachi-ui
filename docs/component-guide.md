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
- **ストーリー**: `stories/` 配下の既存ストーリーを参照。[storybook-autodocs.md](./storybook-autodocs.md) で autodocs の利用ルールと、カスタムイベントがある場合の Storybook Actions 連携チェックを確認
- **テスト**: `tests/` 配下の既存テストを参照

## 実装方針

コンポーネントの API は **HTML だけで組み立てられること** を優先する。
JavaScript でしか設定できないプロパティは最小限に留める。

### リストデータの表現

リスト的なデータは、配列プロパティ（`type: Array`）ではなく **子要素（slot）で表現する**。

```html
<!-- ○ slot 方式 -->
<mi-input-chip-group>
  <mi-input-chip label="Apple"></mi-input-chip>
  <mi-input-chip label="Banana"></mi-input-chip>
</mi-input-chip-group>
```

```js
// ✕ 配列プロパティ方式
group.items = [
  { id: "1", label: "Apple" },
  { id: "2", label: "Banana" },
];
```

理由：

- HTML だけで組み立てられる（JS 不要）
- Web 標準（`<select>` + `<option>` 等）と同じ設計思想

## チェック

- 新コンポーネントは `src/index.ts` にエクスポートを追加する
- 実装規約は [review-checklist.md](./review-checklist.md) を参照
- コミット時は [commit-push-pr.md](./commit-push-pr.md) に従い、`npm run build` 実行後に `dist/` を含める
