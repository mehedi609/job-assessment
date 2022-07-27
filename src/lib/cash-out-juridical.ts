import {
  fixedNthDigitsAfterDecimal,
  roundToUpper,
} from '../utils/round-to-upper';
import {
  CASH_OUT_COMMISSION_FESS,
  CASH_OUT_LEAST_COMMISSION,
} from '../config/const';
import { calculateCommission } from '../utils/calculate-commission';

export const cashOutJuridical = (amount: number): string => {
  const commission = calculateCommission(amount, CASH_OUT_COMMISSION_FESS);

  if (commission < CASH_OUT_LEAST_COMMISSION) {
    return fixedNthDigitsAfterDecimal(CASH_OUT_LEAST_COMMISSION);
  }

  return roundToUpper(commission);
};
