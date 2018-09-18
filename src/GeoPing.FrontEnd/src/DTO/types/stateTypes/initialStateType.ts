import IGoogleMapType from '../googleMapType';
import { ITableHistoryStateType } from './tableHistoryStateType';
import IHeaderStateType from './headerStateType';
import IUserState from './userStateType';
import ITableDataStateType from './tableDataStateType';
import IProfileStateType from './profileStateType';
import ICheckListStateType from './checkListStateType';
import ICheckinStatisticsStateType from './checkinStatisticsStateType';
import ICheckinStateType from './checkinStateType';
import IAllUsersStateType from './allUsersStateType';
import IModalStateType from './modalStateType';
import IPublicCheckListType from './publicCheckListType';
import INotificationStateType from './notificationStateType';

export default interface IinitialStateType {
  allUsers: IAllUsersStateType;
  checkin: ICheckinStateType;
  checkinStatistics: ICheckinStatisticsStateType;
  checkList: ICheckListStateType;
  profile: IProfileStateType;
  tableUser: ITableDataStateType;
  user: IUserState;
  header: IHeaderStateType;
  tableHistory: ITableHistoryStateType;
  googleMap: IGoogleMapType;
  modal: IModalStateType;
  publicCheckList: IPublicCheckListType;
  notifications: INotificationStateType;
  router: any;
}