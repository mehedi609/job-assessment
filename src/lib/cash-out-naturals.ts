import moment from 'moment';
import { IInputData } from '../interfaces';
import { roundToUpper } from '../utils/round-to-upper';
import cashOutNaturalsService from './cash-out-natural-users-service';
import { CASH_OUT_COMMISSION_FESS } from '../config/const';
import { calculateCommission } from '../utils/calculate-commission';

export const cashOutNaturals = (data: IInputData): string => {
  let commission: number;

  if (!cashOutNaturalsService.isUserExists(data.user_id)) {
    commission = calculateCommission(
      cashOutNaturalsService.insertNewUser(data).commissionedAmount,
      CASH_OUT_COMMISSION_FESS
    );
  } else {
    const user = cashOutNaturalsService.findUser(data.user_id);

    if (!user) {
      throw new Error('User not found');
    }

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
