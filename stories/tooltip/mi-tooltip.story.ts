import "../../src/components/icon";
import "../../src/components/tooltip/mi-tooltip";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import {
  type MiTooltip,
  placements,
} from "../../src/components/tooltip/mi-tooltip";

const meta = {
  component: "mi-tooltip",
  argTypes: {
    text: { type: "string" },
    placement: {
      control: { type: "select" },
      options: placements,
    },
  },
  args: {
    text: "補足情報のテキストです",
    placement: "top",
  },
  render: (args) => html`
    <div
      style="display: flex; align-items: center; justify-content: center; padding: 80px;"
    >
      <mi-tooltip text=${args.text} placement=${args.placement}>
        <button>ホバーしてください</button>
      </mi-tooltip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        component:
          "UI 要素に関する補足情報や説明を一時的に表示するコンポーネントです。アイコンやボタン、テキストなどにホバーすることで表示され、ユーザーの操作を妨げずに理解を助けます。",
      },
    },
  },
} satisfies Meta<MiTooltip>;

export default meta;
type Story = StoryObj<MiTooltip>;

export const Basic: Story = {
  tags: ["!dev-only"],
  parameters: {
    docs: {
      description: {
        story:
          "デフォルトの使用例です。トリガー要素にホバーするとツールチップが表示されます。",
      },
    },
  },
};

export const Placements: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 80px; place-items: center;"
    >
      ${placements.map(
        (placement) => html`
          <mi-tooltip text="テキスト" placement=${placement}>
            <button style="width: 120px;">${placement}</button>
          </mi-tooltip>
        `,
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "placement属性で表示位置を指定できます。top / bottom / left / right とそれぞれの start / end バリアントに対応しています。画面端に近い場合は自動的に反転します。",
      },
    },
  },
};

export const PlacementStartEnd: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 80px; padding: 80px; align-items: flex-start; justify-content: center;"
    >
      <!-- 左方向の比較 -->
      <div
        style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;"
      >
        <p style="margin: 0 0 8px; font-size: 14px; font-weight: bold;">
          left-* の比較
        </p>
        ${["left-start", "left", "left-end"].map(
          (placement) => html`
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 12px; width: 80px; color: #666;"
                >${placement}</span
              >
              <mi-tooltip text="${placement}" placement=${placement}>
                <div
                  style="width: 80px; height: 80px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #666;"
                >
                  hover
                </div>
              </mi-tooltip>
            </div>
          `,
        )}
      </div>

      <!-- 右方向の比較 -->
      <div
        style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;"
      >
        <p style="margin: 0 0 8px; font-size: 14px; font-weight: bold;">
          right-* の比較
        </p>
        ${["right-start", "right", "right-end"].map(
          (placement) => html`
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 12px; width: 90px; color: #666;"
                >${placement}</span
              >
              <mi-tooltip text="${placement}" placement=${placement}>
                <div
                  style="width: 80px; height: 80px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #666;"
                >
                  hover
                </div>
              </mi-tooltip>
            </div>
          `,
        )}
      </div>

      <!-- 上方向の比較 -->
      <div
        style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;"
      >
        <p style="margin: 0 0 8px; font-size: 14px; font-weight: bold;">
          top-* の比較
        </p>
        <div style="display: flex; gap: 16px; align-items: flex-end;">
          ${["top-start", "top", "top-end"].map(
            (placement) => html`
              <div
                style="display: flex; flex-direction: column; align-items: center; gap: 8px;"
              >
                <mi-tooltip text="${placement}" placement=${placement}>
                  <div
                    style="width: 80px; height: 80px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #666;"
                  >
                    hover
                  </div>
                </mi-tooltip>
                <span style="font-size: 12px; color: #666;">${placement}</span>
              </div>
            `,
          )}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "`-start` / `-end` サフィックスの違いを縦長・横長のトリガーで確認できます。`left-start` はトリガーの**上端**に、`left` は**中央**に、`left-end` は**下端**にツールチップが揃います。",
      },
    },
  },
};

export const LongText: Story = {
  render: () => html`
    <div
      style="display: flex; align-items: center; justify-content: center; padding: 80px;"
    >
      <mi-tooltip
        text="これは最大幅200pxに収まる長めの補足テキストです。折り返しが発生します。"
        placement="top"
      >
        <button>長いテキスト</button>
      </mi-tooltip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "ツールチップの最大幅は200pxです。テキストが長い場合は折り返されます。",
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 24px; align-items: center; justify-content: center; padding: 80px;"
    >
      <mi-tooltip text="情報アイコンの説明" placement="top">
        <mi-icon type="information"></mi-icon>
      </mi-tooltip>
      <mi-tooltip text="設定を変更します" placement="top">
        <mi-icon type="gear"></mi-icon>
      </mi-tooltip>
      <mi-tooltip text="削除は取り消せません" placement="top">
        <mi-icon type="cross"></mi-icon>
      </mi-tooltip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "アイコンと組み合わせた使用例です。ラベルのないアイコンの意味を補足するのに適しています。",
      },
    },
  },
};

