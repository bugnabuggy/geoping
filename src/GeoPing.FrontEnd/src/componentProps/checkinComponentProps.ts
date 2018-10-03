import IDispatchFunction from '../DTO/types/dispatchFunction';
import { IMarker, IPosition } from '../DTO/types/googleMapType';
import ICheckinStateType from '../DTO/types/stateTypes/checkinStateType';

export default interface ICheckinComponentProps {
  markersList: Array<IMarker>;
  checkin: ICheckinStateType;
  position: IPosition;
  selectedPoint: IMarker;
  functions: ICheckinFunctions;
}

export interface ICheckinFunctions {
  loadLists: ( idUser: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectList: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectedMarker: ( marker: IMarker ) => ( dispatch: IDispatchFunction ) => void;
  markerRender: ( isMarkerRendered: boolean ) => ( dispatch: IDispatchFunction ) => void;
  clearMarkerList: () => ( dispatch: IDispatchFunction ) => void;
}