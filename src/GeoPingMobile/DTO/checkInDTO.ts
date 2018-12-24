export interface ICheckInDTO {
  Latitude: number;
  Longitude: number;
  Distance: number;
  Description: string;
  DeviceId?: string;
  Ip?: string;
  UserAgent?: string;
}
