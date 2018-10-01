import IGoogleMapType, { EnumStatusMarker } from '../DTO/types/googleMapType';

export const googleMapState: IGoogleMapType = {
  markersList: [
    // {
    //   id: uuidV4 (),
    //   name: 'Просто',
    //   lat: 54.9924400,
    //   lng: 73.3685900,
    //   radius: 50,
    //   description: ``,
    // },
    // {
    //   id: uuidV4 (),
    //   name: 'Omsk',
    //   lat: 54.9924410,
    //   lng: 71.3674810,
    //   radius: 200,
    //   description: ``,
    // }
  ],
  markersForMap: [],
  selectedMarker: {
    id: '',
    idList: '',
    name: '',
    lat: 0,
    lng: 0,
    radius: 0,
    description: '',
  },
  selectedMarkerForMap: {},
  isAddMarker: false,
  moveStartMarker: {
    id: '',
    lat: 0,
    lng: 0,
  },
  moveEndMarker: {
    id: '',
    lat: 0,
    lng: 0,
  },
  newMarker: {
    id: '',
    idList: '',
    name: '',
    lat: 0,
    lng: 0,
    radius: 0,
    description: ''
  },
  position: {
    isSuccess: false,
    lat: 0,
    lng: 0,
  },
  isThereIsNewMarker: false,
  isMarkerInstalled: false,
  isMarkerSaved: false,
  isMarkerCanceled: false,
  statusMarker: EnumStatusMarker.None,
  isCheckGeoPosition: false,
  deleteMarker: '',
  isUserMarkerCreated: false,
  isMarkerRendered: false,
};