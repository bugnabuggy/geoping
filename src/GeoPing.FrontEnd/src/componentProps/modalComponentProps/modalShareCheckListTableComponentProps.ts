import IUserWitchAccessDTO from '../../DTO/userWitchAccessDTO';

export default interface IModalShareCheckListTableComponentProps {
  users: Array<IUserWitchAccessDTO>;
}

export interface IUsersListAccess {
  name: string;
  access: string;
}