import * as moment from 'moment';
import { IStatusUsers } from '../../types/stateTypes/allUsersFilterStateType';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';

export default interface IFilterUsersComponentProps {
  fields: IFilterUsersProps;
  changeFilters: ( fieldName: string, value: any ) => ( dispatch: IDispatchFunction ) => void;
}

export interface IFilterUsersProps {
  name: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  listCountFrom: string;
  listCountTo: string;
  status: Array<IStatusUsers>;
  selectedStatus: number;
  isOfficial: boolean;
  isAdmin: boolean;

}