import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import allUsersReducer from './allUsersReducer';
import checkListReducer from './checkListReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import tableUserReducer from './tableUsersReducer';
import checkinStatisticsReducer from './checkinStatisticsReducer';
import checkinReducer from './checkinReducer';
import googleMapReducer from './googleMapReducer';

export default function createReducer(injectedReducers: any) {
  return combineReducers({
    form: formReducer,
    allUsers: allUsersReducer,
    checkList: checkListReducer,
    user: userReducer,
    profile: profileReducer,
    tableUser: tableUserReducer,
    checkinStatistics: checkinStatisticsReducer,
    checkin: checkinReducer,
    googleMap: googleMapReducer,
    router: routerReducer,
    ...injectedReducers,
  });
}