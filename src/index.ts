import fs from 'fs';
import { IInputData, WithdrawType } from './interfaces';
import { cashIn } from './lib/cash-in';
import { cashOut } from './lib/cash-out';

const tempDisplay = (el: any, val: string) =>
  console.log(
    `${el.user_id} ${el.type} ${el.user_type} ${el.operation.amount} ---> ${val}`
  );

export const parseData = async (path: string = 'input.json') => {
  const data = await fs.promises.readFile(`${__dirname}/${path}`, 'utf8');
  return JSON.parse(data);
};

export const main = async () => {
  let path: string;
  if (process.env.NODE_ENV === 'development') {
    path = 'input.json';
  } else {
    path = process.argv[2];
  }

  try {
    const data = await parseData(path);

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
  } catch (e) {
    console.log(`file not found: ${path}`);
  }
};

main();
