import ICheckListStateType from './checkListStateType';

export default interface ICheckinStateType {
  selectList: Array<ICheckListStateType>;
  difference: number;
  isCheckIn: boolean;
  selectedListId: string;
  isListLoading: boolean;
  isPointLoading: boolean;
}