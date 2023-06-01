const hesCode = (val: string) =>
  /^[A-Za-z][0-9][A-Za-z][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9]$/g.test(val);
const validPhone = (val: number[]) =>
  val[0] == 0 && val[1] == 5 && val.length === 11;

export { hesCode, validPhone };
