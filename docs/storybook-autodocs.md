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

### イベント（カスタムイベント）の実装チェック

コンポーネントが `dispatchEvent` で公開しているカスタムイベントは、ストーリー側で **Storybook Actions** と正しく結びついているかを確認する。実装とストーリーのイベント名・発火条件のずれは、利用者向けドキュメントの信頼性を損なう。

**確認項目**

- **`argTypes`**: 各イベントに `action: "<イベント名>"` を付け、`table: { category: "Events" }` などで Events として分かるようにする（イベント名はコンポーネント実装の `CustomEvent` 名と一致させる）
- **`args`**: 対応するハンドラに `action("<イベント名>")`（`storybook/actions`）を渡す。Lit の `@eventName` とストーリーでは `onEventName` のようにラップすることが多いが、`action` の文字列は **実際に発火するイベント名** と一致させる
- **型**: ストーリー専用に `Meta` の型を拡張し、`onXxx` を optional で足す（`MiActionDialogStory` のように `/** Storybook Actions 用（コンポーネントの公開 API 外） */` とコメントしてもよい）
- **動作確認**: Storybook を起動し、**Actions** パネルで操作したときに期待どおりログが出るか確認する（閉じ方によって `cancel` / `action` が出ないなど、仕様どおりの分岐があれば `parameters.docs.description.component` に短文で書く）

**参照実装**: `stories/dialog/mi-action-dialog.story.ts`（`onCancel` / `onAction` / `onOpenChange` と `cancel` / `action` / `open-change` の対応）

## autodocs を使わない場合

```ts
tags: ["!dev-only"],
```

### 注意事項

- **本番表示**: `!dev-only` を必ず付与する
- **title を明示する**: サイドバー表示のため `title: "ComponentName/mi-component-name"` を設定する（他コンポーネントに合わせる）
- **対象**: ストーリー中心で十分なコンポーネント、プロパティが少ないコンポーネントに向いている
- **イベント**: カスタムイベントを公開している場合は、上記「イベント（カスタムイベント）の実装チェック」に従い、`action` と Actions パネルでの確認を行う
