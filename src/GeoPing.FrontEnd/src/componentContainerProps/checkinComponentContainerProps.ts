import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckinStateType from '../types/stateTypes/checkinStateType';
import IGeoPoint from '../DTO/geoPointDTO';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';

export default interface ICheckinComponentContainerProps {
  checkin: ICheckinStateType;
  googleMap: IGoogleMapStateType;

  loadLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  checkinFlag: ( isCheckin: boolean ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
}
