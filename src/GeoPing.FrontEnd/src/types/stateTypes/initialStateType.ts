import { IGoogleMapStateType } from './googleMapStateType';
import { ITableHistoryStateType } from './tableHistoryStateType';
import IHeaderStateType from './headerStateType';
import IUserState from './userStateType';
import ITableDataStateType from './tableDataStateType';
import IProfileStateType from './profileStateType';
import ICheckListStateType from './checkListStateType';
import ICheckinStatisticsStateType from './checkinStatisticsStateType';
import ICheckinStateType from './checkinStateType';
import IAllUsersStateType from './allUsersFilterStateType';
import IPublicCheckListType from './publicCheckListType';
import INotificationStateType from './notificationStateType';
import IAllUsersTableStateType from './allUsersTableStateType';
import IinvitationsStateType from './invitationsStateType';
import IMyCheckListsStateType from './myCheckListsStateType';
import ISharedCheckListStateType from './sharedCheckListStateType';
import IWindowStateType from './windowStateType';

export default interface IinitialStateType {
  allUsersFilter: IAllUsersStateType;
  allUsersTable: IAllUsersTableStateType;
  checkin: ICheckinStateType;
  myCheckList: IMyCheckListsStateType;
  sharedCheckList: ISharedCheckListStateType;
  checkinStatistics: ICheckinStatisticsStateType;
  checkList: ICheckListStateType;
  profile: IProfileStateType;
  tableUser: ITableDataStateType;
  user: IUserState;
  header: IHeaderStateType;
  tableHistory: ITableHistoryStateType;
  googleMap: IGoogleMapStateType;
  publicCheckList: IPublicCheckListType;
  notifications: INotificationStateType;
  invitations: IinvitationsStateType;
  router: any;
  window: IWindowStateType;
}
