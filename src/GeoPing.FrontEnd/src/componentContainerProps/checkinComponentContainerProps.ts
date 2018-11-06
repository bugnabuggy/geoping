import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckinStateType from '../types/stateTypes/checkinStateType';
import IGeoPoint from '../DTO/geoPointDTO';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import IHistoryDataDTO from '../DTO/historyDataDTO';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { ICheckInDTO } from '../DTO/checkInDTO';
import { EnumNotificationType } from '../enums/notificationTypeEnum';

export default interface ICheckinComponentContainerProps {
  checkin: ICheckinStateType;
  googleMap: IGoogleMapStateType;
  checkList: ICheckListStateType;

  loadLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  checkinFlag: ( isCheckin: boolean ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  getMyAddress: () => (dispatch: IDispatchFunction) => void;
  saveHistory: (idUser: string, historyData: IHistoryDataDTO) => ( dispatch: IDispatchFunction ) => void;
  checkInClear: () => ( dispatch: IDispatchFunction ) => void;
  loadCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  clearGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  checkIn: ( idList: string, idPoint: string, data: ICheckInDTO ) => ( dispatch: IDispatchFunction ) => void;
  messagesForUser: ( message: string, type: EnumNotificationType ) => ( dispatch: IDispatchFunction ) => void;
}
