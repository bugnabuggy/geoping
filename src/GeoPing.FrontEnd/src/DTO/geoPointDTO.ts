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
