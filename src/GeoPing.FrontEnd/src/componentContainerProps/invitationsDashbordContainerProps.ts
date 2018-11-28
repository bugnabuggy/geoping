import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import ICheckListStateType from '../types/stateTypes/checkListStateType';

export default interface IInvitationsDashbordContainer {
  show: boolean;
  checkList: ICheckListStateType;

  filterInvitations: () => (dispatch: IDispatchFunction ) => void;
  closeFilterInvitations: () => (dispatch: IDispatchFunction ) => void;
  loadAllNewSharedList: () => ( dispatch: IDispatchFunction) => void;
  loadAllAcceptedSharedLists: () => ( dispatch: IDispatchFunction ) => void;
  deleteListSharing: ( sharingId: string ) => ( dispatch: IDispatchFunction ) => void;
  cancelAcceptNewSharingList: ( sharingId: string ) => ( dispatch: IDispatchFunction ) => void;
  acceptListSharingInvite: ( sharingId: string ) => ( dispatch: IDispatchFunction) => void;
}