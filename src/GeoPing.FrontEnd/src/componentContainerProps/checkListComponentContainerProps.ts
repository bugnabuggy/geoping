import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import IGeoPoint from '../DTO/geoPointDTO';
import { EnumStatusMarker } from '../enums/statusMarker';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';

export default interface ICheckListComponentContainerProps {
  checkList: ICheckListStateType;
  googleMap: IGoogleMapStateType;
  idCheckList: string;

  permissionAdd: ( isPermissionAdd: boolean ) => ( dispatch: IDispatchFunction ) => void;
  saveGeoPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeDataGeoPoint: ( field: string, data: string | number ) => ( dispatch: IDispatchFunction ) => void;
  cancelGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => string;
  deleteNotification: ( idNotification: string ) => ( dispatch: IDispatchFunction ) => void;
  addNewPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  addNewPointForMyGeoPosition: ( isMyGeoPosition: boolean ) => ( dispatch: IDispatchFunction ) => void;
  deleteGeoPoint: ( geoPoint: IGeoPoint, statusMarker: EnumStatusMarker, idList?: string ) =>
    ( dispatch: IDispatchFunction ) => void;
  loadCheckListData: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  clearStateCheckList: () => ( dispatch: IDispatchFunction ) => void;
  isCheckListPage: ( isCheckList: boolean ) => ( dispatch: IDispatchFunction ) => void;
}
