"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const windowState_1 = require("../state/windowState");
const window_1 = require("../constantsForReducer/window");
function windowReducer(state = windowState_1.windowState, action) {
    const reduceObject = {
        [window_1.BLOCKING_WINDOW_DURING_AN_ACTION]: blockingWindow,
        [window_1.REDIRECT_ON_SIGN_IN_FORM]: redirectLoginForm,
        [window_1.CONFIRM_EMAIL]: confirmEmail,
        [window_1.REDIRECT]: redirect,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = windowReducer;
function blockingWindow(state, action) {
    return Object.assign({}, state, { isBlockingWindow: action.isBlocking });
}
function redirectLoginForm(state, action) {
    return Object.assign({}, state, { redirectOnSignInForm: action.isRedirect });
}
function confirmEmail(state, action) {
    return Object.assign({}, state, { isConfirmEmail: true });
}
function redirect(state, action) {
    return Object.assign({}, state, { redirect: action.redirect });
}
