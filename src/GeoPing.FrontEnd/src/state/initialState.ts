import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
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
import { modalState } from './modalState';
import { publicCheckListState } from './publickCheckListState';
import { notificationState } from './notificationsState';
import { allUsersTableState } from './allUsersTableState';
import { invitationsState} from './invitationsState';

const initialState: IinitialStateType = {
  allUsersFilter: allUsersFilterState,
  allUsersTable: allUsersTableState,
  checkin: checkinState,
  checkinStatistics: checkinStatisticsState,
  checkList: checkListState,
  profile: profileState,
  tableUser: tableUserState,
  user: userState,
  header: headerState,
  tableHistory: tableHistoryState,
  googleMap: googleMapState,
  modal: modalState,
  publicCheckList: publicCheckListState,
  notifications: notificationState,
  invitations: invitationsState,
  router: {},
};

export default initialState;