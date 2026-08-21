import { describe, expect, test } from "vitest";

import { normalizeRows } from "../../src/components/text-area/mi-text-area";

describe("normalizeRows", () => {
  describe("最小行数", () => {
    test("2 以上の指定はそのまま通る", () => {
      expect(normalizeRows(4, null).minRows).toBe(4);
    });

    test("2 未満は 2 に切り上げる", () => {
      // デザイン仕様上 2 行が下限
      expect(normalizeRows(1, null).minRows).toBe(2);
      expect(normalizeRows(0, null).minRows).toBe(2);
      expect(normalizeRows(-3, null).minRows).toBe(2);
    });

    test("数値でない指定は 2 として扱う", () => {
      // min-rows="abc" は NaN になる
      expect(normalizeRows(Number.NaN, null).minRows).toBe(2);
      expect(normalizeRows(Number.POSITIVE_INFINITY, null).minRows).toBe(2);
    });

    test("小数はそのまま通す", () => {
      // CSS の calc でそのまま扱えるため、あえて切り捨てない
      expect(normalizeRows(2.5, null).minRows).toBe(2.5);
    });
  });

  describe("最大行数", () => {
    test("未指定なら上限なしのまま", () => {
      expect(normalizeRows(3, null).maxRows).toBe(null);
    });

    test("最小行数より大きい指定はそのまま通る", () => {
      expect(normalizeRows(3, 8).maxRows).toBe(8);
    });

    test("最小行数と同じ指定も通る（高さを固定する用途）", () => {
      expect(normalizeRows(3, 3).maxRows).toBe(3);
    });

    test("最小行数より小さい指定は最小行数に揃える", () => {
      expect(normalizeRows(5, 3).maxRows).toBe(5);
      // 切り上げ後の最小行数が基準になる
      expect(normalizeRows(1, 1).maxRows).toBe(2);
    });

    test("0 以下は上限なしとして扱う", () => {
      // max-rows（値なし）は空文字 → 0 になる。
      // そのまま最小行数に揃えると「一切伸びない」状態が書き間違いで作られてしまう
      expect(normalizeRows(3, 0).maxRows).toBe(null);
      expect(normalizeRows(3, -1).maxRows).toBe(null);
    });

    test("数値でない指定は上限なしとして扱う", () => {
      expect(normalizeRows(3, Number.NaN).maxRows).toBe(null);
      expect(normalizeRows(3, Number.POSITIVE_INFINITY).maxRows).toBe(null);
    });
  });
});
