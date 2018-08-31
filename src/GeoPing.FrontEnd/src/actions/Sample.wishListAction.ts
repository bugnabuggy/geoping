import { get, post } from '../services/httpService';
import { WISH_LIST } from '../DTO/Sample.constantsForReducer';

export const getRecords = () => (dispatch: Function) => {
  get('http://localhost:3001')
    .then((response: any) => {
      dispatch(setVisibilityFilter(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export const getSpecialty = () => (dispatch: Function) => {
  get('http://localhost:3001/specialty')
    .then((response: any) => {
      dispatch(getSpecialtyAction(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export const sendNewUser = (data: any) => (dispatch: Function) => {
  post('http://localhost:3001/hello', data)
    .then((response: any) => {
      dispatch(sendNewUserAction(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export function setVisibilityFilter(users: any) {
  return { type: WISH_LIST.SET_VISIBILITY_FILTER, users };
}

export function getSpecialtyAction(specialty: any) {
  return { type: WISH_LIST.GET_SPECIALTY, specialty };
}

export function sendNewUserAction(users: any) {
  return {type: WISH_LIST.SEND_NEW_USER, users};
}
