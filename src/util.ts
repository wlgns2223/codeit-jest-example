export const toUpperCase = (str: string) => {
  // 어떠한 로직...

  if (str === "") {
    throw new Error("빈 문자열을 넣을 수 없습니다.");
  }

  return str.toUpperCase();
};
