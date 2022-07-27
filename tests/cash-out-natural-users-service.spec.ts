import cashOutNaturalsService from '../src/lib/cash-out-natural-users-service';
import { IInputData, IUserMap } from '../src/interfaces';

describe('Test CashOut natural user service', () => {
  describe('Test insert user Function', () => {
    it('should throw an error if user type is not natural', () => {
      const data = {
        date: '2016-01-06',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_out',
        operation: { amount: 100.0, currency: 'EUR' },
      };

      expect(() => cashOutNaturalsService.insertNewUser(data)).toThrowError();
    });

    it('should return a newUser obj containing allowed cashout amount, if amount > MINIMUM_REQUIRED_AMOUNT (1000)', function () {
      const data: IInputData = {
        date: '2016-01-06',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 10000.0, currency: 'EUR' },
      };

      const newUser: IUserMap = cashOutNaturalsService.insertNewUser(data);
      expect(newUser).toHaveProperty('nonCommissionedAmount', 1000);
      expect(newUser).toHaveProperty('commissionedAmount', 9000);
    });

    it('should return a newUser obj containing allowed cashout amount, if amount <= MINIMUM_REQUIRED_AMOUNT (1000)', function () {
      const data: IInputData = {
        date: '2016-01-06',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 300.0, currency: 'EUR' },
      };

      const newUser: IUserMap = cashOutNaturalsService.insertNewUser(data);
      expect(newUser).toHaveProperty('nonCommissionedAmount', 300);
      expect(newUser).toHaveProperty('commissionedAmount', 0);
    });
  });

  describe('Test isUserExists function', () => {
    it('should return false, if user not found', () => {
      expect(cashOutNaturalsService.isUserExists(1)).toBeFalsy();
    });

    it('should return true, if user exists', () => {
      cashOutNaturalsService.insertNewUser = jest
        .fn()
        .mockImplementationOnce(() => ({
          user_id: 2,
          endDate: '2016-01-10',
          nonCommissionedAmount: 1000,
          commissionedAmount: 9000,
        }));

      expect(cashOutNaturalsService.isUserExists(1)).toBeTruthy();
    });
  });
});
