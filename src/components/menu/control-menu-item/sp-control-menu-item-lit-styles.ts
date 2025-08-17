import { css } from "lit";

export const spControlMenuItemLitStyles = css`
  :host {
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    padding: 4px 12px 4px 16px;
    box-sizing: border-box;
    min-height: 32px;
    cursor: pointer;
    color: #000000d6;
    column-gap: 8px;
  }

  .icon {
    display: none;
    width: 24px;
    height: 24px;
  }

  :host([selected]) {
    background-color: #f0f6ff;
  }

  :host([selected]) .icon {
    display: block;
  }

  :host([selected]:hover) {
    background-color: #e3efff;
  }

  :host([selected]:active) {
    background-color: #d4e6ff;
  }

  :host([disabled]) {
    background-color: transparent;
    cursor: not-allowed;
    color: #00000059;
  }

  :host([disabled]:hover) {
    background-color: transparent;
  }

  :host([disabled]:active) {
    background-color: transparent;
  }

  :host([disabled]:focus) {
    border: none;
    padding: 4px 12px 4px 16px;
  }

  :host(:hover) {
    background-color: #f8f8f8;
  }

  :host(:active) {
    background-color: #0000000d;
  }

  :host(:focus) {
    border: 2px solid #191919;
    box-sizing: border-box;
    padding: 2px 10px 2px 14px;
    outline: none;
  }
`;
