import IinitialStateType from '../DTO/types/stateTypes/initialStateType';
import { allUsersState } from './allUsersState';
import { checkinState } from './checkinState';
import { checkinStatisticsState } from './checkinStatisticsState';
import { checkListState } from './checkListState';
import { profileState } from './profileState';
import { tableUserState } from './tableUserState';
import { userState } from './userState';

const initialState: IinitialStateType = {
  allUsers: allUsersState,
  checkin: checkinState,
  checkinStatistics: checkinStatisticsState,
  checkList: checkListState,
  profile: profileState,
  tableUser: tableUserState,
  user: userState,
};

export default initialState;