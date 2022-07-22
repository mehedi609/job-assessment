import { IInputData } from '../interfaces';
import { fixedTwoDigitsAfterDecimal, roundToUpper } from './round-to-upper';

const COMMISSION_FESS = 0.03 / 100;
const MAX_COMMISSION = 5.0;

export const cashIn = (data: IInputData): string => {
  const commission = data.operation.amount * COMMISSION_FESS;

  if (commission > MAX_COMMISSION) {
    return fixedTwoDigitsAfterDecimal(MAX_COMMISSION);
  }

  // console.log(commission);

  return roundToUpper(commission);
};
