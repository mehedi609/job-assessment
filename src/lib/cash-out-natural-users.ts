import moment from 'moment';
import { IInputData, IUserMap } from '../interfaces';
import { MINIMUM_REQUIRED_AMOUNT } from '../config/const';

let USERS_MAP: IUserMap[] = [];

const cashOutNaturalsService = {
  insertNewUser: (data: IInputData): number => {
    const startDate = moment(data.date);
    const isoWeekDay = startDate.isoWeekday();
    let amount: number;
    let remainingAmount = 0;

    if (data.operation.amount > MINIMUM_REQUIRED_AMOUNT) {
      amount = MINIMUM_REQUIRED_AMOUNT;
      remainingAmount = data.operation.amount - MINIMUM_REQUIRED_AMOUNT;
    } else {
      amount = data.operation.amount;
    }

    let endDate = startDate.clone();
    endDate = endDate.add(7 - isoWeekDay, 'd');

    const userObj: IUserMap = {
      user_id: data.user_id,
      startDate: startDate.utcOffset(360).format('YYYY-MM-DD'),
      endDate: endDate.utcOffset(360).format('YYYY-MM-DD'),
      amount,
    };

    // console.log(userObj);

    USERS_MAP = [...USERS_MAP, userObj];

    return remainingAmount;
  },

  isUserExists: (user_id: number): boolean => {
    if (USERS_MAP.length === 0) return false;

    return !!USERS_MAP.filter((user) => user.user_id === user_id).length;
  },

  findUser: (user_id: number): IUserMap | undefined =>
    USERS_MAP.find((user) => user.user_id === user_id),

  removeUser: (user_id: number): void => {
    USERS_MAP = USERS_MAP.filter((user) => user.user_id !== user_id);
  },

  updateUser: (data: IInputData, user: IUserMap): number => {
    let amount = 0;
    let updatedAmount = 0;

    const totalAmount = user.amount + data.operation.amount;

    if (totalAmount > MINIMUM_REQUIRED_AMOUNT) {
      amount = totalAmount - MINIMUM_REQUIRED_AMOUNT;
      updatedAmount = MINIMUM_REQUIRED_AMOUNT;
    } else {
      updatedAmount = totalAmount;
    }

    // const userObj = { ...user, amount, updatedAmount };
    // console.log(userObj);

    USERS_MAP = USERS_MAP.map((u) =>
      u.user_id === user.user_id
        ? {
            ...u,
            amount: updatedAmount,
          }
        : u
    );

    return amount;
  },
};

export default cashOutNaturalsService;

// export const insertNewUser = (data: IInputData): number => {
//   const startDate = moment(data.date);
//   const isoWeekDay = startDate.isoWeekday();
//   let amount: number;
//   let remainingAmount = 0;
//
//   if (data.operation.amount > MINIMUM_REQUIRED_AMOUNT) {
//     amount = MINIMUM_REQUIRED_AMOUNT;
//     remainingAmount = data.operation.amount - MINIMUM_REQUIRED_AMOUNT;
//   } else {
//     amount = data.operation.amount;
//   }
//
//   let endDate = startDate.clone();
//   endDate = endDate.add(7 - isoWeekDay, 'd');
//
//   const userObj: IUserMap = {
//     user_id: data.user_id,
//     startDate: startDate.utcOffset(360).format('YYYY-MM-DD'),
//     endDate: endDate.utcOffset(360).format('YYYY-MM-DD'),
//     amount,
//   };
//
//   // console.log(userObj);
//
//   USERS_MAP = [...USERS_MAP, userObj];
//
//   return remainingAmount;
// };

// export const isUserExists = (user_id: number): boolean => {
//   if (USERS_MAP.length === 0) return false;
//
//   return !!USERS_MAP.filter((user) => user.user_id === user_id).length;
// };

// export const findUser = (user_id: number): IUserMap | undefined =>
//   USERS_MAP.find((user) => user.user_id === user_id);
//
// export const removeUser = (user_id: number): void => {
//   USERS_MAP = USERS_MAP.filter((user) => user.user_id !== user_id);
// };

// export const updateUser = (data: IInputData, user: IUserMap): number => {
//   let amount = 0;
//   let updatedAmount = 0;
//
//   const totalAmount = user.amount + data.operation.amount;
//
//   if (totalAmount > MINIMUM_REQUIRED_AMOUNT) {
//     amount = totalAmount - MINIMUM_REQUIRED_AMOUNT;
//     updatedAmount = MINIMUM_REQUIRED_AMOUNT;
//   } else {
//     updatedAmount = totalAmount;
//   }
//
//   // const userObj = { ...user, amount, updatedAmount };
//   // console.log(userObj);
//
//   USERS_MAP = USERS_MAP.map((u) =>
//     u.user_id === user.user_id
//       ? {
//           ...u,
//           amount: updatedAmount,
//         }
//       : u
//   );
//
//   return amount;
// };
