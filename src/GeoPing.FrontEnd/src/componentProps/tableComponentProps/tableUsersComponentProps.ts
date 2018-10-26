import { IStatusUsers } from '../../types/stateTypes/allUsersFilterStateType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface ITableUsersComponentProps {
  listUsers: Array<IStatusUsers>;

  changeEmployee: ( idRow: number, value: boolean ) => ( dispatch: IDispatchFunction ) => void;
}