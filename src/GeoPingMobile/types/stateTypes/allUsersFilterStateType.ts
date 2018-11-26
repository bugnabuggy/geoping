import * as moment from 'moment';

export interface IStatusUsers {
  name: string;
  id: number;
}

export default interface IAllUsersFilterStateType {
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