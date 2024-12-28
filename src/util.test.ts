import { toUpperCase } from "./util";

describe("toUpperCase 테스트", () => {
  it("소문자를 넣으면 대문자로 변환한다.", () => {
    // Arrange
    const param = "abc";
    const output = "ABC";

    // Act
    // actual: "실제로" 함수를 호출한 결과
    const actual = toUpperCase("abc");

    // Assert
    // 실제값이 내가 의도한 값과 맞는지?
    expect(actual).toBe("ABC");
  });

  it("소문자를 넣으면 대문자로 변환되어야한다.", () => {
    const param = "abc";
    // "@#$" -> "@#$"
    // "123" -> "123"
    const output = "abc";

    const actual = toUpperCase("abc");

    // toBe: ===
    expect(actual).not.toBe("abc");
  });

  it("특수문자를 넣으면 그대로 반환한다.", () => {
    const param = "@#$";

    const actual = toUpperCase(param);

    expect(actual).toBe(param);
  });

  it("빈문자열을 넣으면 에러를 던진다.", () => {
    const param = "";

    // const actual = toUpperCase(param);
    expect(() => toUpperCase(param)).toThrow();
  });
});

// // Form 관련 테스트
// // Form의 요소: name input, email input, submit button
// describe("Form 테스트", () => {
//   it("name input에 텍스트를 입력하면 name에 텍스트값이 있어야합니다.", () => {
//     // 실제 테스트 코드 작성
//     // Arrange
//     // 테스트에 필요한 파라미터, 예상값 등 테스트에 필요한 데이터를 정의
//     // Act
//     // 테스트 대상 함수를 호출
//     // Assert
//     // 테스트 결과를 검증
//   });

//   it("email input test...", () => {});
//   it("submit button test...", () => {});
// });
