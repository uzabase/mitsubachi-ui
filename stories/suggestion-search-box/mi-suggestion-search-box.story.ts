import "../../src/components/suggestion-search-box/mi-suggestion-search-box";
import "../../src/components/suggestion-search-box/mi-suggestion-item";

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html, nothing } from "lit";
import { action } from "storybook/actions";

import type { MiSuggestionSearchBox } from "../../src/components/suggestion-search-box/mi-suggestion-search-box";

/** Storybook Actions 用（コンポーネントの公開 API 外） */
type MiSuggestionSearchBoxStory = MiSuggestionSearchBox & {
  onInput?: (...args: unknown[]) => void;
  onChange?: (...args: unknown[]) => void;
  onSelect?: (...args: unknown[]) => void;
};

/*
 * デモの処理と Show code に表示するコードは、同じ内容になるように保つ。
 * 企業データはここで1回だけ定義し、Show code にもここから書き出す。
 */

type Company = { id: string; name: string };

const companies: Company[] = [
  { id: "7203", name: "トヨタ自動車" },
  { id: "3116", name: "トヨタ紡織" },
  { id: "8015", name: "豊田通商" },
  { id: "6758", name: "ソニーグループ" },
  { id: "9984", name: "ソフトバンクグループ" },
  { id: "7974", name: "任天堂" },
];

/** 名前に入力値を含む企業を、候補（mi-suggestion-item）として子要素に入れ替える */
const updateSuggestions = (box: MiSuggestionSearchBox) => {
  const hits = box.value
    ? companies.filter((c) => c.name.includes(box.value))
    : [];
  box.replaceChildren(
    ...hits.map((c) => {
      const item = document.createElement("mi-suggestion-item");
      item.value = c.id;
      item.textContent = c.name;
      return item;
    }),
  );
};

/** 同じストーリー内の要素を探す（Docs ページでは複数のストーリーが並ぶため document からは探さない） */
const findInStory = <T extends Element>(from: Element, selector: string) =>
  from.closest(".story-container")?.querySelector<T>(selector) ?? null;

/** 選ばれた企業の名前を output に表示する */
const showSelectedName = (e: Event) => {
  const box = e.currentTarget as MiSuggestionSearchBox;
  const { value } = (e as CustomEvent<{ value: string }>).detail;
  const output = findInStory(box, "output");
  if (output) output.textContent = companies.find((c) => c.id === value)!.name;
};

/** Show code 用: HTML と script を1つのコードにまとめる */
const toSource = (markup: string[], script: string[] = []) =>
  [
    ...markup,
    ...(script.length
      ? [
          "",
          "<script>",
          ...script.map((line) => (line ? `  ${line}` : "")),
          "</script>",
        ]
      : []),
  ].join("\n");

const companiesSource = [
  "const companies = [",
  ...companies.map((c) => `  { id: "${c.id}", name: "${c.name}" },`),
  "];",
];

const filterSource = [
  'const box = document.querySelector("mi-suggestion-search-box");',
  "",
  "// 入力が変わるたびに、名前に入力値を含む企業を候補にする（日本語変換中は発火しない）",
  'box.addEventListener("input", () => {',
  "  const hits = box.value",
  "    ? companies.filter((c) => c.name.includes(box.value))",
  "    : [];",
  "  box.replaceChildren(",
  "    ...hits.map((c) => {",
  '      const item = document.createElement("mi-suggestion-item");',
  "      item.value = c.id;",
  "      item.textContent = c.name;",
  "      return item;",
  "    }),",
  "  );",
  "});",
];

