import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { IMarker, IPosition } from '../types/stateTypes/googleMapStateType';
import ICheckinStateType from '../types/stateTypes/checkinStateType';

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