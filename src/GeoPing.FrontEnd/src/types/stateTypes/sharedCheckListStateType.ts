import IUserWithAccessDTO from '../../DTO/userWitchAccessDTO';
import { IAutocompleteUsersDTO } from '../../DTO/userDTO';

export default interface ISharedCheckListStateType {
  listUsersWitchAccess: Array<IUserWithAccessDTO>;
  isLoading: boolean;
  messageForActivateToken: string;
  usersDataList: Array<IUsersDataList>;
}

export interface IUsersDataList {
  identifier: string;
  id: string;
  autocompleteUsers: Array<IAutocompleteUsersDTO>;
}