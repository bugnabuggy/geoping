import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default  interface IinvitationsFilterComponentProps {
  show: boolean;

  closeFilterInvitations: () => (dispatch: IDispatchFunction ) => void;
}