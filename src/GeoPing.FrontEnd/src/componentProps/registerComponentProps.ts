import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IRegistrationUserDTO from '../DTO/registrationUserDTO';

export default interface IRegisterComponentProps {
  registrationUser: ( registrationUserData: IRegistrationUserDTO ) => ( dispatch: IDispatchFunction ) => void;
}