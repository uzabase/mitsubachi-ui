import { html } from "lit";

export const errorPageStyles = html`
  <style>
    .errorPage {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .errorPage__content {
      text-align: center;
    }

    .errorPage__code {
      margin: 0;
      line-height: 1;
    }

    .errorPage__title {
      margin: 40px 0 0;
      font-size: 20px;
    }

    .errorPage__description {
      margin: 12px 0 0;
      font-size: 14px;
      color: #666;
    }

    .errorPage__action {
      margin-top: 24px;
    }
  </style>
`;
