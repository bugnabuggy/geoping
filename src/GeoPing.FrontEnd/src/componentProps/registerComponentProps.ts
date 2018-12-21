import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IRegistrationUserDTO from '../DTO/registrationUserDTO';
import { ITimeZoneDTO } from '../DTO/timeZoneDTO';

export default interface IRegisterComponentProps {
  timeZones: Array<ITimeZoneDTO>;

  registrationUser: ( registrationUserData: IRegistrationUserDTO ) => ( dispatch: IDispatchFunction ) => void;
}