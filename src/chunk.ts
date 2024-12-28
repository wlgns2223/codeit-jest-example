//length: 4
// size: 5
// -> 0.xxxx

// length: 4
// size: 0.5
//  -> length 20

// chunk : 나눠진 데이터 덩어리
export function chunk(array: any[], size: number = 1) {
  size = Math.max(Math.floor(size), 0);
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;

  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}
