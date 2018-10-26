export default interface IGeoListType {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  rating: number;
  periodFrom: string;
  periodTo: string;
  ownerId: string;
}
