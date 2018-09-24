import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import checkListReducer from './checkListReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import tableUserReducer from './tableUsersReducer';
import checkinStatisticsReducer from './checkinStatisticsReducer';
import checkinReducer from './checkinReducer';
import headerReducer from './headerReducer';
import googleMapReducer from './googleMapReducer';
import tableHistoryReducer from './tableHistoryReducer';
import modalReducer from './modalReducer';
import publicCheckListReducer from './publicCheckListReducer';
import notificationsReducer from './notificationsReducer';
import allUsersFilterReducer from './allUsersFilterReducer';
import allUsersTableReducer from './allUsersTableReducer';

export default function createReducer(injectedReducers: any) {
  return combineReducers({
    form: formReducer,
    allUsersFilter: allUsersFilterReducer,
    allUsersTable: allUsersTableReducer,
    checkList: checkListReducer,
    user: userReducer,
    profile: profileReducer,
    tableUser: tableUserReducer,
    checkinStatistics: checkinStatisticsReducer,
    checkin: checkinReducer,
    header: headerReducer,
    tableHistory: tableHistoryReducer,
    googleMap: googleMapReducer,
    modal: modalReducer,
    publicCheckList: publicCheckListReducer,
    notifications: notificationsReducer,
    router: routerReducer,
    ...injectedReducers,
  });
}