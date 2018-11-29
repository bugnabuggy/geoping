import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ISharedCheckListStateType from '../types/stateTypes/sharedCheckListStateType';

export default interface IShareUserToListProps {
  sharedCheckList: ISharedCheckListStateType;

  closeModalShare: () => void;
  handleSubmit: ( e: any) => void;
  getAutocompletedListUsers: ( userName: string) => ( dispatch: IDispatchFunction ) => void;
  clearAutocompleteListUsers: () => ( dispatch: IDispatchFunction ) => void;
}