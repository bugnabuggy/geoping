import { ITimeZoneDTO } from '../../DTO/timeZoneDTO';
import ICountriesDTO from '../../DTO/countriesDTO';

export default interface IWindowStateType {
  isBlockingWindow: boolean;
  redirectOnSignInForm: boolean;
  isConfirmEmail: boolean;
  redirect: string;
  timeZones: Array<ITimeZoneDTO>;
  coutries: Array<ICountriesDTO>;
}