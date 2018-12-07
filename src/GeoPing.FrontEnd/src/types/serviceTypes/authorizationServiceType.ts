import IRegistrationUserDTO from '../../DTO/registrationUserDTO';

export default interface IAuthorization {
  getVirtualDatabase?: () => Promise<any>;
  signin: ( email: string, password: string ) => Promise<any>;
  registrationUser: ( registrationUserData: IRegistrationUserDTO ) => Promise<any>;
}