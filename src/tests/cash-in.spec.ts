import { cashIn } from '../lib/cash-in';

describe('Test CashIn Functionality', () => {
  it('should return max commission 5.00, if calculated commission > cash in max amount (5.0)', () => {
    const inputData = {
      date: '2016-01-10',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_in',
      operation: { amount: 1000000.0, currency: 'EUR' },
    };

    const result = cashIn(inputData);

    expect(result).toEqual('5.00');
  });

  it('should return commission = 0.06, if calculated commission <= cash in max amount (5.0)', () => {
    const inputData = {
      date: '2016-01-10',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_in',
      operation: { amount: 200.0, currency: 'EUR' },
    };
    const result = cashIn(inputData);

    expect(result).toEqual('0.06');
  });

  it('should return to its nearest cent 0.18, if calculated commission = 0.174', () => {
    const inputData = {
      date: '2016-01-10',
      user_id: 2,
      user_type: 'juridical',
      type: 'cash_in',
      operation: { amount: 580.0, currency: 'EUR' },
    };
    const result = cashIn(inputData);

    expect(result).toEqual('0.18');
  });
});