/** Default の Show code: Controls で変えた属性を反映する */
const defaultSource = (args: Partial<MiSuggestionSearchBoxStory>) => {
  const attrs = [
    args.label && `label="${args.label}"`,
    args.value && `value="${args.value}"`,
    args.placeholder && `placeholder="${args.placeholder}"`,
    args.name && `name="${args.name}"`,
    args.variant && args.variant !== "primary" && `variant="${args.variant}"`,
    args.disabled && "disabled",
    args.autocomplete &&
      args.autocomplete !== "off" &&
      `autocomplete="${args.autocomplete}"`,
    args.autofocus && "autofocus",
    args.required && "required",
    args.description && `description="${args.description}"`,
  ].filter(Boolean);

  return toSource(
    [
      "<mi-suggestion-search-box",
      ...attrs.map((attr) => `  ${attr}`),
      "></mi-suggestion-search-box>",
      "<p>選択: <output></output></p>",
    ],
    [
      ...companiesSource,
      "",
      ...filterSource,
      "",
      "// 候補が選ばれたら、その企業名を表示する（入力欄の文字は変わらない）",
      'box.addEventListener("select", (e) => {',
      "  const company = companies.find((c) => c.id === e.detail.value);",
      '  document.querySelector("output").textContent = company.name;',
      "});",
    ],
  );
};

/**
 * 候補リストはボックスの下に重なって表示されるため、Docs の枠内に収まるよう下に余白を確保する
 */
const withListboxSpace = (story: () => unknown) =>
  html`<div style="padding-bottom: 160px;">${story()}</div>`;

