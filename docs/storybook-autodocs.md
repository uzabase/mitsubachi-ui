# Storybook autodocs ルール

autodocs の利用はコンポーネントごとに任意とする。

## PR 提出前チェック（dev-only）

preview のデフォルトで全ストーリーに `dev-only` が付くため、`!dev-only` がないと本番 Storybook（GitHub Pages）でサイドバーに表示されない。

**PR を出す前に以下を確認する：**

- すべての `*.story.ts` で `tags` に **`!dev-only`** が含まれていること

### 確認方法

```bash
# !dev-only がないストーリーファイルを検出（何も出力されなければOK）
find stories -name "*.story.ts" -exec grep -L '!dev-only' {} \;
```

または、各ストーリーファイルを開き `tags: ["!dev-only"]` または `tags: ["autodocs", "!dev-only"]` を含むことを目視確認する。

## autodocs を使う場合

```ts
tags: ["autodocs", "!dev-only"],
```

### 注意事項

- **argTypes を明示する**: 表示したいプロパティは `argTypes` で制御（`control`, `description`, `table: { disable: true }` など）
- **本番表示**: `!dev-only` を必ず付与する（preview の `dev-only` を上書きして本番サイドバーに表示するため）
- **対象**: プロパティが多く、一覧性があるコンポーネントに向いている（例: Dialog 系）
- **custom-elements.json**: 現状 Storybook からは参照していない。Props は Story の `argTypes` が主な定義元

## autodocs を使わない場合

```ts
tags: ["!dev-only"],
```

### 注意事項

- **本番表示**: `!dev-only` を必ず付与する
- **title を明示する**: サイドバー表示のため `title: "ComponentName/mi-component-name"` を設定する（他コンポーネントに合わせる）
- **対象**: ストーリー中心で十分なコンポーネント、プロパティが少ないコンポーネントに向いている
