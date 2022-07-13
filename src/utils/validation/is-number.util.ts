export function isNumber(num: any) {
  if (!num) {
    return false;
  }

  const reg = new RegExp("^[0-9]*$");

  return reg.test(num);
}
