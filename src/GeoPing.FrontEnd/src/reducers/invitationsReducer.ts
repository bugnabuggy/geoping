import { FILTER_INVITATIONS_LIST, CLOSE_FILTER_INVITATIONS } from '../constantsForReducer/filters';
import IinvitationsStateType from '../types/stateTypes/invitationsStateType';
import { invitationsState } from '../state/invitationsState';

export default function invitationsReducer( state: IinvitationsStateType = invitationsState, action: any ) {
  const reduceObject: any = {
    [FILTER_INVITATIONS_LIST]: filterInvitations,
    [CLOSE_FILTER_INVITATIONS]: closeFilterInvitations
  };
  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}
function filterInvitations( state: IinvitationsStateType , action: any ) {
  const newState: IinvitationsStateType  = Object.assign( {}, state, { showInvitationsFilter: action.isShow } );
  return newState;
}
function closeFilterInvitations( state: IinvitationsStateType , action: any ) {
  const newState: IinvitationsStateType  = Object.assign( {}, state, { showInvitationsFilter: action.isShow } );
  return newState;
}