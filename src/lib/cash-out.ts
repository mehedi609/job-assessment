import { IInputData, UserType } from '../interfaces';
import { cashOutNaturals } from './cash-out-naturals';
import { cashOutJuridical } from './cash-out-juridical';

export const cashOut = (data: IInputData): string => {
  if (data.user_type === UserType.NATURAL) {
    return cashOutNaturals(data);
  }
  return cashOutJuridical(data.operation.amount);
};
