export interface IUsers {
  id: number;
  name: string;
  age: number;
  nickname: string;
  employee: boolean;
}

export default interface IAllUsersTableStateType {
  listUsers: Array<IUsers>;
}