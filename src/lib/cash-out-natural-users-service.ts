import moment from 'moment';
import { IInputData, IUserMap, UserType } from '../interfaces';
import { MINIMUM_REQUIRED_AMOUNT } from '../config/const';

const cashOutNaturalsService = {
  insertNewUser: (data: IInputData): IUserMap => {
    if (data.user_type !== UserType.NATURAL) {
      throw new Error('User type must be NATURAL');
    }

    const startDate = moment(data.date);

    const isoWeekDay = startDate.isoWeekday();
    let nonCommissionedAmount: number;
    let commissionedAmount = 0;

    if (data.operation.amount > MINIMUM_REQUIRED_AMOUNT) {
      nonCommissionedAmount = MINIMUM_REQUIRED_AMOUNT;
      commissionedAmount = data.operation.amount - MINIMUM_REQUIRED_AMOUNT;
    } else {
      nonCommissionedAmount = data.operation.amount;
    }

    const endDate = startDate
      .add(7 - isoWeekDay, 'd')
      .utcOffset(360)
      .format('YYYY-MM-DD');

    return {
      user_id: data.user_id,
      endDate,
      nonCommissionedAmount,
      commissionedAmount,
    };
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

    return {
      ...user,
      nonCommissionedAmount,
      commissionedAmount,
    };
  },
};

export default cashOutNaturalsService;
