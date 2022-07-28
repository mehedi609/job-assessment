import { calculateCommission } from '../utils/calculate-commission';

describe('Test Calculate commission', () => {
  it('should should return a number', () => {
    const result = calculateCommission(15, 0.3);

    expect(typeof result).toEqual('number');
    expect(result).toBeCloseTo(4.5);
  });
});
