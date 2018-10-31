import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IGeoListType from '../DTO/geoListDTO';

export default interface ICheckListComponentProps {
  checkList: any;

  showModalShare: ( checkListId: string ) => ( dispatch: IDispatchFunction ) => void;
  deleteCheckList: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectCheckList: ( checkList: IGeoListType ) => ( dispatch: IDispatchFunction ) => void;
}