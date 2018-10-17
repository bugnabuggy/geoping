import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckinStateType from '../types/stateTypes/checkinStateType';
import IGeoPoint from '../DTO/geoPointDTO';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';

export default interface ICheckinComponentProps {
  checkin: ICheckinStateType;
  googleMap: IGoogleMapStateType;
  functions: ICheckinFunctions;
}

export interface ICheckinFunctions {
  loadLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
}
