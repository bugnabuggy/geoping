import IGeoListType, { IGeoListForUpdateDTO } from '../../DTO/geoListDTO';

export default interface ICheckListServiceType {
  loadAllMyCheckLists: () => Promise<any>;
  loadPublicCheckLists: () => Promise<any>;
  loadMyCheckList: ( idCheckLIst: string ) => Promise<any>;
  loadUserWhoHasAccess: ( idList: string ) => Promise<any>;

  createMyCheckList: ( nameCheckList: string ) => Promise<any>;

  updateMyCheckList: ( idCheckList: string, checkList: IGeoListForUpdateDTO ) => Promise<any>;
  updateNameMyCheckList: ( newNameCheckList: string ) => Promise<any>;

  deleteMyCheckList: ( idCheckLIst: string ) => Promise<any>;

  filterPublicCheckList: ( filters: any) => Promise<any>;

  sharedCheckListForUser: ( idList: string, emails: Array<string> ) => Promise<any>;
  providePublicAccess: ( idList: string, isPublic: boolean ) => Promise<any>;

}