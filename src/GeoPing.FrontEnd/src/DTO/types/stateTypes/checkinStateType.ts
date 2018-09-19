import IPointType from './pointType';
import ICheckListStateType from './checkListStateType';

export default interface ICheckinStateType {
  selectList: Array<ICheckListStateType>;
  selectPoint: Array<IPointType>;
  lat: string;
  long: string;
  difference: string | any; /// refactor
}