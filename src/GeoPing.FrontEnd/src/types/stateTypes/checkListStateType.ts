import IPointType from './pointType';

export default interface ICheckListStateType {
  pointsList: Array<IPointType>;
  isShowModal: boolean;
  idChecklist: string;
  nameChecklist: string;
  isEditing: boolean;
  showFilterCheckList: boolean;
}