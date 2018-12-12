export interface ICheckInDTO {
  Latitude: string;
  Longitude: string;
  Distance: number;
  Description: string;
  DeviceId?: string;
  Ip?: string;
  UserAgent?: string;
}
