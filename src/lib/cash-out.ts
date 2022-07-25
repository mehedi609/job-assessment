import moment from 'moment';
import { IInputData, UserType } from '../interfaces';
import {
  fixedTwoDigitsAfterDecimal,
  roundToUpper,
} from '../utils/round-to-upper';
import cashOutNaturalsService from './cash-out-natural-users';
import {
  CASH_OUT_COMMISSION_FESS,
  CASH_OUT_LEAST_COMMISSION,
} from '../config/const';
import { calculateCommission } from '../utils/calculate-comission';

export const cashOutNaturals = (data: IInputData): string => {
  let commission = 0;

  if (!cashOutNaturalsService.isUserExists(data.user_id)) {
    commission = calculateCommission(
      cashOutNaturalsService.insertNewUser(data).commissionedAmount,
      CASH_OUT_COMMISSION_FESS
    );
  } else {
    const user = cashOutNaturalsService.findUser(data.user_id);

    if (!user) throw new Error('User not found');

    const difference = moment(user.endDate).diff(moment(data.date), 'd');

    // user is still in same week days range (monday - sunday)
    if (difference > -1) {
      commission = calculateCommission(
        cashOutNaturalsService.updateUser(data, user).commissionedAmount,
        CASH_OUT_COMMISSION_FESS
      );
    } else {
      // a new week start for a user
      cashOutNaturalsService.removeUser(data.user_id);
      commission = calculateCommission(
        cashOutNaturalsService.insertNewUser(data).commissionedAmount,
        CASH_OUT_COMMISSION_FESS
      );
    }
  }

  return roundToUpper(commission);
};

export const cashOutJuridical = (amount: number): string => {
  const commission = calculateCommission(amount, CASH_OUT_COMMISSION_FESS);

  if (commission < CASH_OUT_LEAST_COMMISSION) {
    return fixedTwoDigitsAfterDecimal(CASH_OUT_LEAST_COMMISSION);
  }

  return roundToUpper(commission);
};

export const cashOut = (data: IInputData): string => {
  if (data.user_type === UserType.NATURAL) {
    return cashOutNaturals(data);
  }
  return cashOutJuridical(data.operation.amount);
};
