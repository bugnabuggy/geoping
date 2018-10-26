import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IMyCheckListsStateType from '../types/stateTypes/myCheckListsStateType';
import ISharedCheckListStateType from '../types/stateTypes/sharedCheckListStateType';

export default interface IShareCheckListModalComponentContainerProps {
  myCheckList: IMyCheckListsStateType;
  sharedCheckList: ISharedCheckListStateType;

  closeModalShare: () => ( dispatch: IDispatchFunction ) => void;
  loadUsersForShared: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  clearSharedCheckList: () => ( dispatch: IDispatchFunction ) => void;
  sendAccessUsersForCheckList: ( idCheckList: string, emails: Array<string> ) =>
    ( dispatch: IDispatchFunction ) => void;
  providePublicAccess: ( idList: string, isPublic: boolean ) => ( dispatch: IDispatchFunction ) => void;
}