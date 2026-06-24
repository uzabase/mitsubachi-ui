# mi- コンポーネント評価ルーブリック

`new-component`（Orchestrator）から起動された Evaluator が、変更を1項目ずつ採点するための正典。
観点の出典は `docs/` であり、ここに勝手な観点を足さない。

## 列の見方

- **重要度**: 高(critical) / 中(major) / 低(minor)。
- **確認**: `hook` = 決定的検証（typecheck/lint/test）で機械判定済み → 結果をそのまま正とし再評価しない。`read` = コードを読んで判定する。
- **適用**: 常時／条件付き。条件に当たらなければ `n/a`。

## 採点ルール（ループの合否エンジン）

- 各項目に `pass / fail / n/a` ＋ 根拠1行 ＋ `[新規] / [継続]`（前ラウンドからの持ち越しか）を付ける。
- **高(critical) が1つでも fail なら総合 FAIL**。Generator が次ラウンドで直す対象。
- **中 / 低 は報告のみ**。総合 FAIL にはしない（過剰反復を防ぐ）。
- fail には必ず「なぜ問題か（平易に）」「どう直すか」を添える。Generator がその1行で直せる粒度にする。

---

## A. イベント設計　出典: `docs/event-architecture.md`

| ID | 評価項目（満たすべき状態） | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| A1 | 新規カスタムイベントを定義していない | `new CustomEvent(...)` の独自定義が無い。あるならチーム議論の根拠がPR/コメントに明記 | 高 | read | 常時 |
| A2 | `bubbles` を明示設定していない（デフォルト false を使う） | イベント init に `bubbles` を書いていない。書くなら理由コメントあり | 高 | read | イベント有 |
| A3 | `composed` を明示設定していない（デフォルト false を使う） | `composed` を書いていない。外に出す必要があり `true` にする場合のみ理由コメントあり | 高 | read | イベント有 |
| A4 | イベント名はネイティブHTML命名規則・プレフィックスなし | `change`/`input`/`cancel` 等の標準準拠で `mi-` 等の接頭辞が無い | 高 | read | イベント有 |
| A5 | Shadow DOM内で発火したイベントはルート要素で受け直して再発火している | 内部発火を `stopPropagation()`→ルートで再 `dispatchEvent`。`click`/`focus` 等 composed:true は対象外 | 中 | read | イベント有 |
| A6 | 二重発火が無い（親子ハンドラ重複が無い） | ラッパーと子で同一 composed イベントのハンドラが重複していない。委譲 or 不渡しの理由コメントあり | 中 | read | 該当時 |
| A7 | カスタムイベント定義時、React 版に `on`+PascalCase の callback prop が対応している | 例 `cancel`→`onCancel`。WC/React が同時更新されている | 高 | read | カスタム時 |
| A8 | イベント定義時 `@fires` JSDoc を記載している | 公開イベントに `@fires` がある | 中 | read | イベント有 |

## B. API設計・開発者体験　出典: `docs/review-checklist.md` 1, `docs/component-guide.md`

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| B1 | 公開 API が `plan.md` / React 版と一致している | プロパティ名・型・イベント名・デフォルト値が揃う（各版固有差分は plan.md に明記） | 高 | read | 常時 |
| B2 | 設定なしで最も一般的なユースケースが動くデフォルト値がある | 必須でない属性に妥当な初期値 | 中 | read | 常時 |
| B3 | HTML だけで組み立てられる（JS必須プロパティは最小限） | JS でしか設定できない公開プロパティが最小限 | 中 | read | 常時 |
| B4 | リスト的データは配列プロパティでなく子要素(slot)で表現している | `type: Array` でリストを受けず slot 方式 | 高 | read | リスト時 |
| B5 | 型定義／JSDoc で使い方が明確 | 公開 API に型と必要な JSDoc | 低 | read | 常時 |

## C. コンポーネント設計　出典: `docs/review-checklist.md` 2

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| C1 | 単一責任である | 責務が1つに絞られている | 中 | read | 常時 |
| C2 | 特定画面に依存せず再利用できる | 画面固有の前提を持たない | 中 | read | 常時 |
| C3 | slot / `part` で組み合わせ可能 | 拡張ポイントが用意されている | 中 | read | 常時 |
| C4 | 制約が過度でも過少でもない | デザイン一貫性を保ちつつユースケースを満たす | 低 | read | 常時 |
| C5 | Shadow DOM の主要スタイルに CSS カスタムプロパティの拡張点がある | 完全カプセル化のまま利用者が上書きできる手段がある | 低 | read | 常時 |

