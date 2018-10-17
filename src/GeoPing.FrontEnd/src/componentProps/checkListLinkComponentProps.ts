import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import IGeoPoint from '../DTO/geoPointDTO';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';

export default interface ICheckListLinkComponentProps {
  googleMap: IGoogleMapStateType;

  permissionAdd: ( isPermissionAdd: boolean ) => ( dispatch: IDispatchFunction ) => void;
  addNotification: ( message: string, typeNotification: EnumNotificationType ) =>
    ( dispatch: IDispatchFunction ) => string;
  deleteNotification: ( idNotification: string ) => ( dispatch: IDispatchFunction ) => void;
  addNewPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  addNewPointForMyGeoPosition: ( isMyGeoPosition: boolean ) => ( dispatch: IDispatchFunction ) => void;
}
