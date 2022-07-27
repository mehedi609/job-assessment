import moment from 'moment';
import { IInputData, IUserMap } from '../interfaces';
import { roundToUpper } from '../utils/round-to-upper';
import cashOutNaturalsService from './cash-out-natural-users-service';
import { CASH_OUT_COMMISSION_FESS } from '../config/const';
import { calculateCommission } from '../utils/calculate-commission';

let USERS_MAP: IUserMap[] = [];

export const cashOutNaturals = (data: IInputData): string => {
  let commission: number;

  if (!cashOutNaturalsService.isUserExists(data.user_id, USERS_MAP)) {
    const insertedNewUser = cashOutNaturalsService.insertNewUser(data);
    USERS_MAP = [...USERS_MAP, insertedNewUser];

    commission = calculateCommission(
      insertedNewUser.commissionedAmount,
      CASH_OUT_COMMISSION_FESS
    );
  } else {
    const user = cashOutNaturalsService.findUser(data.user_id, USERS_MAP);

    if (!user) {
      throw new Error('User not found');
    }

    const difference = moment(user.endDate).diff(moment(data.date), 'd');

    // user is still in same week days range (monday - sunday)
    if (difference > -1) {
      const updatedUser = cashOutNaturalsService.updateUser(data, user);
      USERS_MAP = USERS_MAP.map((u: IUserMap) =>
        u.user_id === user.user_id
          ? {
              ...updatedUser,
            }
          : u
      );
      commission = calculateCommission(
        updatedUser.commissionedAmount,
        CASH_OUT_COMMISSION_FESS
      );
    } else {
      // a new week start for a user
      USERS_MAP = cashOutNaturalsService.removeUser(data.user_id, USERS_MAP);
      const insertedNewUser = cashOutNaturalsService.insertNewUser(data);
      USERS_MAP = [...USERS_MAP, insertedNewUser];
      commission = calculateCommission(
        insertedNewUser.commissionedAmount,
        CASH_OUT_COMMISSION_FESS
      );
    }
  }

  return roundToUpper(commission);
};
