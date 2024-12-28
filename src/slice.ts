function slice(array: any[], start?: number, end?: number) {
  let length = array.length;
  if (!length) {
    return [];
  }
  start = start == null ? 0 : start;
  end = end === undefined ? length : end;

  if (start < 0) {
    // start가 음수일때 length보다 크면 0으로 설정
    // start가 음수일때 length보다 작으면 length + start로 설정
    // length에서부터 시작
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    // end가 음수일때 뒤에서부터 시작
    end += length;
  }
  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  let index = -1;
  const result = new Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

export default slice;
