import IGeoListType from '../../DTO/geoListDTO';

export default interface ICheckListServiceType {
  loadAllMyCheckLists: ( idUser: string ) => Promise<any>;
  loadPublicCheckLists: () => Promise<any>;
  loadMyCheckList: ( idCheckLIst: string ) => Promise<any>;
  loadUserWhoHasAccess: ( idList: string ) => Promise<any>;

  createMyCheckList: ( nameCheckList: string ) => Promise<any>;

  updateMyCheckList: ( checkList: IGeoListType ) => Promise<any>;
  updateNameMyCheckList: ( newNameCheckList: string ) => Promise<any>;

  deleteMyCheckList: ( idCheckLIst: string ) => Promise<any>;

  filterPublicCheckList: () => Promise<any>;

  sharedCheckListForUser: ( idList: string, emails: Array<string> ) => Promise<any>;
  providePublicAccess: ( idList: string, isPublic: boolean ) => Promise<any>;

}