import IUserWithAccessDTO from '../../DTO/userWitchAccessDTO';

export default interface ISharedCheckListStateType {
  listUsersWitchAccess: Array<IUserWithAccessDTO>;
  isLoading: boolean;
}