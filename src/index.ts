import fs from 'fs';
import { IInputData, WithdrawType } from './interfaces';
import { cashIn } from './helpers/cash-in';
import { cashOut } from './helpers/cash-out';

const tempDisplay = (el: any, val: string) =>
  console.log(
    `${el.user_id} ${el.type} ${el.user_type} ${el.operation.amount} ---> ${val}`
  );

export const main = () => {
  let path: string;
  if (process.env.NODE_ENV === 'development') {
    path = 'input.json';
  } else {
    path = process.argv[2];
  }

  fs.readFile(`${__dirname}/${path}`, 'utf8', (error, _data) => {
    if (error) {
      throw new Error('File not found');
    }
    const data: IInputData[] = JSON.parse(_data);

    data.forEach((el: IInputData) => {
      if (el.type === WithdrawType.CASH_IN) {
        console.log(cashIn(el));
        // const cashInCommission = cashIn(el);
        // tempDisplay(el, cashInCommission);
      } else {
        console.log(cashOut(el));
        // const cashOutCommission = cashOut(el);
        // tempDisplay(el, cashOutCommission);
      }
    });
  });
};

main();
