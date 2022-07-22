export interface IInputData {
  date: string;
  user_id: number;
  user_type: string;
  type: string;
  operation: IOperation;
}

export interface IOperation {
  amount: number;
  currency: string;
}

export enum WithdrawType {
  CASH_IN = 'cash_in',
  CASH_OUT = 'cash_out',
}

export enum UserType {
  NATURAL = 'natural',
  JURIDICAL = 'juridical',
}
