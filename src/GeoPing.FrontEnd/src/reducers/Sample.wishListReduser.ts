import { sampleWishList } from '../state/Sample.wishList';
import { sampleWishListType } from '../DTO/types/Sample.wishListType';
import { WISH_LIST } from '../DTO/Sample.constantsForReducer';

export function wishListReducer( state: sampleWishListType = sampleWishList, action: any ) {
  let stateObject: any = {
    [WISH_LIST.SET_VISIBILITY_FILTER]: newState ( state, action ),
    [WISH_LIST.GET_SPECIALTY]: getSpecialty ( state, action ),
    [WISH_LIST.SEND_NEW_USER]: newState ( state, action ),
  };

  return stateObject.hasOwnProperty ( action.type ) ? stateObject[action.type] : state;
}

function newState( state: any, action: any ) {
  let tempState = Object.assign ( {}, state, { users: action.users } );
  return tempState;
}

function getSpecialty( state: any, action: any ) {
  let tempState = Object.assign ( {}, state, { specialty: action.specialty } );
  return tempState;
}

// function sendUser(state: any, action: any) {
//   let tempState = Object.assign({}, state, { specialty: action.users });
//   return tempState;
// }