## D. アクセシビリティ　出典: `docs/review-checklist.md` 3

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| D1 | セマンティックHTMLを使用している | `<button>`/`<dialog>` 等ネイティブ要素を適切に使用 | 高 | read | 常時 |
| D2 | キーボードだけで操作できる | 主要操作がキーボードで完結 | 高 | read | 操作有 |
| D3 | 必要なARIA属性が設定されている | 状態・関係を ARIA で補完 | 高 | read | 該当時 |
| D4 | Shadow DOM越えのフォーカス管理が適切（`delegatesFocus` 等） | フォーカスが境界で迷子にならない | 高 | read | 該当時 |
| D5 | loading中に `aria-busy="true"` を付与している | loading 状態で aria-busy | 中 | read | loading有 |

## E. パフォーマンス　出典: `docs/review-checklist.md` 4

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| E1 | `@property` / `@state` を使い分けている | 内部状態は `@state` | 中 | read | 常時 |
| E2 | 不要な依存を含まない | バンドルに無関係な依存が無い | 中 | read | 常時 |
| E3 | `render()` 内で重い処理をしていない | 計算はライフサイクル側 | 中 | read | 常時 |
| E4 | 条件分岐の非表示に `nothing` を使っている | 空 DOM を生成していない | 低 | read | 該当時 |

## F. Web Standards / Lit　出典: `docs/review-checklist.md` 5

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| F1 | typecheck が通る | `checks-round-N.txt` で typecheck `RESULT: PASS` | 高 | hook | 常時 |
| F2 | 外部CSSの侵入/漏洩が無い（カプセル化維持） | Shadow DOM のカプセル化を壊していない | 中 | read | 常時 |
| F3 | slot のデフォルト/名前付きを適切に使い分け | 拡張ポイント設計が妥当 | 中 | read | 常時 |
| F4 | camelCase プロパティに `reflect: true` 時、`attribute` でケバブ名を明示 | 全小文字属性になっていない | 高 | read | reflect有 |
| F5 | `connectedCallback`/`disconnectedCallback` でリスナー登録/解除が対になっている | 解除漏れが無い | 高 | read | リスナ有 |
| F6 | スタイルを `*.styles.ts` の `css` タグで定義 | css タグドテンプレートで記述 | 高 | read | 常時 |
| F7 | `any` や不適切な `as` を避けている | 型の緩い回避が無い | 中 | read | 常時 |
| F8 | `:host([attr])` や DOM からの属性取得が必要なプロパティに `reflect: true` を設定 | 属性反映が必要な箇所で reflect 済み | 中 | read | 該当時 |

## G. フォーム連携　出典: `docs/review-checklist.md` 6

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| G1 | 値を送信するなら `static formAssociated = true` + `ElementInternals` | フォーム参加できる。送信しないなら n/a | 高 | read | 送信時 |
| G2 | `checked`/`value` 変更時に `internals.setFormValue()` で同期 | 送信値が同期される | 高 | read | 送信時 |
| G3 | `type="submit"` が `requestSubmit()` で送信をトリガー | Shadow DOM内ボタンが送信できる | 高 | read | submit有 |

## H. CSS設計　出典: `docs/review-checklist.md` 7, `docs/contributing.md`

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| H1 | デザイントークン以外のハードコード値が無い | 色/余白等が CSS 変数経由 | 高 | read | 常時 |
| H2 | 物理プロパティでなく論理プロパティを使用 | `margin-inline` 等 | 高 | read | 常時 |
| H3 | hover/focus 等を擬似クラスで実装 | JS クラス切替で状態表現していない | 中 | read | 状態有 |
| H4 | `:focus` でなく `:focus-visible` を使用 | focus-visible | 中 | read | focus有 |
| H5 | ルートスタイルを `:host` で定義 | :host 使用 | 中 | read | 常時 |
| H6 | ID/タグ名セレクタを使っていない（class名で書く） | 詳細度の低い/一意でないセレクタ無し | 中 | read | 常時 |
| H7 | ブレイクポイントは 720px 1箇所のみ（PCファースト） | 余分なブレイクポイント無し | 中 | read | レスポンシブ時 |
| H8 | lint（ESLint/Stylelint）が通る | `checks-round-N.txt` で lint `RESULT: PASS` | 高 | hook | 常時 |

