import IinitialStateType from '../types/stateTypes/initialStateType';
import { allUsersFilterState } from './allUsersFilterState';
import { checkinState } from './checkinState';
import { checkinStatisticsState } from './checkinStatisticsState';
import { checkListState } from './checkListState';
import { profileState } from './profileState';
import { tableUserState } from './tableUserState';
import { userState } from './userState';
import { headerState } from './headerState';
import { googleMapState } from './googleMapState';
import { tableHistoryState } from './tableHistoryState';
import { publicCheckListState } from './publickCheckListState';
import { notificationState } from './notificationsState';
import { allUsersTableState } from './allUsersTableState';
import { myCheckList } from './myCheckListState';
import { invitationsState } from './invitationsState';
import { sharedCheckList } from './sharedCheckListState';
import { windowState } from './windowState';
import { paymentState } from './paymentState';

const initialState: IinitialStateType = {
  form: {},
  allUsersFilter: allUsersFilterState,
  allUsersTable: allUsersTableState,
  checkin: checkinState,
  myCheckList: myCheckList,
  sharedCheckList: sharedCheckList,
  checkinStatistics: checkinStatisticsState,
  checkList: checkListState,
  profile: profileState,
  tableUser: tableUserState,
  user: userState,
  header: headerState,
  tableHistory: tableHistoryState,
  googleMap: googleMapState,
  publicCheckList: publicCheckListState,
  notifications: notificationState,
  invitations: invitationsState,
  payment: paymentState,
  router: {},
  window: windowState,
};

export default initialState;