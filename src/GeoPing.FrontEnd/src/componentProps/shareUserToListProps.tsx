import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ISharedCheckListStateType, { IUsersDataList } from '../types/stateTypes/sharedCheckListStateType';

export default interface IShareUserToListProps {
  sharedCheckList: ISharedCheckListStateType;

  closeModalShare: () => void;
  handleSubmit: ( users: Array<string>) => void;
  getAutocompletedListUsers: ( userName: string, id: string ) => ( dispatch: IDispatchFunction ) => void;
  clearAutocompleteListUsers: () => ( dispatch: IDispatchFunction ) => void;
  changeCountUser: ( usersDataList: Array<IUsersDataList> ) => ( dispatch: IDispatchFunction ) => void;
  changeUserData: ( usersDataList: IUsersDataList ) => ( dispatch: IDispatchFunction ) => void;
}