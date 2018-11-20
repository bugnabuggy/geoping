export default interface IAllChecklistFilterStateType {
  name: string;
  createdFrom: Date | string;
  createdTo: Date | string;
  geoPointFrom: string;
  geoPointTo: string;
  users: Array<IUsers>;
  selectedUser: string;
  isPublic: boolean;
}

export interface IUsers {
  id: number;
  name: string;
}