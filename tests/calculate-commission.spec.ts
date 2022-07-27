import { calculateCommission } from '../src/utils/calculate-commission';

describe('Test Calculate commission', function () {
  it('should should return a number', function () {
    const result = calculateCommission(15, 0.3);

    expect(typeof result).toEqual('number');
    expect(result).toBeCloseTo(4.5);
  });
});
