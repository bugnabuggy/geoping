import ICheckListStateType from './checkListStateType';
import IUserStateType from './userStateType';

interface ISelectPeriod {
  from: string;
  to: string;
}

export default interface ICheckinStatisticsStateType {
  selectList: Array<ICheckListStateType>;
  selectUser: Array<IUserStateType>;
  selectPeriod: ISelectPeriod;
  isCheckInStatistics: boolean;
}
