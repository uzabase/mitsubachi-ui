import { PropertyValues } from '@lit/reactive-element';
import { LitElement } from 'lit';
export declare const snackbarSizes: readonly ["small", "medium"];
export type SnackbarSize = (typeof snackbarSizes)[number];
/**
 * ユーザー操作に対する成功時の短いフィードバックを表示するオーバーレイ通知です。
 * 失敗・警告・エラーは `mi-inline-notification` 等で伝えてください。
 *
 * @summary 成功フィードバック用の Snackbar
 *
 * @slot - メッセージ本文
 *
 * @fires close - 閉じる操作・自動非表示のいずれかの後、退出アニメーション完了時（またはアニメなし時）。`bubbles` と `composed` が true。
 *
 * @cssprop --surface-success - 背景色
 * @cssprop --text-regular-default - テキスト色
 * @cssprop --snackbar-z-index - 重なり順（デフォルトは React 版 viewport と同程度の大きい値）
 * @cssprop --snackbar-transition-duration - 入退出アニメーションの時間（デフォルト 200ms）
 *
 * 複数件を同じ位置に縦に積む場合は `mi-snackbar-viewport` の子としてマウントしてください。
 *
 * @example
 * ```html
 * <mi-snackbar size="small">保存しました</mi-snackbar>
 * <mi-snackbar size="medium">処理が完了しました。詳細は一覧をご確認ください。</mi-snackbar>
 * <!-- 自動で閉じない（テストや常時表示用） -->
 * <mi-snackbar auto-hide-timeout="0">メッセージ</mi-snackbar>
 * ```
 */
export declare class MiSnackbar extends LitElement {
    static styles: import('lit').CSSResult[];
    /**
     * 表示サイズ。`small` / `medium` とも最大幅 400px（`inline-size` は内容に応じ可変）。いずれも最大3行まで。
     * @default 'small'
     */
    size: SnackbarSize;
    /**
     * 表示してから自動的に閉じるまでの時間（ミリ秒）。React 版 `Snackbar.Provider` の `timeout` に相当。
     * `0` 以下のときは自動非表示しません。
     * @default 5000
     */
    autoHideTimeout: number;
    /** 入場アニメーション用（初回は React 版 data-starting-style に相当） */
    private entering;
    /** 退場アニメーション用（React 版 data-ending-style に相当） */
    private exiting;
    private exitCloseDispatched;
    /** 退出時に opacity / transform の transitionend を両方待つ（片方だけだとカクつきやすい） */
    private readonly exitTransitionSeen;
    private exitFallbackTimer;
    private autoHideTimerId;
    private clearAutoHideTimer;
    private scheduleAutoHide;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    protected firstUpdated(): void;
    private dispatchClose;
    private beginClose;
    private handleRootTransitionEnd;
    private handleClose;
    /**
     * 閉じるボタンと同じ退出アニメーションを開始する（プログラムからの取下げ・キュー上限など）。
     * 既に退出中のときは `false` を返す。
     */
    dismiss(): boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "mi-snackbar": MiSnackbar;
    }
}
//# sourceMappingURL=mi-snackbar.d.ts.map