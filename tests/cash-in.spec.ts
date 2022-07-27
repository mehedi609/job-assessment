import { cashIn } from '../src/lib/cash-in';

describe('Test CashIn Functionality', function () {
  describe('if calculated commission > cash in max amount (5.0)', () => {
    it('should return max commission 5.00', function () {
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
  });

  describe('if calculated commission <= cash in max amount (5.0)', () => {
    it('should return commission = 0.06', function () {
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
  });

  describe('if calculated commission = 0.174', () => {
    it('should return to its nearest cent 0.18', function () {
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
});
