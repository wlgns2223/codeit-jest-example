import { chunk } from "./chunk";

describe("chunk 테스트", () => {
  const array = [1, 2, 3, 4];

  it("array가 null 일 경우 빈 배열을 반환한다.", () => {
    const size = 1;
    const array = null;

    const actual = chunk(array as any, size);

    expect(actual).toEqual([]);
    expect(actual).toHaveLength(0);
  });

  it("size가 0이면 빈배열을 반환한다.", () => {
    const size = 0;

    const actual = chunk(array, size);

    expect(actual).toEqual([]);
    expect(actual).toHaveLength(0);
  });

  it("size < 0 일 경우 빈 배열을 반환한다.", () => {
    const size = -1;

    const actual = chunk(array, size);

    expect(actual).toEqual([]);
    expect(actual).toHaveLength(0);
  });

  it("size를 입력하지 않을 경우 chunk의 길이가 1이다.", () => {
    const actual = chunk(array);

    expect(actual).toEqual([[1], [2], [3], [4]]);
    expect(actual).toHaveLength(4);
  });

  it("size가 length보다 클 경우 원본 배열을 그대로 반환한다.", () => {
    const size = 5;

    const actual = chunk(array, size);

    expect(actual).toEqual([[1, 2, 3, 4]]);
    expect(actual).toHaveLength(1);
  });

  it("slice가 실수일 경우에는 버림을 한다.", () => {
    const size = 1.5;

    const actual = chunk(array, size);

    expect(actual).toEqual([[1], [2], [3], [4]]);
  });
});
