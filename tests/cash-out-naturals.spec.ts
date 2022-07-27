import cashOutNaturalsService from '../src/lib/cash-out-natural-users-service';
import { cashOutNaturals } from '../src/lib/cash-out-naturals';
import { IInputData } from '../src/interfaces';

describe('Test CashOutNaturals User function', () => {
  describe('A natural user tried to cash out first time in a week (Monday - Sunday)', () => {
    beforeEach(() => {
      cashOutNaturalsService.isUserExists = jest
        .fn()
        .mockImplementationOnce(() => false);
    });

    it('should return 0.00 commission, if cash out amount (300) <= 1000.0', function () {
      const data: IInputData = {
        date: '2016-01-06',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 300, currency: 'EUR' },
      };

      cashOutNaturalsService.insertNewUser = jest
        .fn()
        .mockReturnValueOnce({ commissionedAmount: 0 });

      const result = cashOutNaturals(data);
      expect(result).toEqual('0.00');
    });

    it('should return 87.00 commission, if cash out amount (30000) > 1000.0', function () {
      const data: IInputData = {
        date: '2016-01-06',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 30000, currency: 'EUR' },
      };

      cashOutNaturalsService.insertNewUser = jest
        .fn()
        .mockReturnValueOnce({ commissionedAmount: 29000 });

      const result = cashOutNaturals(data);
      expect(result).toEqual('87.00');
    });
  });

  describe('Assume a natural user already has cashed out 700, he tried to cash out 500', () => {
    // describe('if user cannot be found by user_id', () => {
    it('should throw an error if user cannot be found by user_id', function () {
      const data: IInputData = {
        date: '2016-01-06',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 300, currency: 'EUR' },
      };

      cashOutNaturalsService.isUserExists = jest
        .fn()
        .mockImplementationOnce(() => true);

      cashOutNaturalsService.findUser = jest
        .fn()
        .mockImplementationOnce(() => null);

      expect(() => cashOutNaturals(data)).toThrow();
    });
    // });

    beforeEach(() => {
      cashOutNaturalsService.isUserExists = jest
        .fn()
        .mockImplementationOnce(() => true);

      cashOutNaturalsService.findUser = jest
        .fn()
        .mockImplementationOnce(() => ({
          user_id: 1,
          endDate: '2016-01-10',
          nonCommissionedAmount: 500,
          commissionedAmount: 0,
        }));
    });

    it('should return commission of 0.60 on 200 (1200 - 1000), if it occurs within same week (Monday - Sunday)', function () {
      // cashOutNaturalsService.isUserExists = jest
      //   .fn()
      //   .mockImplementationOnce(() => true);
      //
      // cashOutNaturalsService.findUser = jest
      //   .fn()
      //   .mockImplementationOnce(() => ({
      //     user_id: 1,
      //     endDate: '2016-01-10',
      //     nonCommissionedAmount: 500,
      //     commissionedAmount: 0,
      //   }));
      const data: IInputData = {
        date: '2016-01-07',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 500, currency: 'EUR' },
      };

      cashOutNaturalsService.updateUser = jest
        .fn()
        .mockImplementationOnce(() => ({
          user_id: 1,
          endDate: '2016-01-10',
          nonCommissionedAmount: 1000,
          commissionedAmount: 200,
        }));

      const result = cashOutNaturals(data);
      expect(result).toEqual('0.60');
    });

    it('should return commission of 0.00 on 500, if it occurs in different week (Monday - Sunday)', function () {
      const data: IInputData = {
        date: '2016-01-15',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 500, currency: 'EUR' },
      };

      cashOutNaturalsService.removeUser = jest
        .fn()
        .mockImplementationOnce(() => '');

      cashOutNaturalsService.insertNewUser = jest
        .fn()
        .mockImplementationOnce(() => ({
          user_id: 1,
          endDate: '2016-01-17',
          nonCommissionedAmount: 500,
          commissionedAmount: 0,
        }));

      const result = cashOutNaturals(data);
      expect(result).toEqual('0.00');
    });
  });
});
