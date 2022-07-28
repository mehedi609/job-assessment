import {
  fixedNthDigitsAfterDecimal,
  roundToUpper,
} from '../utils/round-to-upper';

describe('Test roundToUpper function', () => {
  describe('Test rounded to the smallest currency item (cents)', () => {
    it('should return to its nearest cent 0.03, if calculated commission = 0.023', () => {
      const result = roundToUpper(0.023);

      expect(result).toEqual('0.03');
    });
  });

  describe('roundToUpper func takes a number as agr', () => {
    it('should return a string as output to match provided output pattern', () => {
      const result = roundToUpper(5);

      expect(typeof result).toEqual('string');
    });
  });
});

describe('Match the result to the provided output', () => {
  it('should match the provided output pattern (5.00), if commission is an int value (5) > 1.0', () => {
    const result = fixedNthDigitsAfterDecimal(5);
    expect(result).toBe('5.00');
  });

  it('should match the provided output pattern (0.00), if commission is an int value (0.2345) < 1.0', () => {
    const result = fixedNthDigitsAfterDecimal(0.2345);
    expect(result).toBe('0.23');
  });

  it('should match the provided output pattern (1.56), if commission is an big float number (1.56789) without default rounding', () => {
    expect(fixedNthDigitsAfterDecimal(1.5678)).toBe('1.56');
    expect(fixedNthDigitsAfterDecimal(1.5678)).not.toBe('1.57');
  });
});
