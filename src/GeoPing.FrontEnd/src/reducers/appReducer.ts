import { initialState } from './initialState';

export function appReducer(state = initialState, action: any) {
  let cons = "USER";
  let stateObject = {
    [cons]: newState(state, action)
  };
  
  return stateObject.hasOwnProperty(action.type) ? stateObject[action.type] : state;
}

function newState(state: any, action: any) {
  let tenpState = Object.assign({}, state, { user: action.user });
  return tenpState;
}