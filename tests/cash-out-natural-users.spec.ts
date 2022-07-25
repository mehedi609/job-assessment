import cashOutNaturalsService from '../src/lib/cash-out-natural-users';
import { IInputData, IUserMap } from '../src/interfaces';

describe('cashOutNaturals users service', () => {
  describe('Test Insert New User Functionality', () => {
    it('should return true', () => {
      const inputData: IInputData = {
        date: '2016-01-06',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 30000, currency: 'EUR' },
      };
      const result: IUserMap = cashOutNaturalsService.insertNewUser(inputData);

      // expect(result).toHaveProperty('user_id');
      expect(result).toHaveProperty('endDate', '2016-01-10');
    });
  });
});
