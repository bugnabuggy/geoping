import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IInvitationsDashbordContainer {
  show: boolean;

  filterInvitations: () => (dispatch: IDispatchFunction ) => void;
  closeFilterInvitations: () => (dispatch: IDispatchFunction ) => void;
}