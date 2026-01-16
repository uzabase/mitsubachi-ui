import "../../src/components/icon";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { type SpIcon } from "../../src/components/icon";
import { iconTypes } from "../../src/components/icon/icons";

// 削除予定のアイコン（後方互換性のために残されているが、新規使用は非推奨）
const deprecatedIcons = [
  "error-fill",
  "information-fill",
  "success-fill",
  "warning-fill",
] as const;

// 名前が変更されたアイコン（旧名 → 新名）
const renamedIcons = {
  "minus-cycle": "minus-circle",
  "minus-cycle-fill": "minus-circle-fill",
  "plus-cycle": "plus-circle",
  "plus-cycle-fill": "plus-circle-fill",
  question: "question-circle",
  followlist: "follow-list",
  "followlist-fill": "follow-list-fill",
} as const;

// 推奨されるアイコン（削除予定と名前変更前を除外）
const recommendedIcons = iconTypes.filter(
  (icon) =>
    !deprecatedIcons.includes(icon as (typeof deprecatedIcons)[number]) &&
    !Object.keys(renamedIcons).includes(icon),
);

const meta = {
  args: {
    type: recommendedIcons[0],
  },
  argTypes: {
    type: {
      options: recommendedIcons,
      control: { type: "select" },
    },
  },
  tags: ["!dev-only"],
} satisfies Meta<SpIcon>;

export default meta;
type Story = StoryObj<SpIcon>;

export const Default: Story = {
  render: ({ type }) => {
    return html`<sp-icon
      style="display: inline-block; width: 24px; height: 24px;"
      type=${type}
    ></sp-icon>`;
  },
};

export const AllIcons: Story = {
  render: () => {
    return html`
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 24px; padding: 16px;"
      >
        ${iconTypes
          .filter((iconType) => {
            // 新名のアイコンは旧名のところで表示するのでスキップ
            const newNames = Object.values(renamedIcons) as readonly string[];
            return !newNames.includes(iconType);
          })
          .map((iconType) => {
            const isDeprecated = deprecatedIcons.includes(
              iconType as (typeof deprecatedIcons)[number],
            );
            const isRenamed =
              iconType in renamedIcons &&
              Object.keys(renamedIcons).includes(iconType);
            const newName = isRenamed
              ? renamedIcons[iconType as keyof typeof renamedIcons]
              : null;
            return html`
              <div
                style="display: flex; flex-direction: column; align-items: center; ${isDeprecated
                  ? "background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 8px;"
                  : isRenamed
                    ? "background-color: #d1ecf1; border: 2px solid #0dcaf0; border-radius: 8px; padding: 8px;"
                    : ""}"
              >
                <sp-icon style="margin-bottom: 8px;" type=${iconType}></sp-icon>
                ${isRenamed
                  ? html`
                      <div
                        style="font-size: 12px; text-align: center; word-break: break-all; color: #055160; font-weight: bold;"
                      >
                        ${newName}
                      </div>
                      <div
                        style="font-size: 10px; color: #856404; margin-top: 8px;"
                      >
                        (旧名)
                      </div>
                      <div
                        style="font-size: 12px; text-align: center; word-break: break-all; color: #856404; margin-top: 2px;"
                      >
                        ${iconType}
                      </div>
                    `
                  : html`
                      <div
                        style="font-size: 12px; text-align: center; word-break: break-all;"
                      >
                        ${iconType}
                      </div>
                    `}
                ${isDeprecated
                  ? html`<div
                      style="font-size: 10px; color: #856404; font-weight: bold; margin-top: 4px;"
                    >
                      削除予定
                    </div>`
                  : ""}
              </div>
            `;
          })}
      </div>
    `;
  },
};

export const DeprecatedIcons: Story = {
  render: () => {
    return html`
      <div style="padding: 16px;">
        <div
          style="background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px; margin-bottom: 24px;"
        >
          <h3 style="margin: 0 0 8px 0; color: #856404;">
            ⚠️ 削除予定のアイコン
          </h3>
          <p style="margin: 0; color: #856404; line-height: 1.5;">
            以下のアイコンは削除予定です。後方互換性のために現在は利用可能ですが、新規での使用は推奨されません。<br />
            代替アイコンへの移行を検討してください。
          </p>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px;"
        >
          ${deprecatedIcons.map(
            (iconType) => html`
              <div
                style="display: flex; flex-direction: column; align-items: center; background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px;"
              >
                <sp-icon
                  style="margin-bottom: 8px; width: 32px; height: 32px;"
                  type=${iconType}
                ></sp-icon>
                <div
                  style="font-size: 12px; text-align: center; word-break: break-all; font-weight: bold;"
                >
                  ${iconType}
                </div>
                <div
                  style="font-size: 10px; color: #856404; font-weight: bold; margin-top: 8px;"
                >
                  削除予定
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          "削除予定のアイコン一覧です。これらのアイコンは後方互換性のために残されていますが、将来のバージョンで削除される予定です。新規での使用は避けてください。",
      },
    },
  },
};

export const RenamedIcons: Story = {
  render: () => {
    return html`
      <div style="padding: 16px;">
        <div
          style="background-color: #d1ecf1; border: 2px solid #0dcaf0; border-radius: 8px; padding: 16px; margin-bottom: 24px;"
        >
          <h3 style="margin: 0 0 8px 0; color: #055160;">
            ℹ️ 名前が変更されたアイコン
          </h3>
          <p style="margin: 0; color: #055160; line-height: 1.5;">
            以下のアイコンは名前が変更されました。旧名は後方互換性のために利用可能ですが、新名の使用を推奨します。<br />
            新規での使用時は、右側に表示されている新しい名前を使用してください。
          </p>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;"
        >
          ${Object.entries(renamedIcons).map(
            ([oldName, newName]) => html`
              <div
                style="display: flex; align-items: center; background-color: #d1ecf1; border: 2px solid #0dcaf0; border-radius: 8px; padding: 16px; gap: 16px;"
              >
                <div
                  style="display: flex; flex-direction: column; align-items: center; flex: 1;"
                >
                  <sp-icon
                    style="margin-bottom: 8px; width: 32px; height: 32px;"
                    type=${oldName}
                  ></sp-icon>
                  <div
                    style="font-size: 12px; text-align: center; word-break: break-all; font-weight: bold;"
                  >
                    ${oldName}
                  </div>
                  <div
                    style="font-size: 10px; color: #055160; margin-top: 4px;"
                  >
                    旧名
                  </div>
                </div>
                <div style="font-size: 24px; color: #055160;">→</div>
                <div
                  style="display: flex; flex-direction: column; align-items: center; flex: 1;"
                >
                  <sp-icon
                    style="margin-bottom: 8px; width: 32px; height: 32px;"
                    type=${newName}
                  ></sp-icon>
                  <div
                    style="font-size: 12px; text-align: center; word-break: break-all; font-weight: bold;"
                  >
                    ${newName}
                  </div>
                  <div
                    style="font-size: 10px; color: #055160; margin-top: 4px;"
                  >
                    新名
                  </div>
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          "名前が変更されたアイコンの一覧です。旧名は後方互換性のために残されていますが、新規では新しい名前を使用することを推奨します。",
      },
    },
  },
};
