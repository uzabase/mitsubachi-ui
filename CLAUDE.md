# mitsubachi-ui

Web Components / Lit ベースのデザインシステム（`mi-` prefix）。

## ドキュメント（迷ったらここを正とする）

実装・レビュー・PR の判断基準はすべて `docs/` にある。観点や手順を推測で補わず、必ず該当ファイルを読むこと。

- `docs/contributing.md` … 技術スタック・ディレクトリ構造・開発コマンド・コミットルール・dist 運用
- `docs/component-guide.md` … 新規コンポーネントのファイル構成と実装時の参照先
- `docs/review-checklist.md` … コードレビューの全観点（10カテゴリ）
- `docs/event-architecture.md` … イベント設計方針（カスタムイベントは原則作らない 等）
- `docs/storybook-autodocs.md` … Storybook の autodocs / dev-only / Actions 連携ルール
- `docs/commit-push-pr.md` … コミット〜PR作成の手順

## 実装時の参照元

- **API 設計は React 版と対等に揃える**。両方にある機能はプロパティ名・型・イベント名を一致させる。
  ただし React 版・WebComponent 版それぞれにしか無い機能もあり、その場合は存在する側を正とする
  （一方を削って合わせるのではなく、各版の正当な差分として扱う）。React 版を一方的な正典とはしない。
  - React 版リポジトリ: <!-- TODO: 記入 -->
- **実装規約の参照 = 既存の `mi-` コンポーネント**。`src/components/` 配下の既存実装に倣う。

## やり取りの原則（重要）

- **指摘が先、修正は承認後**。問題点はまず一覧で示し、私の承認後に直す。
- **一度に全部直さない。1つずつ**提案し、私が次に進む合図を出すまで待つ。
- 私は JS / TS にあまり詳しくない。指摘には「なぜ問題か」「どう直すか」「優先度（高/中/低）」を添える。

## スキル

- 新しいコンポーネントの実装 → `/new-component`
- 実装したコンポーネントのレビュー → `/review-component`
- コミット〜PR作成 → `/commit-pr`
