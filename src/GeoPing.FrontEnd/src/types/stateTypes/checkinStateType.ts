import ICheckListStateType from './checkListStateType';
import { ETimer } from '../../enums/timerEnum';

export default interface ICheckinStateType {
  selectList: Array<ICheckListStateType>;
  difference: number;
  isCheckIn: boolean;
  selectedListId: string;
  isListLoading: boolean;
  isPointLoading: boolean;
  isStartTimer: ETimer;
  countTimer: 0;
}