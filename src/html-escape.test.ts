import { escape, unescape } from "./html-escape";

describe("html escape unescape test", () => {
  it.each([
    ["&", "&amp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ['"', "&quot;"],
    ["'", "&#39;"],
  ])("문자 %s 에 대해서 escape %s 한다", (input, expected) => {
    expect(escape(input)).toBe(expected);
  });

  it("일반 문자열은 그대로 반환한다", () => {
    const str = "hello";
    expect(escape(str)).toBe(str);
  });

  it.each([
    ["&", "&amp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ['"', "&quot;"],
    ["'", "&#39;"],
  ])(
    "escape해야 할 문자와 하지 말아야 할 문자가 섞여 있어도 escape문자만 escape한다",
    (input, expected) => {
      const str = "hello";
      expect(escape(`${str} ${input}`)).toBe(`${str} ${expected}`);
    }
  );

  it.each([
    ["&amp;", "&"],
    ["&lt;", "<"],
    ["&gt;", ">"],
    ["&quot;", '"'],
    ["&#39;", "'"],
  ])("문자 %s 에 대해서 unescape %s 한다", (input, expected) => {
    expect(unescape(input)).toBe(expected);
  });

  it("일반 문자열은 그대로 반환한다", () => {
    const str = "hello";
    expect(unescape(str)).toBe(str);
  });

  it.each([
    ["&amp;", "&"],
    ["&lt;", "<"],
    ["&gt;", ">"],
    ["&quot;", '"'],
    ["&#39;", "'"],
  ])(
    "unescape해야 할 문자와 하지 말아야 할 문자가 섞여 있어도 unescape문자만 escape한다",
    (input, expected) => {
      const str = "hello";
      expect(unescape(`${str} ${input}`)).toBe(`${str} ${expected}`);
    }
  );

  it.skip("빈 문자열을 넣으면 빈 문자열을 반환한다", () => {
    expect(escape("")).toBe("");
    expect(unescape("")).toBe("");
  });
});
