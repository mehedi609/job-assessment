import { cashOutJuridical } from '../src/lib/cash-out-juridical';

describe('Test CashOut Juridical User function', () => {
  it('should return 0.50, if commission <= 0.50', function () {
    const result = cashOutJuridical(100);
    expect(result).toEqual('0.50');
  });

  it('should return calculated commission, if commission > 0.50', function () {
    const result = cashOutJuridical(300);
    expect(result).toEqual('0.90');
  });
});
