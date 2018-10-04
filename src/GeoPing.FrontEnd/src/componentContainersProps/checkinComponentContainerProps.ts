import IDispatchFunction from '../DTO/types/dispatchFunction';
import { IMarker, IPosition } from '../DTO/types/googleMapType';
import ICheckinStateType from '../DTO/types/stateTypes/checkinStateType';

export default interface ICheckinComponentContainerProps {
  markersList: Array<IMarker>;
  checkin: ICheckinStateType;
  position: IPosition;
  selectedPoint: IMarker;

  loadLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  checkinFlag: ( isCheckin: boolean ) => ( dispatch: IDispatchFunction ) => void;
  selectedMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  findLocationForCenterMap: () => ( dispatch: IDispatchFunction ) => void;
  markerRender: ( isMarkerRendered: boolean ) => ( dispatch: IDispatchFunction ) => void;
  clearMarkerList: () => ( dispatch: IDispatchFunction ) => void;
}