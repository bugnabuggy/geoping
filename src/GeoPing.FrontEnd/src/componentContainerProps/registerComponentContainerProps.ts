import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IRegistrationUserDTO from '../DTO/registrationUserDTO';
import IWindowStateType from '../types/stateTypes/windowStateType';

export default interface IRegisterComponentContainerProps {
  window: IWindowStateType;

  registrationUser: ( registrationUserData: IRegistrationUserDTO ) => ( dispatch: IDispatchFunction ) => void;
  getTimeZones: () => ( dispatch: IDispatchFunction ) => void;
}