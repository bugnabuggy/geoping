export default interface IGeolistType {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  rating: number;
  periodFrom: string;
  periodTo: string;
  ownerId: string;
  owner: any;
  reviews: any;
  geoPoints: any;
  usersLists: any;
}