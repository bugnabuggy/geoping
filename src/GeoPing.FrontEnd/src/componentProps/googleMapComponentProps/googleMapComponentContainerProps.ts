import IDispatchFunction from '../../types/functionsTypes/dispatchFunction';
import { IGoogleMapStateType } from '../../types/stateTypes/googleMapStateType';
import IGeoPoint from '../../DTO/geoPointDTO';
import { EnumStatusMarker } from '../../enums/statusMarker';
import ICheckListStateType from '../../types/stateTypes/checkListStateType';
import ICheckinStatisticsStateType from '../../types/stateTypes/checkinStatisticsStateType';

export default interface IGoogleMapComponentContainerProps {
  isCheckIn: boolean;
  checkList: ICheckListStateType;
  selectedListId: string;
  googleMap: IGoogleMapStateType;
  checkInStatistics: ICheckinStatisticsStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  addNewPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  findGeoPosition: () => ( dispatch: IDispatchFunction ) => void;
  permissionAdd: ( isPermissionAdd: boolean ) => ( dispatch: IDispatchFunction ) => void;
  editingPermission: ( isEditing: boolean ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  deleteGeoPoint: ( geoPoint: IGeoPoint, statusMarker: EnumStatusMarker, idList?: string ) =>
    ( dispatch: IDispatchFunction ) => void;
  addNewPointForMyGeoPosition: ( isMyGeoPosition: boolean ) => ( dispatch: IDispatchFunction ) => void;
  geoPointListIsCreate: ( isGeoPointListIsCreated: boolean ) => ( dispatch: IDispatchFunction ) => void;
  addDistance: ( distance: number ) => ( dispatch: IDispatchFunction ) => void;
  clearStateGoogleMap: () => ( dispatch: IDispatchFunction ) => void;
  getMyAddress: () => (dispatch: IDispatchFunction) => void;
}
