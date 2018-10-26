import IRegistrationUserType from '../actionsType/registrationUserDataType';

export default interface IAuthorization {
  getVirtualDatabase?: () => Promise<any>;
  signin: ( email: string, password: string ) => Promise<any>;
  registrationUser: ( registrationUserData: IRegistrationUserType ) => Promise<any>;
}