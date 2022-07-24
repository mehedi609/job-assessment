import { IInputData } from '../interfaces';
import {
  fixedTwoDigitsAfterDecimal,
  roundToUpper,
} from '../utils/round-to-upper';
import {
  CASH_IN_COMMISSION_FESS,
  CASH_IN_MAX_COMMISSION,
} from '../config/const';
import { calculateCommission } from '../utils/calculate-comission';

export const cashIn = (data: IInputData): string => {
  const commission = calculateCommission(
    data.operation.amount,
    CASH_IN_COMMISSION_FESS
  );

  if (commission > CASH_IN_MAX_COMMISSION) {
    return fixedTwoDigitsAfterDecimal(CASH_IN_MAX_COMMISSION);
  }

  return roundToUpper(commission);
};
