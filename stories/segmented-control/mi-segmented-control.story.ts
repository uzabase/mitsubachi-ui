import "../../src/components/segmented-control/mi-segmented-control";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { action } from "storybook/actions";

import type { MiSegmentedControl } from "../../src/components/segmented-control/mi-segmented-control";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiSegmentedControlStory = MiSegmentedControl & {
  onChange?: (e: Event) => void;
};

const meta = {
  component: "mi-segmented-control",
  title: "Components/SegmentedControl/mi-segmented-control",
  tags: ["!dev-only"],
  parameters: {
    docs: {
      description: {
        component:
          "排他的な単一選択のセグメントグループです。mi-segment を子として配置して使用します。",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "現在選択されているセグメントの値",
    },
    disabled: {
      type: "boolean",
      description: "無効化状態（全セグメントを無効化）",
    },
    onChange: {
      name: "change",
      action: "change",
      description: "セグメントの選択が変更されたとき",
      table: { category: "Events" },
    },
  },
  args: {
    value: "item1",
    disabled: false,
    onChange: action("change"),
  },
} satisfies Meta<MiSegmentedControlStory>;

export default meta;
type Story = StoryObj<MiSegmentedControlStory>;

/**
 * テキスト: セグメント2個
 */
export const TextTwoItems: Story = {
  render: (args) => html`
    <mi-segmented-control
      value="${args.value}"
      ?disabled="${args.disabled}"
      aria-label="テキスト2項目"
      @change="${args.onChange}"
    >
      <mi-segment value="item1" variant="text">Label</mi-segment>
      <mi-segment value="item2" variant="text">Label</mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * テキスト: セグメント3個
 */
export const TextThreeItems: Story = {
  render: (args) => html`
    <mi-segmented-control
      value="${args.value}"
      ?disabled="${args.disabled}"
      aria-label="テキスト3項目"
      @change="${args.onChange}"
    >
      <mi-segment value="item1" variant="text">Label</mi-segment>
      <mi-segment value="item2" variant="text">Label</mi-segment>
      <mi-segment value="item3" variant="text">Label</mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * テキスト: セグメント4個
 */
export const TextFourItems: Story = {
  render: (args) => html`
    <mi-segmented-control
      value="${args.value}"
      ?disabled="${args.disabled}"
      aria-label="テキスト4項目"
      @change="${args.onChange}"
    >
      <mi-segment value="item1" variant="text">Label</mi-segment>
      <mi-segment value="item2" variant="text">Label</mi-segment>
      <mi-segment value="item3" variant="text">Label</mi-segment>
      <mi-segment value="item4" variant="text">Label</mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * テキスト: セグメント5個
 */
export const TextFiveItems: Story = {
  render: (args) => html`
    <mi-segmented-control
      value="${args.value}"
      ?disabled="${args.disabled}"
      aria-label="テキスト5項目"
      @change="${args.onChange}"
    >
      <mi-segment value="item1" variant="text">Label</mi-segment>
      <mi-segment value="item2" variant="text">Label</mi-segment>
      <mi-segment value="item3" variant="text">Label</mi-segment>
      <mi-segment value="item4" variant="text">Label</mi-segment>
      <mi-segment value="item5" variant="text">Label</mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * テキスト: 長いラベル（折り返し確認用）
 */
export const TextLongLabel: Story = {
  render: () => html`
    <mi-segmented-control value="item1" aria-label="長いラベル">
      <mi-segment value="item1" variant="text">短い</mi-segment>
      <mi-segment value="item2" variant="text">短い</mi-segment>
      <mi-segment value="item3" variant="text">
        長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い
      </mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * テキスト: 一部セグメント無効化
 */
export const TextWithDisabled: Story = {
  render: () => html`
    <mi-segmented-control value="item1" aria-label="テキスト一部無効化">
      <mi-segment value="item1" variant="text">有効</mi-segment>
      <mi-segment value="item2" variant="text" disabled>無効</mi-segment>
      <mi-segment value="item3" variant="text">有効</mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * アイコン: セグメント2個
 */
export const IconTwoItems: Story = {
  render: (args) => html`
    <mi-segmented-control
      value="${args.value}"
      ?disabled="${args.disabled}"
      aria-label="アイコン2項目"
      @change="${args.onChange}"
    >
      <mi-segment value="item1" variant="icon" aria-label="検索">
        <mi-icon type="search"></mi-icon>
      </mi-segment>
      <mi-segment value="item2" variant="icon" aria-label="設定">
        <mi-icon type="gear"></mi-icon>
      </mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * アイコン: セグメント3個
 */
export const IconThreeItems: Story = {
  render: (args) => html`
    <mi-segmented-control
      value="${args.value}"
      ?disabled="${args.disabled}"
      aria-label="アイコン3項目"
      @change="${args.onChange}"
    >
      <mi-segment value="item1" variant="icon" aria-label="検索">
        <mi-icon type="search"></mi-icon>
      </mi-segment>
      <mi-segment value="item2" variant="icon" aria-label="設定">
        <mi-icon type="gear"></mi-icon>
      </mi-segment>
      <mi-segment value="item3" variant="icon" aria-label="ホーム">
        <mi-icon type="home"></mi-icon>
      </mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * アイコン: 一部セグメント無効化
 */
export const IconWithDisabled: Story = {
  render: () => html`
    <mi-segmented-control value="item1" aria-label="アイコン一部無効化">
      <mi-segment value="item1" variant="icon" aria-label="検索">
        <mi-icon type="search"></mi-icon>
      </mi-segment>
      <mi-segment value="item2" variant="icon" aria-label="設定" disabled>
        <mi-icon type="gear"></mi-icon>
      </mi-segment>
      <mi-segment value="item3" variant="icon" aria-label="ホーム">
        <mi-icon type="home"></mi-icon>
      </mi-segment>
    </mi-segmented-control>
  `,
};

/**
 * すべてのバリエーションを一覧表示
 */
export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <p style="margin-block-end: 8px; font-weight: bold;">
          テキスト（2〜5個）
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <mi-segmented-control value="item1" aria-label="テキスト2項目">
            <mi-segment value="item1" variant="text">Label</mi-segment>
            <mi-segment value="item2" variant="text">Label</mi-segment>
          </mi-segmented-control>
          <mi-segmented-control value="item1" aria-label="テキスト3項目">
            <mi-segment value="item1" variant="text">Label</mi-segment>
            <mi-segment value="item2" variant="text">Label</mi-segment>
            <mi-segment value="item3" variant="text">Label</mi-segment>
          </mi-segmented-control>
          <mi-segmented-control value="item1" aria-label="テキスト4項目">
            <mi-segment value="item1" variant="text">Label</mi-segment>
            <mi-segment value="item2" variant="text">Label</mi-segment>
            <mi-segment value="item3" variant="text">Label</mi-segment>
            <mi-segment value="item4" variant="text">Label</mi-segment>
          </mi-segmented-control>
          <mi-segmented-control value="item1" aria-label="テキスト5項目">
            <mi-segment value="item1" variant="text">Label</mi-segment>
            <mi-segment value="item2" variant="text">Label</mi-segment>
            <mi-segment value="item3" variant="text">Label</mi-segment>
            <mi-segment value="item4" variant="text">Label</mi-segment>
            <mi-segment value="item5" variant="text">Label</mi-segment>
          </mi-segmented-control>
        </div>
      </div>

      <div>
        <p style="margin-block-end: 8px; font-weight: bold;">
          アイコン（2〜5個）
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <mi-segmented-control value="item1" aria-label="アイコン2項目">
            <mi-segment value="item1" variant="icon" aria-label="検索">
              <mi-icon type="search"></mi-icon>
            </mi-segment>
            <mi-segment value="item2" variant="icon" aria-label="設定">
              <mi-icon type="gear"></mi-icon>
            </mi-segment>
          </mi-segmented-control>
          <mi-segmented-control value="item1" aria-label="アイコン3項目">
            <mi-segment value="item1" variant="icon" aria-label="検索">
              <mi-icon type="search"></mi-icon>
            </mi-segment>
            <mi-segment value="item2" variant="icon" aria-label="設定">
              <mi-icon type="gear"></mi-icon>
            </mi-segment>
            <mi-segment value="item3" variant="icon" aria-label="ホーム">
              <mi-icon type="home"></mi-icon>
            </mi-segment>
          </mi-segmented-control>
        </div>
      </div>

      <div>
        <p style="margin-block-end: 8px; font-weight: bold;">
          無効化（テキスト / アイコン）
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <mi-segmented-control value="item1" aria-label="テキスト一部無効化">
            <mi-segment value="item1" variant="text">有効</mi-segment>
            <mi-segment value="item2" variant="text" disabled>無効</mi-segment>
            <mi-segment value="item3" variant="text">有効</mi-segment>
          </mi-segmented-control>
          <mi-segmented-control value="item1" aria-label="アイコン一部無効化">
            <mi-segment value="item1" variant="icon" aria-label="検索">
              <mi-icon type="search"></mi-icon>
            </mi-segment>
            <mi-segment value="item2" variant="icon" aria-label="設定" disabled>
              <mi-icon type="gear"></mi-icon>
            </mi-segment>
            <mi-segment value="item3" variant="icon" aria-label="ホーム">
              <mi-icon type="home"></mi-icon>
            </mi-segment>
          </mi-segmented-control>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "mi-segmented-control の全パターンを一覧表示します。テキスト・アイコン・無効化の各バリエーションを確認できます。",
      },
    },
  },
};
