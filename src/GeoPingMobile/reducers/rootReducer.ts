import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

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
// import storage from "redux-persist/es/storage";

// const persistConfig: any = {
//   key: 'root',
//   storage,
//   stateReconciler: autoMergeLevel2,
//   blacklist: [
//     'allUsersFilter',
//     'allUsersTable',
//     'form',
//     'checkList',
//     'profile',
//     'tableUser',
//     'myCheckList',
//     'sharedCheckList',
//     'checkinStatistics',
//     'checkin',
//     'header',
//     'tableHistory',
//     'googleMap',
//     'publicCheckList',
//     'notifications',
//     'invitations',
//     'router',
//     'allChecklistFilter',
//     'window',
//   ],
//   whitelist: [
//     'user'
//   ],
// };

export default function createReducer( injectedReducers: any ) {

  // return persistReducer (
  //   persistConfig,
    return combineReducers (
      {
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
        router: routerReducer,
        window: windowReducer,
        ...injectedReducers,
      }
    // )
  );
}