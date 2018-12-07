import { IUsersDataList } from '../../types/stateTypes/sharedCheckListStateType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import ISharedCheckListStateType from '../../types/stateTypes/sharedCheckListStateType';

export default interface IAutocompleteComponentProps {
  userData: IUsersDataList;
  sharedCheckList: ISharedCheckListStateType;

  changeUserData: ( usersDataList: IUsersDataList ) => ( dispatch: IDispatchFunction ) => void;
  getAutocompletedListUsers: ( userName: string, id: string) => ( dispatch: IDispatchFunction ) => void;
}