import slice from "./slice";

describe("slice 함수 테스트", () => {
  const arr = [1, 2, 3];

  it("빈 배열을 넣으면 빈 배열을 리턴한다.", () => {
    const actual = slice([]);
    expect(actual).toEqual([]);
  });

  it("start가 null, end가 undefined면 배열 전체를 그대로 리턴", () => {
    const actual = slice(arr);
    expect(actual).toEqual(arr);
  });

  it("start > 0이고 end가 undefined 인 경우에 start부터 끝까지 리턴", () => {
    const start = 2;
    const actual = slice(arr, start);

    expect(actual).toEqual([3]);
  });

  it("start가 > 0이고 end > 0 && end < length", () => {
    const start = 1;
    const end = 2;

    const actual = slice(arr, start, end);

    expect(actual).toEqual([2]);
  });

  it("start가 undefined이고 end > 0 && end < length", () => {
    const end = 2;

    const actual = slice(arr, undefined, end);

    expect(actual).toEqual([1, 2]);
  });

  it("start ,end > 0 && start > end ", () => {
    const start = 2;
    const end = 1;

    const actual = slice(arr, start, end);

    expect(actual).toEqual([]);
    expect(actual).toHaveLength(0);
  });

  it("start < 0 && | start | < length", () => {
    const start = -2;

    const actual = slice(arr, start);

    expect(actual).toEqual([2, 3]);
  });

  it("start < 0 && | start | > length", () => {
    const start = -10;

    const actual = slice(arr, start);

    expect(actual).toEqual(arr);
    expect(actual).toHaveLength(arr.length);
    for (const num of arr) {
      expect(actual).toContain(num);
    }
  });

  it("start=== undefined && end < 0 && |end| <length", () => {
    const end = -2;

    const actual = slice(arr, undefined, end);

    expect(actual).toEqual([1]);
  });

  it(" start === undefined && end < 0 && |end| > length", () => {
    const end = -10;

    const actual = slice(arr, undefined, end);

    expect(actual).toEqual([]);
  });
});
