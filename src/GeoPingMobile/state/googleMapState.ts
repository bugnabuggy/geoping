import { IGoogleMapStateType } from '../types/stateTypes/googleMapStateType';
import { EnumStatusMarker } from '../enums/statusMarker';

export const googleMapState: IGoogleMapStateType = {
  geoPoints: [
    // {
    //   id: 'ffff',
    //   name: 'Просто',
    //   idList: 'ff',
    //   lat: 54.9924400,
    //   lng: 73.3685900,
    //   radius: 50,
    //   description: ``,
    // },
    // {
    //   id: 'ggggg',
    //   name: 'Omsk',
    //   idList: 'ff',
    //   lat: 54.9924410,
    //   lng: 71.3674810,
    //   radius: 200,
    //   description: ``,
    // }
  ],
  selectedGeoPoint: {
    id: '',
    idList: '',
    name: '',
    lat: 0,
    lng: 0,
    radius: 0,
    description: '',
    idForMap: '',
  },
  isAddMarker: false,
  moveStartMarker: {
    lat: null,
    lng: null,
  },
  position: {
    isSuccess: false,
    lat: 0,
    lng: 0,
    address: '',
  },
  statusMarker: EnumStatusMarker.None,
  idDeleteMarker: '',
  isGeoPointListIsCreated: false,
  checkInGeoPoint: [],
};
