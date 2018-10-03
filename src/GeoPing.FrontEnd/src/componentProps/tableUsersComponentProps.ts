import { IStatusUsers } from '../DTO/types/stateTypes/allUsersFilterStateType';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface ITableUsersComponentProps {
  listUsers: Array<IStatusUsers>;

  changeEmployee: ( idRow: number, value: boolean ) => ( dispatch: IDispatchFunction ) => void;
}