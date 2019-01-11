export default interface IGeoPoint {
  id: string;
  idList: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  description: string;
  idForMap: string;
  color: string;
}

export interface IGeoPintForCreateDTO {
  Name: string;
  Description: string;
  Longitude: number;
  Latitude: number;
  Radius: number;
  Address: string;
}

export enum ETypeCheckInPoint {
  Checked = 'Checked',
  Unchecked = 'Unchecked',
  FreeCheck = 'FreeCheck',
}

export interface ICheckInGeoPointDTO {
  date: string;
  deviceId: string;
  distance: number;
  geopoint: any;
  checkInId: string;
  ip: any;
  latitude: number;
  longitude: number;
  pointId: string;
  userAgent: any;
  userId: string;
  description: string;
  type: ETypeCheckInPoint;
}
