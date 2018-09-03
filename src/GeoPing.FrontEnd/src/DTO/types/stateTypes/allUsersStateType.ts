
interface IStatusUsers {
  name: string;
  id: number;
}

export default interface IAllUsersStateType {
  name: string;
  regDateFrom: string;
  regDateTo: string;
  listCountFrom: string;
  listCountTo: string;
  status: Array<IStatusUsers>;
  isOficial: boolean;
}