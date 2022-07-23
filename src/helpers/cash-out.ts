import moment from 'moment';
import { IInputData, UserType } from '../interfaces';
import { fixedTwoDigitsAfterDecimal, roundToUpper } from './round-to-upper';
import {
  findUser,
  insertNewUser,
  isUserExists,
  removeUser,
  updateUser,
} from './map-natural-users';

const COMMISSION_FESS = 0.3 / 100;
const LEAST_COMMISSION = 0.5;

export const calculateCommission = (amount: number): number =>
  amount * COMMISSION_FESS;

const cashOutNaturals = (data: IInputData): string => {
  let commission = 0;

  if (!isUserExists(data.user_id)) {
    commission = calculateCommission(insertNewUser(data));
  } else {
    const user = findUser(data.user_id);

    if (!user) throw new Error('User not found');

    const difference = moment(user.endDate).diff(moment(data.date), 'd');
    // console.log(difference);

    if (difference > -1) {
      commission = calculateCommission(updateUser(data, user));
    } else {
      // a new week start for a user
      removeUser(data.user_id);
      commission = calculateCommission(insertNewUser(data));
    }
  }
  // const commission = data.operation.amount * COMMISSION_FESS;
  return roundToUpper(commission);
};

export const cashOutJuridical = (amount: number): string => {
  const commission = calculateCommission(amount);

  if (commission < LEAST_COMMISSION) {
    return fixedTwoDigitsAfterDecimal(LEAST_COMMISSION);
  }

  return roundToUpper(commission);
};

export const cashOut = (data: IInputData): string => {
  if (data.user_type === UserType.NATURAL) {
    return cashOutNaturals(data);
  }
  return cashOutJuridical(data.operation.amount);
};
