import * as moment from 'moment';
import { IStatusUsers } from '../DTO/types/stateTypes/allUsersFilterStateType';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IFilterUsersComponentContainerProps {
  name: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  listCountFrom: string;
  listCountTo: string;
  status: Array<IStatusUsers>;
  selectedStatus: number;
  isOfficial: boolean;
  isAdmin: boolean;

  changeFilters: ( fieldName: string, value: any ) => ( dispatch: IDispatchFunction ) => void;
}