export const OverflowBehavior: Story = {
  render: () => html`
    <div style="font-family: Arial, sans-serif;">
      <!-- 説明 -->
      <div
        style="padding: 16px 24px; background: #f5f5f5; border-bottom: 1px solid #ddd; font-size: 13px; color: #444; line-height: 1.6;"
      >
        <strong>flip()</strong
        >：画面端でツールチップが見切れそうになると、自動的に反対側へ反転します。<br />
        <strong>shift()</strong
        >：反転してもなお見切れる場合は、見切れない位置までスライドします。
      </div>

      <!-- 画面端テスト：4隅 -->
      <div
        style="position: relative; height: 420px; border: 1px solid #ddd; margin: 24px; border-radius: 8px; overflow: hidden; background: #fafafa;"
      >
        <div
          style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); font-size: 12px; color: #999;"
        >
          スクロールせずに確認できます（この枠内でのみ overflow: hidden
          は適用されていません）
        </div>

        <!-- 左上隅：right を指定 → 画面端なので left に flip -->
        <div style="position: absolute; top: 40px; left: 16px;">
          <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
            左上隅 / right 指定
          </div>
          <mi-tooltip text="right 指定でも左に反転します" placement="right">
            <button>right →flip→ left</button>
          </mi-tooltip>
        </div>

        <!-- 右上隅：left を指定 → 画面端なので right に flip -->
        <div style="position: absolute; top: 40px; right: 16px;">
          <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
            右上隅 / left 指定
          </div>
          <mi-tooltip text="left 指定でも右に反転します" placement="left">
            <button>left →flip→ right</button>
          </mi-tooltip>
        </div>

        <!-- 左下隅：right-end を指定 -->
        <div style="position: absolute; bottom: 40px; left: 16px;">
          <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
            左下隅 / right-end 指定
          </div>
          <mi-tooltip
            text="下端なので上方向にシフトします"
            placement="right-end"
          >
            <button>right-end + shift</button>
          </mi-tooltip>
        </div>

        <!-- 右下隅：left-end を指定 -->
        <div style="position: absolute; bottom: 40px; right: 16px;">
          <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
            右下隅 / left-end 指定
          </div>
          <mi-tooltip
            text="画面端でも見切れないようシフトします"
            placement="left-end"
          >
            <button>left-end + shift</button>
          </mi-tooltip>
        </div>

        <!-- 中央：top を指定（通常動作の比較） -->
        <div
          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
        >
          <div
            style="font-size: 11px; color: #888; margin-bottom: 4px; text-align: center;"
          >
            中央 / 通常
          </div>
          <mi-tooltip text="中央では指定通り top に表示" placement="top">
            <button>top（通常）</button>
          </mi-tooltip>
        </div>

        <!-- 上端中央：top を指定 → bottom に flip -->
        <div
          style="position: absolute; top: 40px; left: 50%; transform: translateX(-50%);"
        >
          <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
            上端 / top 指定
          </div>
          <mi-tooltip text="上端なので下に反転します" placement="top">
            <button>top →flip→ bottom</button>
          </mi-tooltip>
        </div>

        <!-- 下端中央：bottom を指定 → top に flip -->
        <div
          style="position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);"
        >
          <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
            下端 / bottom 指定
          </div>
          <mi-tooltip text="下端なので上に反転します" placement="bottom">
            <button>bottom →flip→ top</button>
          </mi-tooltip>
        </div>
      </div>

      <!-- top-start / top-end の shift 動作 -->
      <div
        style="margin: 0 24px 24px; padding: 16px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa;"
      >
        <div style="font-size: 13px; font-weight: bold; margin-bottom: 12px;">
          top-start / top-end のシフト動作
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 16px;">
          左右どちらかに寄った位置で <code>top-start</code> や
          <code>top-end</code> を使うと、
          ツールチップが画面端に合わせてスライド（shift）します。
        </div>
        <div
          style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 0 8px;"
        >
          <div>
            <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
              左端 / top-start
            </div>
            <mi-tooltip text="左端では右方向にシフト" placement="top-start">
              <button>top-start</button>
            </mi-tooltip>
          </div>
          <div>
            <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
              中央 / top-start
            </div>
            <mi-tooltip text="中央ではそのまま表示" placement="top-start">
              <button>top-start</button>
            </mi-tooltip>
          </div>
          <div>
            <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
              右端 / top-end
            </div>
            <mi-tooltip text="右端では左方向にシフト" placement="top-end">
              <button>top-end</button>
            </mi-tooltip>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "画面の端や隅でツールチップを使ったときの自動調整動作を確認できます。`flip()` により反対側へ反転、`shift()` により見切れない位置へスライドします。",
      },
    },
  },
};

export const OverlapAndScroll: Story = {
  render: () => html`
    <div
      style="font-family: Arial, sans-serif; display: flex; flex-direction: column; gap: 32px; padding: 24px;"
    >
      <!-- ① 他の要素の上に重なる（z-index） -->
      <section>
        <h3 style="margin: 0 0 8px; font-size: 14px;">
          ① 他の要素の上に重なる（z-index: 9999）
        </h3>
        <p style="margin: 0 0 12px; font-size: 12px; color: #666;">
          ツールチップは
          <code>z-index: 9999</code>
          で表示されるため、隣接するカードやテキストの上に重なります。
        </p>
        <div style="display: flex; gap: 8px; align-items: stretch;">
          <div
            style="flex: 1; padding: 16px; background: #e8f4ff; border: 1px solid #90c8ff; border-radius: 6px; font-size: 12px;"
          >
            カード A：左隣のツールチップがこのカードに重なります
          </div>
          <div style="display: flex; align-items: center;">
            <mi-tooltip
              text="このツールチップは隣のカードの上に重なります"
              placement="right"
            >
              <button>ホバー</button>
            </mi-tooltip>
          </div>
          <div
            style="flex: 1; padding: 16px; background: #fff3e0; border: 1px solid #ffb74d; border-radius: 6px; font-size: 12px;"
          >
            カード B：右隣のツールチップがこのカードに重なります
          </div>
        </div>
      </section>

      <!-- ② スクロールコンテナ内（autoUpdate） -->
      <section>
        <h3 style="margin: 0 0 8px; font-size: 14px;">
          ② スクロールコンテナ内（autoUpdate）
        </h3>
        <p style="margin: 0 0 12px; font-size: 12px; color: #666;">
          <code>autoUpdate</code>
          によりスクロール時もツールチップの位置が追従します。
          ホバーしたままスクロールしてみてください。
        </p>
        <div
          style="height: 140px; overflow-y: scroll; border: 1px solid #ddd; border-radius: 6px; padding: 8px; background: #fafafa;"
        >
          <div
            style="height: 60px; display: flex; align-items: center; padding: 0 8px; background: #f0f0f0; border-radius: 4px; margin-bottom: 8px; font-size: 12px; color: #666;"
          >
            ↕ スクロール領域（上）
          </div>
          <div style="display: flex; justify-content: center; padding: 12px 0;">
            <mi-tooltip
              text="スクロールしても位置が追従します"
              placement="right"
            >
              <button>ここをホバー → スクロール</button>
            </mi-tooltip>
          </div>
          <div
            style="height: 60px; display: flex; align-items: center; padding: 0 8px; background: #f0f0f0; border-radius: 4px; margin-top: 8px; font-size: 12px; color: #666;"
          >
            ↕ スクロール領域（下）
          </div>
        </div>
      </section>

      <!-- ③ position: fixed の制限（transform の親） -->
      <section>
        <h3 style="margin: 0 0 8px; font-size: 14px;">
          ⚠️ ③ 既知の制限：親要素に <code>transform</code> がある場合
        </h3>
        <p style="margin: 0 0 12px; font-size: 12px; color: #666;">
          ツールチップは <code>position: fixed</code> で表示されます。 CSS
          の仕様上、祖先要素に <code>transform</code> / <code>filter</code> /
          <code>will-change: transform</code> が指定されていると、<code
            >fixed</code
          >
          の基準がビューポートではなくその要素に変わるため、
          位置がずれる場合があります。
        </p>
        <div style="display: flex; gap: 24px; align-items: flex-start;">
          <!-- 正常ケース -->
          <div style="flex: 1;">
            <div
              style="font-size: 12px; color: #333; font-weight: bold; margin-bottom: 6px;"
            >
              ✅ 通常（transform なし）
            </div>
            <div
              style="padding: 16px; border: 1px solid #c8e6c9; background: #f1f8e9; border-radius: 6px;"
            >
              <mi-tooltip text="正しく表示されます" placement="top">
                <button>ホバー</button>
              </mi-tooltip>
            </div>
          </div>
          <!-- 制限ケース -->
          <div style="flex: 1;">
            <div
              style="font-size: 12px; color: #c62828; font-weight: bold; margin-bottom: 6px;"
            >
              ❌ 親に transform あり（位置ずれ）
            </div>
            <div
              style="padding: 16px; border: 1px solid #ffcdd2; background: #fff3f3; border-radius: 6px; transform: translateZ(0);"
            >
              <mi-tooltip
                text="transform の影響で位置がずれます"
                placement="top"
              >
                <button>ホバー</button>
              </mi-tooltip>
              <div style="font-size: 11px; color: #c62828; margin-top: 8px;">
                この親に
                <code>transform: translateZ(0)</code> が適用されています
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: [
          "他の要素との重なりやスクロール時の挙動、および既知の制限を確認できます。",
          "",
          "- **z-index**：ツールチップは `z-index: 9999` で表示され、隣接する要素の上に重なります",
          "- **autoUpdate**：スクロール・リサイズ時も位置を自動追従します",
          "- **制限**：祖先要素に `transform` / `filter` / `will-change: transform` があると `position: fixed` の基準がずれ、位置がずれることがあります",
        ].join("\n"),
      },
    },
  },
};