const meta = {
  component: "mi-suggestion-search-box",
  title: "Components/SuggestionSearchBox/mi-suggestion-search-box",
  tags: ["autodocs", "!dev-only"],
  parameters: {
    docs: {
      description: {
        component: [
          "入力に応じて候補を表示する検索ボックスです。`mi-search-box` の機能（クリアボタン・フォーム連携など）をすべて引き継ぎます。",
          "",
          "### 役割分担",
          "",
          "- **コンポーネント**: 候補リストの開閉、キーボード操作、スクリーンリーダー向けの状態（combobox / listbox）",
          "- **利用側**: 候補の絞り込み（`input` を受けて子要素の `mi-suggestion-item` を入れ替える）と、選ばれた後の処理（`select`）",
          "",
          "コンポーネント自身は候補を絞り込みません。子要素として渡された候補をそのまま表示します。",
          "",
          "### 候補: `mi-suggestion-item`",
          "",
          "| 属性 | 説明 |",
          "| --- | --- |",
          "| `value` | 候補の識別子。選ばれると `select` の `detail.value` に入ります |",
          "",
          "中身のテキストが表示名になります。",
          "",
          "### 開閉",
          "",
          "- 入力欄にフォーカスがあり、候補が1件以上あると開きます",
          "- フォーカスが外れる・候補が0件になる・Esc・候補を選ぶと閉じます",
          "",
          "### キーボード操作",
          "",
          "| キー | 動き |",
          "| --- | --- |",
          "| ↓ / ↑ | 候補を順に強調（端の次は強調なしに戻る）。閉じているときの ↓ は開くだけ |",
          "| Enter | 強調中の候補を選ぶ |",
          "| Esc | 開いていれば閉じる（文字は消さない）。閉じていれば文字を消す |",
          "| Tab | 閉じる（強調中の候補は選ばない） |",
          "| ← / → / Home / End | 強調を外す（カーソルは通常どおり動く） |",
          "",
          "強調しても入力欄の文字は変わりません。",
          "",
          "### 日本語入力（IME）",
          "",
          "変換中は候補に何も影響を与えません。`input` も発火せず、確定した時点で1回だけ発火します。",
          "利用側は「`input` が来たら候補を入れ替える」だけで、変換中かどうかを気にする必要はありません。",
          "",
          "### 既知の制約",
          "",
          "候補リストは、入力欄の直下に重ねて表示します（`position: absolute`）。祖先要素に `overflow: hidden` / `overflow: auto` などが指定されていると、その範囲の外にはみ出した部分が切れて見えなくなります（例: ダイアログの本文やスクロール領域の中）。",
          "候補リストが収まるよう下側に余白を確保するか、`overflow` が指定されていない場所に配置してください。",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description:
        "入力欄と候補リストの読み上げ名（aria-label）。見出しが無い場合も必ず指定してください",
    },
    value: {
      control: "text",
      description: "入力値。候補を選んでも変わりません",
    },
    placeholder: { control: "text", description: "プレースホルダー" },
    name: { control: "text", description: "フォーム送信時の名前" },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "見た目のバリアント",
    },
    disabled: { control: "boolean", description: "無効化状態" },
    autocomplete: {
      control: "text",
      description: "ブラウザの自動補完。既定は `off`",
    },
    autofocus: { control: "boolean", description: "自動でフォーカスする" },
    required: {
      control: "boolean",
      description: "入力欄に aria-required を付与します",
    },
    description: {
      control: "text",
      description:
        "入力欄の説明としてスクリーンリーダーに読み上げるテキスト。画面には表示しません",
    },
    onInput: {
      name: "input",
      description: [
        "入力値が変わったときに発火します。候補の入れ替えはこのイベントで行います。",
        "",
        "- 発火する: 文字の入力、日本語変換の確定、クリアボタン",
        "- 発火しない: 日本語変換の途中",
        "",
        "```js",
        'box.addEventListener("input", () => {',
        "  box.value; // 新しい入力値",
        "});",
        "```",
      ].join("\n"),
      table: { category: "Events", type: { summary: "InputEvent" } },
    },
    onChange: {
      name: "change",
      description:
        "値が確定したとき（主にフォーカスが外れたとき）に発火します。`mi-search-box` と同じです。",
      table: { category: "Events", type: { summary: "Event" } },
    },
    onSelect: {
      name: "select",
      description: [
        "候補が選ばれたとき（Enter またはクリック）に発火します。",
        "",
        "- `detail.value`: 選ばれた `mi-suggestion-item` の `value`",
        "- `bubbles` / `composed` / `cancelable`: すべて `false`（親要素では受け取れません。このコンポーネントに直接登録してください）",
        "- 選んでも入力欄の文字は変わりません",
        "- 入力欄の文字の範囲選択では発火しません",
        "",
        "```js",
        'box.addEventListener("select", (e) => {',
        '  e.detail.value; // "7203"',
        "});",
        "```",
      ].join("\n"),
      table: {
        category: "Events",
        type: { summary: "CustomEvent<{ value: string }>" },
      },
    },
  },
  args: {
    label: "企業検索",
    value: "",
    placeholder: "企業名で検索（例: トヨタ）",
    name: "",
    variant: "primary",
    disabled: false,
    autocomplete: "off",
    autofocus: false,
    required: false,
    description: "",
    onInput: action("input"),
    onChange: action("change"),
    onSelect: action("select"),
  },
} satisfies Meta<MiSuggestionSearchBoxStory>;

export default meta;
type Story = StoryObj<MiSuggestionSearchBoxStory>;

/** Controls で属性を切り替えられます。「トヨタ」「ソ」などを入力してみてください。 */
export const Default: Story = {
  render: (args) => html`
    <div class="story-container" style="width: 320px;">
      <mi-suggestion-search-box
        label=${args.label || nothing}
        value=${args.value}
        placeholder=${args.placeholder || nothing}
        name=${args.name || nothing}
        variant=${args.variant}
        ?disabled=${args.disabled}
        autocomplete=${args.autocomplete}
        ?autofocus=${args.autofocus}
        ?required=${args.required}
        description=${args.description || nothing}
        @input=${(e: Event) => {
          const box = e.currentTarget as MiSuggestionSearchBox;
          updateSuggestions(box);
          args.onInput?.({ value: box.value });
        }}
        @change=${(e: Event) =>
          args.onChange?.({
            value: (e.currentTarget as MiSuggestionSearchBox).value,
          })}
        @select=${(e: Event) => {
          showSelectedName(e);
          args.onSelect?.((e as CustomEvent).detail);
        }}
      ></mi-suggestion-search-box>
      <p style="margin-top: 8px; font-size: 14px;">選択: <output></output></p>
    </div>
  `,
  decorators: [withListboxSpace],
  parameters: {
    docs: {
      source: {
        language: "html",
        transform: (_code: string, context: unknown) =>
          defaultSource(
            (context as { args?: Partial<MiSuggestionSearchBoxStory> }).args ??
              {},
          ),
      },
    },
  },
};

/**
 * 最小構成のサンプルです。候補を HTML に直接書き、選ばれたときの処理だけ JS で書きます。
 * 入力欄にフォーカスすると開きます。
 */
export const Minimal: Story = {
  render: () => html`
    <div class="story-container" style="width: 320px;">
      <mi-suggestion-search-box
        label="企業検索"
        @select=${(e: Event) => {
          const output = findInStory(e.currentTarget as Element, "output");
          if (output) output.textContent = (e as CustomEvent).detail.value;
        }}
      >
        <mi-suggestion-item value="7203">トヨタ自動車</mi-suggestion-item>
        <mi-suggestion-item value="6758">ソニーグループ</mi-suggestion-item>
        <mi-suggestion-item value="7974">任天堂</mi-suggestion-item>
      </mi-suggestion-search-box>
      <p style="margin-top: 8px; font-size: 14px;">
        選択された value: <output></output>
      </p>
    </div>
  `,
  decorators: [withListboxSpace],
  parameters: {
    docs: {
      source: {
        language: "html",
        code: [
          '<mi-suggestion-search-box label="企業検索">',
          '  <mi-suggestion-item value="7203">トヨタ自動車</mi-suggestion-item>',
          '  <mi-suggestion-item value="6758">ソニーグループ</mi-suggestion-item>',
          '  <mi-suggestion-item value="7974">任天堂</mi-suggestion-item>',
          "</mi-suggestion-search-box>",
          "<p>選択された value: <output></output></p>",
          "",
          "<script>",
          '  const box = document.querySelector("mi-suggestion-search-box");',
          "",
          "  // 候補が選ばれたら、その value を表示する",
          '  box.addEventListener("select", (e) => {',
          '    document.querySelector("output").textContent = e.detail.value;',
          "  });",
          "</script>",
        ].join("\n"),
      },
    },
  },
};

/** イベントログの1行。「イベント名  detail  その時点の value」を表示する */
const logRowOf = (e: Event, box: MiSuggestionSearchBox) =>
  [
    e.type.padEnd(6),
    e instanceof CustomEvent ? `detail: ${JSON.stringify(e.detail)}` : "",
    `value: "${box.value}"`,
  ]
    .filter(Boolean)
    .join("  ");

/**
 * 発火したイベントを右のログに表示します（Actions パネルにも同じ内容を出します）。
 *
 * 試してみてください:
 * - 日本語で「とよた」と入力して変換・確定 → 変換中は `input` が出ず、確定時に1回だけ出る
 * - ↓ と Enter で候補を選ぶ → `select` が出るが、`value` は変わらない
 * - クリアボタンを押す → `input` が出る
 * - 入力欄の文字をドラッグで範囲選択する → `select` は出ない
 * - 入力欄の外をクリックする → `change` が出る
 */
export const EventLog: Story = {
  render: () => {
    const log = (e: Event) => {
      const box = e.currentTarget as MiSuggestionSearchBox;
      const row = document.createElement("li");
      row.textContent = logRowOf(e, box);
      findInStory(box, "ol")?.prepend(row);
      action(e.type)({
        detail: e instanceof CustomEvent ? e.detail : undefined,
        value: box.value,
      });
    };

    return html`
      <div
        class="story-container"
        style="display:flex;gap:24px;align-items:flex-start;"
      >
        <mi-suggestion-search-box
          label="企業検索"
          placeholder="企業名で検索（例: トヨタ）"
          style="flex:0 0 320px;"
          @input=${(e: Event) => {
            updateSuggestions(e.currentTarget as MiSuggestionSearchBox);
            log(e);
          }}
          @change=${log}
          @select=${log}
        ></mi-suggestion-search-box>
        <section style="flex:0 0 400px;">
          <div
            style="display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:bold;"
          >
            イベントログ（新しい順）
            <button
              type="button"
              @click=${(e: Event) =>
                findInStory(
                  e.currentTarget as Element,
                  "ol",
                )?.replaceChildren()}
            >
              クリア
            </button>
          </div>
          <ol
            style="list-style:none;margin:4px 0 0;padding:8px;block-size:200px;overflow:auto;background:#f5f5f5;font:12px/1.6 monospace;white-space:pre;"
          ></ol>
        </section>
      </div>
    `;
  },
  parameters: {
    docs: {
      source: {
        language: "html",
        code: toSource(
          [
            '<mi-suggestion-search-box label="企業検索" placeholder="企業名で検索（例: トヨタ）"></mi-suggestion-search-box>',
            "",
            "<p>イベントログ（新しい順）</p>",
            "<button>クリア</button>",
            "<ol></ol>",
          ],
          [
            ...companiesSource,
            "",
            ...filterSource,
            "",
            'const log = document.querySelector("ol");',
            "",
            "// 発火したイベントを「イベント名  detail  その時点の value」の形でログの先頭に追加する",
            'for (const type of ["input", "change", "select"]) {',
            "  box.addEventListener(type, (e) => {",
            '    const row = document.createElement("li");',
            "    row.textContent = [",
            "      type.padEnd(6),",
            '      e.detail ? `detail: ${JSON.stringify(e.detail)}` : "",',
            '      `value: "${box.value}"`,',
            '    ].filter(Boolean).join("  ");',
            "    log.prepend(row);",
            "  });",
            "}",
            "",
            'document.querySelector("button").addEventListener("click", () => {',
            "  log.replaceChildren();",
            "});",
          ],
        ),
      },
    },
  },
};

/** 候補リストが開いた状態です。表示確認のため、読み込み時に入力欄へフォーカスしています。 */
export const Opened: Story = {
  render: () => html`
    <div style="width: 320px;">
      <mi-suggestion-search-box label="企業検索" value="トヨタ">
        <mi-suggestion-item value="7203">トヨタ自動車</mi-suggestion-item>
        <mi-suggestion-item value="3116">トヨタ紡織</mi-suggestion-item>
      </mi-suggestion-search-box>
    </div>
  `,
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelector<MiSuggestionSearchBox>("mi-suggestion-search-box")
      ?.focus();
  },
  decorators: [withListboxSpace],
  parameters: {
    docs: {
      source: {
        language: "html",
        code: [
          '<mi-suggestion-search-box label="企業検索" value="トヨタ">',
          '  <mi-suggestion-item value="7203">トヨタ自動車</mi-suggestion-item>',
          '  <mi-suggestion-item value="3116">トヨタ紡織</mi-suggestion-item>',
          "</mi-suggestion-search-box>",
          "",
          "<script>",
          "  // 表示確認のため、入力欄にフォーカスして候補リストを開く",
          '  document.querySelector("mi-suggestion-search-box").focus();',
          "</script>",
        ].join("\n"),
      },
    },
  },
};

