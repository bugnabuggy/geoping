import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IInvitationsDashbordContainer {
  show: boolean;

  filterInvitations: () => (dispatch: IDispatchFunction ) => void;
  closeFilterInvitations: () => (dispatch: IDispatchFunction ) => void;
}