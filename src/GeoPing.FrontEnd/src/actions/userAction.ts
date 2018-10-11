import IRegistrationUserType from '../types/actionsType/registrationUserDataType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { USER_AUTHORIZATION, USER_SIGN_OUT } from '../constantsForReducer/user';

export const authorizationUser = ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => {

  dispatch ( authorizationUserAction ( true ) );
};

export const registrationUser = ( registrationUserData: IRegistrationUserType ) => ( dispatch: IDispatchFunction ) => {

  return '';
};

export const resetPasswordEnterLoginOrEmail = ( emailOrLogin: string ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const resetPasswordEnterNewPassword = ( newPassword: string ) => ( dispatch: IDispatchFunction ) => {
  return '';
};

export const signOutUser = () => ( dispatch: IDispatchFunction ) => {
  dispatch ( signOutUserAction () );
};

/* Actions */

function authorizationUserAction( authorization: boolean ): Object {
  return { type: USER_AUTHORIZATION, authorization };
}

function signOutUserAction(): Object {
  return { type: USER_SIGN_OUT };
}