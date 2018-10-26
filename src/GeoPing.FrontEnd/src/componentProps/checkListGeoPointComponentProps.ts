import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import IGeoPoint from '../DTO/geoPointDTO';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';

export default interface ICheckListGeoPointComponentProps {
  checkList: ICheckListStateType;
  googleMap: IGoogleMapStateType;

  saveGeoPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeDataGeoPoint: ( field: string, data: string | number ) => ( dispatch: IDispatchFunction ) => void;
  cancelGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
}
