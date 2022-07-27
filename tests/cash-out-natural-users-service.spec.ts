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

    it('should return a newUser obj containing allowed cashout amount, if amount > MINIMUM_REQUIRED_AMOUNT (1000)', () => {
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

    it('should return a newUser obj containing allowed cashout amount, if amount <= MINIMUM_REQUIRED_AMOUNT (1000)', () => {
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

    it('should return a newUser obj containing last date MINIMUM_REQUIRED_AMOUNT (1000) will not count if already fulfilled', () => {
      const data: IInputData = {
        date: '2016-01-06',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 300.0, currency: 'EUR' },
      };

      const newUser: IUserMap = cashOutNaturalsService.insertNewUser(data);
      expect(newUser).toHaveProperty('endDate', '2016-01-10');
    });
  });

  describe('Test isUserExists function', () => {
    it('should return false, if user not found', () => {
      expect(cashOutNaturalsService.isUserExists(1, [])).toBeFalsy();
    });

    it('should return true, if user exists', () => {
      const USERS_MAP = [
        {
          user_id: 1,
          endDate: '2016-01-10',
          nonCommissionedAmount: 1000,
          commissionedAmount: 9000,
        },
      ];

      expect(cashOutNaturalsService.isUserExists(1, USERS_MAP)).toBeTruthy();
    });
  });

  describe('Test findUser function', () => {
    const USERS_MAP = [
      {
        user_id: 1,
        endDate: '2016-01-10',
        nonCommissionedAmount: 1000,
        commissionedAmount: 9000,
      },
    ];

    it('should return undefined, if user not found', () => {
      expect(cashOutNaturalsService.findUser(2, USERS_MAP)).toBeUndefined();
    });

    it('should return existing user', () => {
      expect(cashOutNaturalsService.findUser(1, USERS_MAP)).toMatchObject({
        user_id: 1,
        endDate: '2016-01-10',
        nonCommissionedAmount: 1000,
        commissionedAmount: 9000,
      });
    });
  });

  describe('Test removeUser function', () => {
    const USERS_MAP = [
      {
        user_id: 1,
        endDate: '2016-01-10',
        nonCommissionedAmount: 1000,
        commissionedAmount: 9000,
      },
    ];

    it('should not do anything, if user id not found', () => {
      expect(cashOutNaturalsService.removeUser(2, USERS_MAP)).toHaveLength(1);
    });

    it('should remove user, if user id found', () => {
      expect(cashOutNaturalsService.removeUser(1, USERS_MAP)).toHaveLength(0);
    });
  });

  describe('Test update user Function', () => {
    it('should return a updatedUser obj containing allowed cashout amount, if totalAmount > MINIMUM_REQUIRED_AMOUNT (1000)', () => {
      const user: IUserMap = {
        user_id: 2,
        endDate: '2016-01-10',
        nonCommissionedAmount: 700,
        commissionedAmount: 0,
      };

      const data: IInputData = {
        date: '2016-01-08',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 500.0, currency: 'EUR' },
      };

      const updatedUser: IUserMap = cashOutNaturalsService.updateUser(
        data,
        user
      );
      expect(updatedUser).toHaveProperty('nonCommissionedAmount', 1000);
      expect(updatedUser).toHaveProperty('commissionedAmount', 200);
    });

    it('should return a updatedUser obj containing updated allowed cashout amount, if totalAmount <= MINIMUM_REQUIRED_AMOUNT (1000)', () => {
      const user: IUserMap = {
        user_id: 2,
        endDate: '2016-01-10',
        nonCommissionedAmount: 500,
        commissionedAmount: 0,
      };

      const data: IInputData = {
        date: '2016-01-08',
        user_id: 2,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 300.0, currency: 'EUR' },
      };

      const updatedUser: IUserMap = cashOutNaturalsService.updateUser(
        data,
        user
      );
      expect(updatedUser).toHaveProperty('nonCommissionedAmount', 800);
      expect(updatedUser).toHaveProperty('commissionedAmount', 0);
    });
  });
});
