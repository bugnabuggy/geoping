// import { initialState } from './initialState';
const initialState: object = {
  users: [],
  specialty: [],
}

export function wishListReducer(state = initialState, action: any) {
  let stateObject: any = {
    'SET_VISIBILITY_FILTER': newState(state, action),
    'GET_SPECIALTY': getSpecialty(state, action),
    'SEND_NEW_USER': newState(state, action),
  };
  
  return stateObject.hasOwnProperty(action.type) ? stateObject[action.type] : state;
}

function newState(state: any, action: any) {
  let tenpState = Object.assign({}, state, { users: action.users });
  return tenpState;
}

function getSpecialty(state: any, action: any) {
  let tenpState = Object.assign({}, state, { specialty: action.specialty });
  return tenpState;
}

// function sendUser(state: any, action: any) {
//   let tenpState = Object.assign({}, state, { specialty: action.users });
//   return tenpState;
// }