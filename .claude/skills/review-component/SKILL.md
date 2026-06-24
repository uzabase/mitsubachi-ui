---
name: review-component
description: >
  実装済みの mi- Web Component を多角的にレビューする。デザインの Figma 照合、
  docs/review-checklist.md に基づくコードレビュー、Storybook の網羅性確認、
  テストの観点出しを行う。ユーザーがコンポーネントのレビュー・確認・チェックを
  求めたとき、または実装が一通り終わったときに使う。
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash
---

# Component Review

実装済みの `mi-` コンポーネントをレビューする手順。**目的は問題の発見であって、即修正ではない。**

> このスキルはユーザーが直接呼ぶ**対話レビュー**専用。実装↔評価ループの自動評価は、
> `new-component` の Orchestrator が `references/evaluator.md` を読ませた Evaluator
> サブエージェントが担う（観点の正は両者とも `docs/review-checklist.md`）。

## 全体ルール

- どのフェーズでも、**まず問題点を一覧で示す。修正はユーザーの承認後**に、1つずつ行う。
- ユーザーは JS / TS に詳しくない。指摘には必ず「なぜ問題か（平易に）」「どう直すか」「優先度（高/中/低）」を添える。
- 参照元は CLAUDE.md の通り。**API は React 版と対等に揃え**（片方にしか無い機能は各版の正当な差分として扱う）、**実装規約は既存 mi- コンポーネント**を基準にする。

ユーザーがフェーズを指定していればそれだけ実施する。指定がなければ 1→4 の順で、各フェーズ終了ごとに止まって承認を待つ。

レビュー観点は推測で補わず、必ず該当 docs を読んでから判断する。

---

## フェーズ1: デザイン照合

Figma URL が渡されたら、実装と Figma の差分を洗い出す。**この段階では修正しない。**

- 余白・サイズ（padding / margin / gap / 幅・高さ）
- 色（背景・文字・ボーダー、状態別: hover / focus / active / disabled / selected）
- タイポグラフィ（font-size / weight / line-height）
- 各インタラクション状態の見た目

差分は「Figma 側の値 → 現在の実装値」の形で1項目ずつ示す。
修正時は token を使い、ハードコードを避ける（CSS 観点の詳細は `docs/review-checklist.md` の「7. CSS設計」）。

※ Figma MCP が未接続なら、ユーザーが気づいた差分を聞いて対応する。

---

## フェーズ2: コードレビュー

**必ず `docs/review-checklist.md` を読み、その10カテゴリの観点でレビューする。**
（API設計 / コンポーネント設計 / アクセシビリティ / パフォーマンス / Web Standards・Lit / フォーム連携 / CSS設計 / 後方互換性 / Storybook / テスト容易性）

同ファイル末尾の「レビュー手順」に従う:
1. git diff / git status で変更ファイルを特定
2. 各ファイルを読み込む
3. プロジェクトの既存慣習を確認（指摘が運用方針に反していないか。例: dist/ はソース変更と合わせてコミットする）
4. 10観点でレビュー
5. 改善提案をコード例付きで（ただし修正は承認後、1つずつ）
6. 良い点も指摘する

イベント関連を見るときは `docs/event-architecture.md` の方針（カスタムイベントは原則作らない、bubbles/composed は基本 false 等）も踏まえる。

---

## フェーズ3: Storybook 確認

**`docs/storybook-autodocs.md` を読んでから確認する。** 特に:

- すべての `*.story.ts` の `tags` に `!dev-only` が含まれているか（本番 Storybook 表示に必須）
  - 検出: `find stories -name "*.story.ts" -exec grep -L '!dev-only' {} \;`（何も出なければOK）
- 全プロパティの Controls（argTypes）が設定されているか
- 主要な状態・バリエーションごとの Story があるか
- カスタムイベントを公開している場合、同ドキュメントの「イベント（カスタムイベント）の実装チェック」に沿って argTypes の `action` / args の `action()` が実装のイベント名と一致しているか
  - 参照実装: `stories/dialog/mi-action-dialog.story.ts`

不足分は、基準にする既存コンポーネントの記法に揃えて追加案を出す。

---

## フェーズ4: テスト

`docs/review-checklist.md` の「10. テスト容易性」を基準に、既存テスト（`tests/` 配下）と比較して網羅性の観点を出す。

- 各プロパティ・状態の描画
- イベントハンドラ系（キーボード操作・フォーム送信等）は正常系 / デフォルト動作 / エッジケース（IME入力中など）の3観点
- カスタムイベントを定義している場合のみ「発火確認」「detail 確認」「cancelable 確認」の3層（`docs/event-architecture.md`）

テスト記法・ファイル配置は既存テストに倣う。

---

## Gotchas

レビューでつまずいた点をここに足していく（気づくたび1行追加する）。

- **指摘が先、修正は承認後・1つずつ**（CLAUDE.md）。一覧を出す前に直し始めない。
- 重要度の付け方がぶれると優先順位が崩れる。**ユーザー体験を壊す／規約違反は高、好みの範囲は低**を基準にする。
- `!dev-only` の確認は目視より `find stories -name "*.story.ts" -exec grep -L '!dev-only' {} \;` が速い（何も出なければOK）。
- 「dist/ がコミットされている」等は**プロジェクトの運用方針**（`docs/contributing.md`）。運用に沿った差分を finding にしない。
