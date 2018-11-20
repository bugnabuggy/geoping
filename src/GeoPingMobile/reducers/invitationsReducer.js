"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filters_1 = require("../constantsForReducer/filters");
const invitationsState_1 = require("../state/invitationsState");
function invitationsReducer(state = invitationsState_1.invitationsState, action) {
    const reduceObject = {
        [filters_1.FILTER_INVITATIONS_LIST]: filterInvitations,
        [filters_1.CLOSE_FILTER_INVITATIONS]: closeFilterInvitations
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = invitationsReducer;
function filterInvitations(state, action) {
    const newState = Object.assign({}, state, { showInvitationsFilter: action.isShow });
    return newState;
}
function closeFilterInvitations(state, action) {
    const newState = Object.assign({}, state, { showInvitationsFilter: action.isShow });
    return newState;
}
