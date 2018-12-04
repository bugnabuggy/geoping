import IUserWithAccessDTO from '../../DTO/userWitchAccessDTO';
import { IAutocompleteUsersDTO } from '../../DTO/userDTO';

export default interface ISharedCheckListStateType {
  listUsersWitchAccess: Array<IUserWithAccessDTO>;
  isLoading: boolean;
  messageForActivateToken: string;
  autocompleteUsers: Array<IAutocompleteUsersDTO>;
}
