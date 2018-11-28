import IGeoListType, { IGeoListForUpdateDTO } from '../../DTO/geoListDTO';
import { ICheckInDTO } from '../../DTO/checkInDTO';

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

  addCheckIn: ( idList: string, idPoint: string, data: ICheckInDTO ) => Promise<any>;
  getAllChecksForUserAndList: ( idList: string ) => Promise<any>;

  getAllCheckForList: ( idList: string ) => Promise<any>;

  getAllNewSharedLists: () => Promise<any>;
  getAllAcceptedSharedLists: () => Promise<any>;
  deleteListSharing: ( sharingId: string ) => Promise<any>;
  cancelAcceptanceNewSharingList: ( sharingId: string ) => Promise<any>;
  acceptListSharingInvite: ( sharingId: string ) => Promise<any>;
  getAutocompletedListUsers: ( userName: string ) => Promise<any>;
}
