import { CLOSE_FILTER_INVITATIONS, FILTER_INVITATIONS_LIST } from '../constantsForReducer/filters';
import IinvitationsStateType from '../types/stateTypes/invitationsStateType';
import { invitationsState } from '../state/invitationsState';
import { ACCEPT_SHARING_LISTS_LOADING, NEW_SHARING_LISTS_LOADING } from '../constantsForReducer/checkList';

export default function invitationsReducer( state: IinvitationsStateType = invitationsState, action: any ) {
  const reduceObject: any = {
    [ FILTER_INVITATIONS_LIST ]: filterInvitations,
    [ CLOSE_FILTER_INVITATIONS ]: closeFilterInvitations,
    [ NEW_SHARING_LISTS_LOADING ]: newSharingListsLoading,
    [ ACCEPT_SHARING_LISTS_LOADING ]: acceptSharingListsLoading,
  };
  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[ action.type ]( state, action ) : state;
}

function filterInvitations( state: IinvitationsStateType, action: any ) {
  const newState: IinvitationsStateType = Object.assign( {}, state, { showInvitationsFilter: action.isShow } );
  return newState;
}

function closeFilterInvitations( state: IinvitationsStateType, action: any ) {
  const newState: IinvitationsStateType = Object.assign( {}, state, { showInvitationsFilter: action.isShow } );
  return newState;
}

function newSharingListsLoading( state: IinvitationsStateType, action: any ): IinvitationsStateType {
  return {
    ...state,
    isNewSharingListsLoading: action.isLoading,
  };
}

function acceptSharingListsLoading( state: IinvitationsStateType, action: any ): IinvitationsStateType {
  return {
    ...state,
    isAcceptedSharingListsLoading: action.isLoading,
  };
}
