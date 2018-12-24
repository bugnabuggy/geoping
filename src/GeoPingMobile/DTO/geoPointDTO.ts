export default interface IGeoPoint {
  id: string;
  idList: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  description: string;
  idForMap: string;
}

export interface IGeoPintForCreateDTO {
  Name: string;
  Description: string;
  Longitude: number;
  Latitude: number;
  Radius: number;
  Address: string;
}

export interface ICheckInGeoPointDTO {
  date: string;
  deviceId: string;
  distance: number;
  geopoint: any;
  id: string;
  ip: any;
  latitude: number;
  longitude: number;
  pointId: string;
  userAgent: any;
  userId: string;
  description: string;
}
