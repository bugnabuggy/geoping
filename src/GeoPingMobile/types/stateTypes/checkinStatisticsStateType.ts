import ICheckListStateType from './checkListStateType';
import IUserStateType from './userStateType';

interface ISelectPeriod {
  from: string;
  to: string;
}

export interface ISelectUser {
  email: string;
  fullName: string;
  userId: string;
  userName: string;
}

export default interface ICheckinStatisticsStateType {
  selectList: Array<ICheckListStateType>;
  selectUser: Array<ISelectUser>;
  selectPeriod: ISelectPeriod;
  isCheckInStatistics: boolean;
}
