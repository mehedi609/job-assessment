import fs from 'fs';
import { IInputData, WithdrawType } from './interfaces';
import { cashIn } from './helpers/cash-in';
import { cashOut } from './helpers/cash-out';

const data = JSON.parse(fs.readFileSync(`${__dirname}/input.json`, 'utf-8'));

data.forEach((el: IInputData) => {
  if (el.type === WithdrawType.CASH_IN) {
    const cashInCommission = cashIn(el);
    console.log(
      `${el.user_id} ${el.type} ${el.user_type} ${el.operation.amount} ---> ${cashInCommission}`
    );
  } else {
    // if (el.user_type === UserType.JURIDICAL) {
    const cashOutCommission = cashOut(el);
    console.log(
      `${el.user_id} ${el.type} ${el.user_type} ${el.operation.amount} ---> ${cashOutCommission}`
    );
    // }
  }
});
