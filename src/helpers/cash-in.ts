import { IInputData } from '../interfaces';
import { fixedTwoDigitsAfterDecimal, roundToUpper } from './round-to-upper';
import {
  CASH_IN_COMMISSION_FESS,
  CASH_IN_MAX_COMMISSION,
} from '../config/const';

export const cashIn = (data: IInputData): string => {
  const commission = data.operation.amount * CASH_IN_COMMISSION_FESS;

  if (commission > CASH_IN_MAX_COMMISSION) {
    return fixedTwoDigitsAfterDecimal(CASH_IN_MAX_COMMISSION);
  }

  return roundToUpper(commission);
};
