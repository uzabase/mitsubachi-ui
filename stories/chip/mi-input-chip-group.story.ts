import "../../src/components/chip/mi-input-chip";
import "../../src/components/chip/mi-input-chip-group";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import type { MiInputChip } from "../../src/components/chip/mi-input-chip";
import type { MiInputChipGroup } from "../../src/components/chip/mi-input-chip-group";

const meta = {
  component: "mi-input-chip-group",
  title: "Components/Chip/mi-input-chip-group",
  parameters: {
    docs: {
      description: {
        component: [
          "複数の mi-input-chip をまとめて表示するグループコンポーネントです。",
          "ユーザーが入力した内容を要素ごとに整理して表示し、個別に削除できます。",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<MiInputChipGroup>;

export default meta;
type Story = StoryObj<MiInputChipGroup>;

export const Basic: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <mi-input-chip-group aria-label="選択された項目">
        <mi-input-chip label="Apple"></mi-input-chip>
        <mi-input-chip label="Banana"></mi-input-chip>
        <mi-input-chip label="Cherry"></mi-input-chip>
        <mi-input-chip label="Dragon Fruit"></mi-input-chip>
        <mi-input-chip label="Elderberry"></mi-input-chip>
      </mi-input-chip-group>
    </div>
  `,
  tags: ["!dev-only"],
};

export const Wrap: Story = {
  render: () => html`
    <div style="padding: 40px; max-width: 300px;">
      <mi-input-chip-group aria-label="選択された項目">
        <mi-input-chip label="Apple"></mi-input-chip>
        <mi-input-chip label="Banana"></mi-input-chip>
        <mi-input-chip label="Cherry"></mi-input-chip>
        <mi-input-chip label="Dragon Fruit"></mi-input-chip>
        <mi-input-chip label="Elderberry"></mi-input-chip>
      </mi-input-chip-group>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "幅が狭い場合、Chip が折り返して表示されます。",
      },
    },
  },
  tags: ["!dev-only"],
};

export const LongLabel: Story = {
  render: () => html`
    <div style="padding: 40px; max-width: 200px;">
      <mi-input-chip-group aria-label="選択された項目">
        <mi-input-chip
          label="とても長いラベルテキストが省略される例"
        ></mi-input-chip>
        <mi-input-chip label="短いラベル"></mi-input-chip>
      </mi-input-chip-group>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "ラベルが長い場合、テキストが省略（ellipsis）されます。",
      },
    },
  },
  tags: ["!dev-only"],
};

/**
 * 追加・削除のサンプル用に、この Story だけで使う要素。
 *
 * `mi-input-chip` は自分では消えず、`remove` イベントを投げるだけなので、
 * 実際に消すのは利用側の役目。ここでは「状態の配列を正とし、そこから描画する」形にしている。
 *
 * `remove` は `bubbles: false` なのでグループでまとめて受け取れない。
 * テンプレートで各チップに `@remove` を直接バインドすると、
 * 追加のたびにリスナーが自動で付くため付け忘れが起きない。
 */
class InputChipStoryDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-inline-size: 420px;
    }

    .row {
      display: flex;
      gap: 8px;
      margin-block-end: 12px;
    }

    input {
      flex: 1;
      padding: 6px 8px;
      border: 1px solid rgb(0 0 0 / 20%);
      border-radius: 6px;
      font: inherit;
    }

    button {
      padding: 6px 12px;
      border: 1px solid rgb(0 0 0 / 20%);
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      font: inherit;
    }

    .empty {
      margin: 0;
      color: rgb(0 0 0 / 54%);
      font-size: 12px;
    }
  `;

  /** 表示の正となる状態。DOM ではなくこの配列を更新する */
  @state()
  private items: { id: string; label: string }[] = [
    { id: "apple", label: "Apple" },
    { id: "banana", label: "Banana" },
  ];

  /** 追加フォームを出すか（削除だけのサンプルでは false） */
  @state()
  private canAdd = true;

  #nextId = 0;

  #add(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    // mi-input-chip 側に重複防止の仕組みは無いので、利用側で弾く
    if (this.items.some((item) => item.label === trimmed)) return;
    this.#nextId += 1;
    this.items = [
      ...this.items,
      { id: `added-${this.#nextId}`, label: trimmed },
    ];
  }

  #remove(id: string) {
    const index = this.items.findIndex((item) => item.id === id);
    this.items = this.items.filter((item) => item.id !== id);

    // 削除したチップと一緒に × ボタンも消えるため、放っておくとフォーカスが body に飛ぶ。
    // 戻し先を決めるのは利用側の責任。ここでは隣のチップ、無ければ入力欄へ移す。
    void this.updateComplete.then(() => {
      const chips = Array.from(
        this.renderRoot.querySelectorAll<MiInputChip>("mi-input-chip"),
      );
      const next = chips[Math.min(index, chips.length - 1)];
      if (next) {
        next.focus();
        return;
      }
      this.renderRoot.querySelector<HTMLInputElement>("input")?.focus();
    });
  }

  #handleSubmit(e: Event) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input")!;
    this.#add(input.value);
    input.value = "";
    input.focus();
  }

  render() {
    return html`
      ${this.canAdd
        ? html`
            <form class="row" @submit=${this.#handleSubmit}>
              <input
                type="text"
                placeholder="追加する項目名"
                aria-label="追加する項目名"
              />
              <button type="submit">追加</button>
            </form>
          `
        : null}

      <mi-input-chip-group aria-label="選択された項目">
        ${repeat(
          this.items,
          (item) => item.id,
          (item) => html`
            <mi-input-chip
              label=${item.label}
              @remove=${() => this.#remove(item.id)}
            ></mi-input-chip>
          `,
        )}
      </mi-input-chip-group>

      ${this.items.length === 0
        ? html`<p class="empty">項目がありません</p>`
        : null}
    `;
  }
}

if (!customElements.get("input-chip-story-demo")) {
  customElements.define("input-chip-story-demo", InputChipStoryDemo);
}

/**
 * × を押すとチップが消えるサンプルです。
 *
 * `mi-input-chip` は `remove` イベントを発火するだけで、自分では消えません。
 * DOM から取り除くのは利用側の役目です。
 *
 * `remove` は `bubbles: false` のため、`mi-input-chip-group` でまとめて受け取ることはできません。
 * 各チップに直接バインドしてください。
 *
 * 削除すると × ボタンごと消えるため、放っておくとフォーカスが body に飛びます。
 * この Story では隣のチップへフォーカスを移しています。戻し先を決めるのは利用側の責任です。
 */
export const Removable: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <input-chip-story-demo .canAdd=${false}></input-chip-story-demo>
    </div>
  `,
  tags: ["!dev-only"],
};

/**
 * 検索や選択メニューからチップが追加される場合のサンプルです。
 *
 * 状態の配列を正として描画すると、追加のたびに `@remove` が自動で付くため、
 * 「リスナーを付け忘れて消せないチップができる」事故を防げます。
 * `appendChild` で DOM に足すだけだと `remove` を拾えないので注意してください。
 *
 * `repeat` に key を渡しているのは、削除時に DOM が再利用されてラベルがずれるのを防ぐためです。
 * 重複チェックも `mi-input-chip` 側には無いので、利用側で行っています。
 *
 * 削除後は隣のチップへ、最後の1件を消したときは入力欄へフォーカスを戻しています。
 * チップを消すと × ボタンごと消えるため、キーボード操作では戻し先の指定が要ります。
 */
export const AddAndRemove: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <input-chip-story-demo></input-chip-story-demo>
    </div>
  `,
  tags: ["!dev-only"],
};
