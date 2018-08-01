import { get, post } from '../services/httpService';

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
  return { type: 'SET_VISIBILITY_FILTER', users };
};

export function getSpecialtyAction(specialty: any) {
  return { type: 'GET_SPECIALTY', specialty };
};

export function sendNewUserAction(users: any) {
  return {type: 'SEND_NEW_USER', users};
};
