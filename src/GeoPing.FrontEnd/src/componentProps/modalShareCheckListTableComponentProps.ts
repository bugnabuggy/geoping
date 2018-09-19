export default interface IModalShareCheckListTableComponentProps {
  users: Array<IUsersListAccess>;
}

export interface IUsersListAccess {
  name: string;
  access: string;
}