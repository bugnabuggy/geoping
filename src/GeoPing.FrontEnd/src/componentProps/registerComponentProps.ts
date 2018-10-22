import IRegistrationUserType from '../types/actionsType/registrationUserDataType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IRegisterComponentProps {
  registrationUser: ( registrationUserData: IRegistrationUserType ) => ( dispatch: IDispatchFunction ) => void;
}