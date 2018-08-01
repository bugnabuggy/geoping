import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import { appReducer } from './appReducer';
import { wishListReducer } from './wishListReduser';

export default function createReducer(injectedReducers: any) {
  return combineReducers({
    form: formReducer,
    wishList: wishListReducer,
    appUser: appReducer,
    router: routerReducer,
    ...injectedReducers,
  });
};