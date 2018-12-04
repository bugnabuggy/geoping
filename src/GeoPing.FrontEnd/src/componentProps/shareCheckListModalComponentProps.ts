import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IMyCheckListsStateType from '../types/stateTypes/myCheckListsStateType';
import ISharedCheckListStateType from '../types/stateTypes/sharedCheckListStateType';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { IGeoListForUpdateDTO } from '../DTO/geoListDTO';

export default interface IShareCheckListModalComponentProps {
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
  getAutocompletedListUsers: ( userName: string) => ( dispatch: IDispatchFunction ) => void;
  clearAutocompleteListUsers: () => ( dispatch: IDispatchFunction ) => void;
  removeAccessUserForList: ( sharingId: string ) => ( dispatch: IDispatchFunction ) => void;
}