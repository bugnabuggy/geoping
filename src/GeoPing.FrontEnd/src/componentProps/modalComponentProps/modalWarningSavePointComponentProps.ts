import IGeoPoint from '../../DTO/geoPointDTO';
import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import { IGoogleMapStateType, IValidationPoint } from '../../types/stateTypes/googleMapStateType';
import ICheckListStateType from '../../types/stateTypes/checkListStateType';

export default interface IModalWarningSavePointComponentProps {
  show: boolean;
  googleMap: IGoogleMapStateType;
  checkList: ICheckListStateType;

  saveGeoPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  cancelGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  validationPoint: ( validation: IValidationPoint ) => ( dispatch: IDispatchFunction ) => void;
}