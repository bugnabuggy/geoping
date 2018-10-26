import ISharedCheckListStateType from '../../types/stateTypes/sharedCheckListStateType';

export default interface IModalShareCheckListTableComponentProps {
  sharedCheckList: ISharedCheckListStateType;
}

export interface IUsersListAccess {
  name: string;
  access: string;
}