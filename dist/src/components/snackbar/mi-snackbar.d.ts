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
 * @slot - メッセージ本文（`text` のような属性ではなく、子要素／スロットで渡します）
 *
 * @cssprop --surface-success - 背景色
 * @cssprop --text-regular-default - テキスト色
 * @cssprop --snackbar-z-index - 重なり順（デフォルトは React 版 viewport と同程度の大きい値）
 * @cssprop --snackbar-transition-duration - 入退出アニメーションの時間（デフォルト 200ms）
 *
 * ## 配置について
 *
 * `mi-snackbar` 自体は画面端に固定するスタイルを内包していません（配置はマウント先のレイアウトに従います）。
 * デザインどおり「デスクトップでは右上・狭い画面では下中央」に重ね表示したい場合は、
 * `mi-snackbar-viewport` を 1 つ置き、その子としてポータルしてください（複数同時表示は縦方向に gap でずれて並びます）。
 *
 * 自前のコンテナを使う場合は `document.body` 直下など、ビューポート基準で `position: fixed` できる要素にしてください。
 * 祖先要素の `transform` などによっては `fixed` の基準がずれ、意図しない位置に見えることがあります。
 *
 * ### なぜ viewport ラッパーを組み込まないか
 *
 * - **責務の分離**: 通知の見た目・閉じる挙動・アニメに責務を絞り、画面端への固定やポータル先はアプリのレイアウトやフレームワークに合わせて載せ替えやすくしています。
 * - **利用側の差**: SSR・複数同時表示・既存の Toast 基盤・z-index の都合などで最適なマウント方法が異なり、単一のポータル方針をライブラリに押し付けにくいためです。
 * - **既存設計との整合**: React 版でも Snackbar 本体と viewport／Provider 側を分ける想定に揃えています。
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
    private exitRemoved;
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
    private removeSelf;
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