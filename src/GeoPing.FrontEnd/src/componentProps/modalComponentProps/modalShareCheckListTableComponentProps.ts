import ISharedCheckListStateType from '../../types/stateTypes/sharedCheckListStateType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IModalShareCheckListTableComponentProps {
  sharedCheckList: ISharedCheckListStateType;

  removeAccessUserForList: ( sharingId: string ) => ( dispatch: IDispatchFunction ) => void;
}

export interface IUsersListAccess {
  name: string;
  access: string;
}