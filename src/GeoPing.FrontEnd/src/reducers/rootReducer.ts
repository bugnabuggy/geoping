import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// import { sampleAppReducer } from './Sample.appReducer';
// import { wishListReducer } from './Sample.wishListReduser';

export default function createReducer(injectedReducers: any) {
  return combineReducers({
    form: formReducer,
    // sampleWishList: wishListReducer,
    // sampleLogin: sampleAppReducer,
    router: routerReducer,
    ...injectedReducers,
  });
}