export const All: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 48px; padding: 80px;"
    >
      <div>
        <p style="margin: 0 0 24px; font-size: 14px; font-weight: bold;">
          上方向
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          ${["top", "top-start", "top-end"].map(
            (placement) => html`
              <mi-tooltip text="テキスト" placement=${placement}>
                <button style="width: 100px;">${placement}</button>
              </mi-tooltip>
            `,
          )}
        </div>
      </div>
      <div>
        <p style="margin: 0 0 24px; font-size: 14px; font-weight: bold;">
          下方向
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          ${["bottom", "bottom-start", "bottom-end"].map(
            (placement) => html`
              <mi-tooltip text="テキスト" placement=${placement}>
                <button style="width: 100px;">${placement}</button>
              </mi-tooltip>
            `,
          )}
        </div>
      </div>
      <div>
        <p style="margin: 0 0 24px; font-size: 14px; font-weight: bold;">
          左方向
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          ${["left", "left-start", "left-end"].map(
            (placement) => html`
              <mi-tooltip text="テキスト" placement=${placement}>
                <button style="width: 100px;">${placement}</button>
              </mi-tooltip>
            `,
          )}
        </div>
      </div>
      <div>
        <p style="margin: 0 0 24px; font-size: 14px; font-weight: bold;">
          右方向
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          ${["right", "right-start", "right-end"].map(
            (placement) => html`
              <mi-tooltip text="テキスト" placement=${placement}>
                <button style="width: 100px;">${placement}</button>
              </mi-tooltip>
            `,
          )}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "全ての placement バリアントを方向ごとにまとめて確認できます。",
      },
    },
  },
};
