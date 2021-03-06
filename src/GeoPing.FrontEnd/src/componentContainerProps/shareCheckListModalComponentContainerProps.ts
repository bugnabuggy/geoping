import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IMyCheckListsStateType from '../types/stateTypes/myCheckListsStateType';
import ISharedCheckListStateType, { IUsersDataList } from '../types/stateTypes/sharedCheckListStateType';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { IGeoListForUpdateDTO } from '../DTO/geoListDTO';

export default interface IShareCheckListModalComponentContainerProps {
  myCheckList: IMyCheckListsStateType;
  sharedCheckList: ISharedCheckListStateType;
  checkList: ICheckListStateType;

  closeModalShare: () => ( dispatch: IDispatchFunction ) => void;
  loadUsersForShared: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  clearSharedCheckList: () => ( dispatch: IDispatchFunction ) => void;
  sendAccessUsersForCheckList: ( idCheckList: string, emails: Array<string> ) =>
    ( dispatch: IDispatchFunction ) => void;
  providePublicAccess: ( idList: string, isPublic: boolean ) => ( dispatch: IDispatchFunction ) => void;
  updateCheckList: ( idCheckList: string, checkList: IGeoListForUpdateDTO ) => ( dispatch: IDispatchFunction ) => void;
  getAutocompletedListUsers: ( userName: string, id: string ) => ( dispatch: IDispatchFunction ) => void;
  clearAutocompleteListUsers: () => ( dispatch: IDispatchFunction ) => void;
  removeAccessUserForList: ( sharingId: string ) => ( dispatch: IDispatchFunction ) => void;
  changeCountUser: ( usersDataList: Array<IUsersDataList> ) => ( dispatch: IDispatchFunction ) => void;
  changeUserData: ( usersDataList: IUsersDataList ) => ( dispatch: IDispatchFunction ) => void;
}