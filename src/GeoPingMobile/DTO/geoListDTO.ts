export default interface IGeoListType {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  rating: number;
  periodFrom: string;
  periodTo: string;
  ownerId: string;
  created: string;
  edited: string;
}

export interface IGeoListForUpdateDTO {
  Name: string;
  Description: string;
  IsPublic: boolean;
}

export interface IGeoListPublickDTO {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerName: string;
  createDate: string;
  editDate: string;
  publishDate: string;
  rating: number;
  subscribersNumber: number;
  finishersNumber: number;
  isOfficial: boolean;
}