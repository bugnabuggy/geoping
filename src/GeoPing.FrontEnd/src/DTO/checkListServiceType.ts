import IGeolistType from './geolistType';

export default interface ICheckListServiceType {
  loadAllMyCheckLists: ( idUser: string ) => Promise<any>;
  loadPublicCheckLists: () => Promise<any>;
  loadMyCheckList: ( idCheckLIst: string ) => Promise<any>;

  createMyCheckList: ( nameCheckList: string ) => Promise<any>;

  updateMyCheckList: ( checkList: IGeolistType ) => Promise<any>;
  updateNameMyCheckList: ( newNameCheckList: string ) => Promise<any>;

  deleteMyCheckList: ( idCheckLIst: string ) => Promise<any>;

  filterPublicCheckList: () => Promise<any>;
}