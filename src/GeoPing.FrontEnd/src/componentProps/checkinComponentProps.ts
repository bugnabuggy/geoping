import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckinStateType from '../types/stateTypes/checkinStateType';
import IGeoPoint from '../DTO/geoPointDTO';
import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import IHistoryDataDTO from '../DTO/historyDataDTO';
import ICheckListStateType from '../types/stateTypes/checkListStateType';
import { ICheckInDTO } from '../DTO/checkInDTO';
import { EnumNotificationType } from '../enums/notificationTypeEnum';
import { ETimer } from '../enums/timerEnum';

export default interface ICheckinComponentProps {
  checkin: ICheckinStateType;
  googleMap: IGoogleMapStateType;
  checkList: ICheckListStateType;
  functions: ICheckinFunctions;
}

export interface ICheckinFunctions {
  loadLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  getMyAddress: () => (dispatch: IDispatchFunction) => void;
  saveHistory: (idUser: string, historyData: IHistoryDataDTO) => ( dispatch: IDispatchFunction ) => void;
  clearGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  checkIn: ( idPoint: string, data: ICheckInDTO ) => ( dispatch: IDispatchFunction ) => void;
  messagesForUser: ( message: string, type: EnumNotificationType ) => ( dispatch: IDispatchFunction ) => void;
  setTimer: ( isStartTimer: ETimer ) => ( dispatch: IDispatchFunction ) => void;
  timerAccount: ( countTimer: number ) => ( dispatch: IDispatchFunction ) => void;
  addDistance: ( distance: number ) => ( dispatch: IDispatchFunction ) => void;
}