## I. 後方互換性　出典: `docs/review-checklist.md` 8

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| I1 | タグ名・イベント名が `mi-*` に統一されている | 命名統一 | 中 | read | 常時 |
| I2 | 既存 `sp-*` / `Sp*` エイリアスを削除していない | 旧タグ維持 | 高 | read | 該当系列 |
| I3 | 既存 public API を破壊的変更していない | プロパティ/属性/イベント互換 | 高 | read | 既存改修時 |

## J. Storybook　出典: `docs/storybook-autodocs.md`, `docs/review-checklist.md` 9

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| J1 | 全 `*.story.ts` の `tags` に `!dev-only` が含まれる | `find stories -name "*.story.ts" -exec grep -L '!dev-only' {} \;` が0件 | 高 | read | 常時 |
| J2 | 表示プロパティの `argTypes` が設定されている | 各プロパティに control/description | 中 | read | 常時 |
| J3 | 主要な状態・バリエーションの Story がある | 代表状態を網羅 | 中 | read | 常時 |
| J4 | 公開カスタムイベントの `argTypes.action` と `args` の `action()` が実装のイベント名と一致 | 名前が実装と一致、分岐は説明文に記載 | 高 | read | カスタム時 |
| J5 | autodocs 利用時 `tags:["autodocs","!dev-only"]` / 非利用時 title 明示 | 規約どおり | 低 | read | 該当時 |

## K. テスト容易性　出典: `docs/review-checklist.md` 10

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| K1 | test が通る | `checks-round-N.txt` で test `RESULT: PASS` | 高 | hook | 常時 |
| K2 | 主機能にテストがある | 主要プロパティ/状態の描画テスト | 中 | read | 常時 |
| K3 | イベントハンドラ系を正常系/デフォルト/エッジ(IME等)の3観点で確認 | 3観点のテスト | 中 | read | ハンドラ有 |
| K4 | カスタムイベント定義時、発火/detail/cancelable の3層テスト | 3層を網羅 | 中 | read | カスタム時 |
| K5 | 必要に応じ `data-testid` 等の安定フックがある | テスト用フック | 低 | read | 該当時 |
| K6 | 描画外ロジックがコンポーネント外に分離されている | DOM不要ロジックを切出し | 低 | read | 該当時 |

## L. ファイル構成・登録　出典: `docs/component-guide.md`, `docs/contributing.md`

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| L1 | ディレクトリ構成が規約どおり | `src/components/<kebab>/` に `*.styles.ts` / `mi-<name>.ts` 等 | 中 | read | 常時 |
| L2 | 新コンポーネントを `src/index.ts` にエクスポート追加 | export 済み | 高 | read | 常時 |
| L3 | Story/テストが `stories/`・`tests/` 配下の規約パスにある | 配置が規約どおり | 中 | read | 常時 |

## M. デザイン照合 (Figma)　出典: `docs/review-checklist.md` 末尾

| ID | 評価項目 | PASS条件 | 重要度 | 確認 | 適用 |
|---|---|---|---|---|---|
| M1 | 余白・サイズが Figma と一致 | padding/margin/gap/幅高さ一致 | 高 | read | Figma有（無→全て n/a） |
| M2 | 色が各状態(hover/focus/active/disabled/selected)で一致 | 状態別の色一致 | 高 | read | Figma有 |
| M3 | タイポ(font-size/weight/line-height)が一致 | 一致 | 高 | read | Figma有 |

## Gotchas

採点でつまずいた点をここに足していく（気づくたび1行追加する）。

- `確認=hook` の項目（F1 / H8 / K1）は `checks-round-N.txt` の結果をそのまま正にする。コードを読んで再判定しない。
- 高を付けすぎるとループが3ラウンドで終わらない。高は docs 規約違反・体験/ a11y 破壊・API 不一致に絞る。
- 適用条件に当たらない項目は無理に fail を作らず `n/a`。
- **rubric に無い問題に気づいても、その場の判断で finding にしない**。docs（新規約なら先に docs）→ rubric に項目を昇格させてから採点対象にする。評価軸はこの表に一元化する。
