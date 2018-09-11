import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { allUsersState } from './allUsersState';
import { checkinState } from './checkinState';
import { checkinStatisticsState } from './checkinStatisticsState';
import { checkListState } from './checkListState';
import { profileState } from './profileState';
import { tableUserState } from './tableUserState';
import { userState } from './userState';
import { headerState } from './headerState';
import { googleMapState } from './googleMapState';
import { tableHistoryState } from './tsbleHistoryState';
import { modalState } from './modalState';
import { publicCheckListState } from './publickCheckListState';

const initialState: IinitialStateType = {
  allUsers: allUsersState,
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
  router: {},
};

export default initialState;