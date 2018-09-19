import IPointType from './pointType';

export default interface ICheckListStateType {
  pointsList: Array<IPointType>;
  isShowModal: boolean;
  idChecklist: number;
  nameChecklist: string;
  isEditind: boolean;
}