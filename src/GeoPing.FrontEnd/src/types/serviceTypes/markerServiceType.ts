import { IMarker } from '../stateTypes/googleMapStateType';

export default interface IMarkerServiceType {
  getAllMarkersForCheckList: ( idCheckList: string ) => Promise<any>;
  getMarkersForListAndUser: ( idList: string, idUser: string ) => Promise<any>;

  createNewMarker: ( marker: IMarker ) => Promise<any>;

  deleteMarker: ( idCheckList: string, markerId: string ) => Promise<any>;

  updateMarker: ( marker: IMarker ) => Promise<any>;
}