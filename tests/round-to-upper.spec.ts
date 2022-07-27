import {
  fixedTwoDigitsAfterDecimal,
  roundToUpper,
} from '../src/utils/round-to-upper';

describe('Test rounded to the smallest currency item (cents)', function () {
  describe('if calculated commission = 0.023', () => {
    it('should return to its nearest cent 0.03', function () {
      const result = roundToUpper(0.023);

      expect(result).toEqual('0.03');
    });
  });

  describe('roundToUpper func takes a number as agr', () => {
    it('should return a string as output to match provided output pattern', function () {
      const result = roundToUpper(5);

      expect(typeof result).toEqual('string');
    });
  });
});

describe('Match the result to the provided output', () => {
  describe('if commission is an int value (5)', () => {
    it('should match the provided output pattern (5.00)', function () {
      const result = fixedTwoDigitsAfterDecimal(5);
      expect(result).toBe('5.00');
    });
  });

  describe('if commission is an big float number (1.56789)', () => {
    it('should match the provided output pattern (1.56)', () => {
      expect(fixedTwoDigitsAfterDecimal(1.5678)).toBe('1.56');
    });
  });
});
