import IGeoListType, { IGeoListPublickDTO } from '../../DTO/geoListDTO';

export default interface ICheckListStateType {
  isShowModal: boolean;
  // id: string;
  // name: string;
  isEditing: boolean;
  showFilterCheckList: boolean;
  isMyGeoPosition: boolean;
  // description: string;
  // isPublic: boolean;
  // rating: number;
  // periodFrom: string;
  // periodTo: string;
  // ownerId: string;
  isGeoPointLoading: boolean;
  isCheckList: boolean;
  selectedGeoList: IGeoListType;
  checkLists: Array<IGeoListType>;
  checkListPublic: Array<IGeoListPublickDTO>;
}
