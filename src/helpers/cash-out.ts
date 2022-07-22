import { IInputData, UserType } from '../interfaces';
import { fixedTwoDigitsAfterDecimal, roundToUpper } from './round-to-upper';

const COMMISSION_FESS = 0.3 / 100;
const LEAST_COMMISSION = 0.5;

const cashOutNaturals = (amount: number): string => {
  const commission = amount * COMMISSION_FESS;
  return roundToUpper(commission);
};

export const cashOutJuridical = (amount: number): string => {
  const commission = amount * COMMISSION_FESS;

  if (commission < LEAST_COMMISSION) {
    return fixedTwoDigitsAfterDecimal(LEAST_COMMISSION);
  }

  return roundToUpper(commission);
};

export const cashOut = (data: IInputData): string => {
  if (data.user_type === UserType.NATURAL) {
    return cashOutNaturals(data.operation.amount);
  }
  return cashOutJuridical(data.operation.amount);
};
