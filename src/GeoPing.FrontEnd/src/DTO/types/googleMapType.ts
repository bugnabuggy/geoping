export default interface IGoogleMapType {
  markersList: Array<IMarker>;
  markersForMap: Array<any>;
  isAddMarker: boolean;
  selectedMarker: IMarker;
  selectedMarkerForMap: any;
  moveStartMarker: IMoveMarker;
  moveEndMarker: IMoveMarker;
  isThereIsNewMarker: boolean;
  newMarker: IMarker;
  isMarkerInstalled: boolean;
  isMarkerSaved: boolean;
  isMarkerCanceled: boolean;
  statusMarker: EnumStatusMarker;
  isCheckGeoPosition: boolean;
  position: IPosition;
  deleteMarker: string;
}

export interface IMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  description: string;
}

export interface IMoveMarker {
  id: string;
  lat: number;
  lng: number;
}

export interface IPosition {
  lat: number;
  lng: number;
  isSuccess: boolean;
}

export enum EnumStatusMarker {
  None = 'none',
  New = 'new',
  Edit = 'edit',
}