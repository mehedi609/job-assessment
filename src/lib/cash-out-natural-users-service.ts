import moment from 'moment';
import { IInputData, IUserMap, UserType } from '../interfaces';
import { MINIMUM_REQUIRED_AMOUNT } from '../config/const';

const cashOutNaturalsService = {
  insertNewUser: (data: IInputData): IUserMap => {
    if (data.user_type !== UserType.NATURAL) {
      throw new Error('User type must be NATURAL');
    }

    const startDate = moment(data.date);
    // console.log(startDate.utcOffset(360).format('YYYY-MM-DD'));

    const isoWeekDay = startDate.isoWeekday();
    let nonCommissionedAmount: number;
    let commissionedAmount = 0;

    if (data.operation.amount > MINIMUM_REQUIRED_AMOUNT) {
      nonCommissionedAmount = MINIMUM_REQUIRED_AMOUNT;
      commissionedAmount = data.operation.amount - MINIMUM_REQUIRED_AMOUNT;
    } else {
      nonCommissionedAmount = data.operation.amount;
    }

    // let endDate = startDate.clone();
    const endDate = startDate
      .add(7 - isoWeekDay, 'd')
      .utcOffset(360)
      .format('YYYY-MM-DD');
    // console.log(endDate);

    const newUser: IUserMap = {
      user_id: data.user_id,
      // startDate: startDate.utcOffset(360).format('YYYY-MM-DD'),
      endDate,
      nonCommissionedAmount,
      commissionedAmount,
    };

    // console.log(newUser);

    // USERS_MAP = [...USERS_MAP, newUser];

    return newUser;
  },

  isUserExists: (user_id: number, USERS_MAP: IUserMap[]): boolean => {
    if (USERS_MAP.length === 0) return false;

    return !!USERS_MAP.filter((user) => user.user_id === user_id).length;
  },

  findUser: (user_id: number, USERS_MAP: IUserMap[]): IUserMap | undefined =>
    USERS_MAP.find((user) => user.user_id === user_id),

  removeUser: (user_id: number, USERS_MAP: IUserMap[]): IUserMap[] =>
    USERS_MAP.filter((user) => user.user_id !== user_id),

  updateUser: (data: IInputData, user: IUserMap): IUserMap => {
    let commissionedAmount = 0;
    let nonCommissionedAmount: number;

    const totalAmount = user.nonCommissionedAmount + data.operation.amount;

    if (totalAmount > MINIMUM_REQUIRED_AMOUNT) {
      commissionedAmount = totalAmount - MINIMUM_REQUIRED_AMOUNT;
      nonCommissionedAmount = MINIMUM_REQUIRED_AMOUNT;
    } else {
      nonCommissionedAmount = totalAmount;
    }

    const updatedUser = {
      ...user,
      nonCommissionedAmount,
      commissionedAmount,
    };
    // console.log(userObj);

    // USERS_MAP = USERS_MAP.map((u: IUserMap) =>
    //   u.user_id === user.user_id
    //     ? {
    //         ...updatedUser,
    //       }
    //     : u
    // );

    // console.log(updatedUser);

    return updatedUser;
  },
};

export default cashOutNaturalsService;

// export const insertNewUser = (data: IInputData): IUserMap | string => {
//   return 'Hello';
//   const startDate = moment(data.date);
//   // console.log(startDate.utcOffset(360).format('YYYY-MM-DD'));
//
//   const isoWeekDay = startDate.isoWeekday();
//   let nonCommissionedAmount: number;
//   let commissionedAmount = 0;
//
//   if (data.operation.amount > MINIMUM_REQUIRED_AMOUNT) {
//     nonCommissionedAmount = MINIMUM_REQUIRED_AMOUNT;
//     commissionedAmount = data.operation.amount - MINIMUM_REQUIRED_AMOUNT;
//   } else {
//     nonCommissionedAmount = data.operation.amount;
//   }
//
//   // let endDate = startDate.clone();
//   const endDate = startDate
//     .add(7 - isoWeekDay, 'd')
//     .utcOffset(360)
//     .format('YYYY-MM-DD');
//   // console.log(endDate);
//
//   const newUser: IUserMap = {
//     user_id: data.user_id,
//     // startDate: startDate.utcOffset(360).format('YYYY-MM-DD'),
//     endDate,
//     nonCommissionedAmount,
//     commissionedAmount,
//   };
//
//   // console.log(userObj);
//
//   USERS_MAP = [...USERS_MAP, newUser];
//
//   return newUser;
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
