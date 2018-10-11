import IDispatchFunction from '../DTO/types/dispatchFunction';

export default  interface IinvitationsFilterComponentProps {
  show: boolean;

  closeFilterInvitations: () => (dispatch: IDispatchFunction ) => void;
}