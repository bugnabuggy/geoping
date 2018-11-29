import ICheckListStateType from '../types/stateTypes/checkListStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IinvitationsStateType from '../types/stateTypes/invitationsStateType';

export default interface IInvitationsDashbordComponentProps {
  checkList: ICheckListStateType;
  invitations: IinvitationsStateType;

  acceptListSharingInvite: ( sharingId: string ) => ( dispatch: IDispatchFunction) => void;
  cancelAcceptNewSharingList: ( sharingId: string ) => ( dispatch: IDispatchFunction ) => void;
}