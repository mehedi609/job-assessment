/*
  format a number such that 2 places after decimal point
  to match the answer format
* */
export const fixedNthDigitsAfterDecimal = (val: any, digits = 2): string => {
  if (Math.abs(val) < 1.0) {
    const e = parseInt(val.toString().split('e-')[1], 10);
    if (e) {
      val *= 10 ** (e - 1);
      val = `0.${new Array(e).join('0')}${val.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(val.toString().split('+')[1], 10);
    if (e > 20) {
      e -= 20;
      val /= 10 ** e;
      val += new Array(e + 1).join('0');
    }
  }

  const v = (typeof val === 'string' ? val : val.toString()).split('.');
  if (digits <= 0) return v[0];
  let f = v[1] || '';
  if (f.length > digits) return `${v[0]}.${f.substr(0, digits)}`;
  while (f.length < digits) f += '0';
  return `${v[0]}.${f}`;
};

/*
  rounded a fractional cents to it's nearest whole cent
* */
export const roundToUpper = (val: number): string => {
  const newVal = val * 100;

  if (!Number.isInteger(newVal) && newVal < 100) {
    const roundedVal = Math.ceil(newVal) / 100;

    return fixedNthDigitsAfterDecimal(roundedVal);
  }

  return fixedNthDigitsAfterDecimal(val);
};
