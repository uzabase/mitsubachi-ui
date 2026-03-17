# Checkbox Text (`mi-checkbox-text`)

チェックボックスと選択肢のテキストを組み合わせたコンポーネント。
複数選択が可能。1つだけ選択する場合は Radio Button を使用してください。

## 使い方

```html
<mi-checkbox-text text="利用規約に同意する"></mi-checkbox-text>
```

### チェック済み

```html
<mi-checkbox-text text="オプションA" checked></mi-checkbox-text>
```

### 不確定状態（親チェックボックス等）

```html
<mi-checkbox-text text="すべて選択" indeterminate></mi-checkbox-text>
```

### 無効化

```html
<mi-checkbox-text text="変更不可" disabled></mi-checkbox-text>
```

### フォーム内での使用

`formAssociated` に対応しており、`<form>` の `FormData` に参加します。

```html
<form>
  <mi-checkbox-text name="agree" value="yes" text="同意する"></mi-checkbox-text>
  <button type="submit">送信</button>
</form>
```

## 属性

| 属性 | 型 | デフォルト | 説明 |
|---|---|---|---|
| `text` | `string` | `""` | テキストラベル |
| `checked` | `boolean` | `false` | チェック状態 |
| `indeterminate` | `boolean` | `false` | 不確定状態（一部チェック時など） |
| `disabled` | `boolean` | `false` | 無効化 |
| `name` | `string` | `""` | フォーム送信時の名前 |
| `value` | `string` | `""` | フォーム送信時の値 |

## イベント

| イベント名 | detail | 説明 |
|---|---|---|
| `change` | `{ checked: boolean, indeterminate: boolean }` | チェック状態が変化した時 |

## 状態

| 状態 | 見た目 |
|---|---|
| default | 未チェック・通常表示 |
| hover | チェックマーク周囲にアウトライン表示 |
| active | アウトラインが濃くなる |
| focus | 2リングシャドウ（白内環 + #191919 外環） |
| disabled | 背景・テキストがグレーアウト、操作不可 |
| checked | 青背景にチェックマーク |
| indeterminate | 青背景にハイフン |

## 関連コンポーネント

- `mi-checkbox` — テキストなしのチェックボックス単体
- `mi-radio-button-text` — 単一選択の場合はこちらを使用

## 後方互換性

旧タグ名 `sp-checkbox-text` も引き続き使用可能です（`SpCheckboxText` クラスが `MiCheckboxText` を継承）。
新規実装では `mi-checkbox-text` を使用してください。
