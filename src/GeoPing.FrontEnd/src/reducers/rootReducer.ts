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
import publicCheckListReducer from './publicCheckListReducer';
import notificationsReducer from './notificationsReducer';
import allUsersFilterReducer from './allUsersFilterReducer';
import allUsersTableReducer from './allUsersTableReducer';
import allChecklistFilterReducer from './allChecklistFilterReducer';
import invitationsReducer from './invitationsReducer';
import myCheckListReducer from './myCheckListReducer';
import sharedCheckListReducer from './sharedCheckListReducer';
import windowReducer from './windowReduser';
import paymentReducer from './paymentReducer';

export default function createReducer( injectedReducers: any ) {
  return combineReducers( {
    form: formReducer,
    allUsersFilter: allUsersFilterReducer,
    allUsersTable: allUsersTableReducer,
    checkList: checkListReducer,
    user: userReducer,
    profile: profileReducer,
    tableUser: tableUserReducer,
    myCheckList: myCheckListReducer,
    sharedCheckList: sharedCheckListReducer,
    checkinStatistics: checkinStatisticsReducer,
    checkin: checkinReducer,
    header: headerReducer,
    tableHistory: tableHistoryReducer,
    googleMap: googleMapReducer,
    publicCheckList: publicCheckListReducer,
    notifications: notificationsReducer,
    invitations: invitationsReducer,
    allChecklistFilter: allChecklistFilterReducer,
    payment: paymentReducer,
    router: routerReducer,
    window: windowReducer,
    ...injectedReducers,
  } );
}