/** 閉じた状態の一覧（Primary / Secondary 比較） */
export const AllStates: Story = {
  render: () => html`
    <div
      style="display:grid;grid-template-columns:auto 256px 256px;gap:24px 16px;align-items:start;padding:40px;"
    >
      <div></div>
      <p style="color:#666;font-size:12px;margin:0;font-weight:bold;">
        Primary
      </p>
      <p style="color:#666;font-size:12px;margin:0;font-weight:bold;">
        Secondary
      </p>

      <p style="color:#666;font-size:12px;margin:0;">Default</p>
      <mi-suggestion-search-box
        label="企業検索"
        placeholder="Placeholder"
      ></mi-suggestion-search-box>
      <mi-suggestion-search-box
        label="企業検索"
        placeholder="Placeholder"
        variant="secondary"
      ></mi-suggestion-search-box>

      <p style="color:#666;font-size:12px;margin:0;">With Text</p>
      <mi-suggestion-search-box
        label="企業検索"
        value="Text"
      ></mi-suggestion-search-box>
      <mi-suggestion-search-box
        label="企業検索"
        value="Text"
        variant="secondary"
      ></mi-suggestion-search-box>

      <p style="color:#666;font-size:12px;margin:0;">Disabled</p>
      <mi-suggestion-search-box
        label="企業検索"
        placeholder="Placeholder"
        disabled
      ></mi-suggestion-search-box>
      <mi-suggestion-search-box
        label="企業検索"
        placeholder="Placeholder"
        variant="secondary"
        disabled
      ></mi-suggestion-search-box>
    </div>
  `,
  parameters: { layout: "fullscreen" },
};
