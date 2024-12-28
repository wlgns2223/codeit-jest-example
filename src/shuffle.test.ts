import shuffle from "./shuffle";

describe("shuffle test", () => {
  const arr = [1, 2, 3];

  beforeEach(() => {
    const mockingFn = jest.spyOn(global.Math, "random");
    mockingFn.mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("빈 배열이 들어오면 빈 배열을 반환한다", () => {
    const arr = [];
    expect(shuffle(arr)).toEqual([]);
  });

  it("배열의 null이면 빈 배열을 반환한다", () => {
    const arr = null;
    expect(shuffle(arr as any)).toEqual([]);
  });

  it("shuffle을 실행하면 원본 배열과 다르다.", () => {
    const actual = shuffle(arr);
    expect(actual).not.toEqual(arr);
  });

  it("셔플을 실행하면 원본 배열의 길이와 같다", () => {
    const actual = shuffle(arr);
    expect(actual.length).toBe(arr.length);
  });

  it("셔플은 원본 배열의 원소를 모두 포함한다", () => {
    const actual = shuffle(arr);
    arr.forEach((value) => {
      expect(actual).toContain(value);
    });
  });
  it.skip("셔플을 여러번 실행하면 결과가 서로 다르다.", () => {
    const first_actual = shuffle(arr);
    const second_actual = shuffle(arr);

    expect(first_actual).not.toStrictEqual(second_actual);
  });
});
