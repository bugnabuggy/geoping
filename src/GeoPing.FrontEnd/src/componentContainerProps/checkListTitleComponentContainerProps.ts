import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { IGeoListForUpdateDTO } from '../DTO/geoListDTO';
import ICheckListStateType from '../types/stateTypes/checkListStateType';

export default interface ICheckListTitleComponentContainerProps {
  checkList: ICheckListStateType;

  modalPeriodOpenClose: ( isState: boolean ) => ( dispatch: IDispatchFunction ) => void;
  updateNameCheckList: ( newNameCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  updateCheckList: ( idCheckList: string, checkList: IGeoListForUpdateDTO ) => (  dispatch: IDispatchFunction ) => void;
}