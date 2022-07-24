import moment from 'moment';
import { IInputData, UserType } from '../interfaces';
import { fixedTwoDigitsAfterDecimal, roundToUpper } from './round-to-upper';
import {
  findUser,
  insertNewUser,
  isUserExists,
  removeUser,
  updateUser,
} from './cash-out-natural-users';
import {
  CASH_OUT_COMMISSION_FESS,
  CASH_OUT_LEAST_COMMISSION,
} from '../config/const';

export const calculateCommission = (amount: number): number =>
  amount * CASH_OUT_COMMISSION_FESS;

export const cashOutNaturals = (data: IInputData): string => {
  let commission = 0;

  if (!isUserExists(data.user_id)) {
    commission = calculateCommission(insertNewUser(data));
  } else {
    const user = findUser(data.user_id);

    if (!user) throw new Error('User not found');

    const difference = moment(user.endDate).diff(moment(data.date), 'd');

    // user is still in same week days range (monday - sunday)
    if (difference > -1) {
      commission = calculateCommission(updateUser(data, user));
    } else {
      // a new week start for a user
      removeUser(data.user_id);
      commission = calculateCommission(insertNewUser(data));
    }
  }

  return roundToUpper(commission);
};

export const cashOutJuridical = (amount: number): string => {
  const commission = calculateCommission(amount);

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
