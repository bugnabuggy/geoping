import IUserWithAccessDTO from '../../DTO/userWitchAccessDTO';
import { IAutocompleteUsersDTO } from '../../DTO/userDTO';

export default interface ISharedCheckListStateType {
  listUsersWitchAccess: Array<IUserWithAccessDTO>;
  isLoading: boolean;
  autocompleteUsers: Array<IAutocompleteUsersDTO>;
}
