"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const window_1 = require("../constantsForReducer/window");
const react_native_1 = require("react-native");
exports.windowBlocking = (isBlocking) => (dispatch) => {
    dispatch(windowBlockingAction(isBlocking));
};
exports.redirectOnSignInForm = (redirect) => (dispatch) => {
    react_native_1.AsyncStorage.removeItem('token');
    dispatch(redirectOnSignInFormAction(redirect));
};
exports.isRedirect = (redirect) => (dispatch) => {
    console.log('redirect', redirect);
    dispatch(isRedirectAction(redirect));
};
/* Actions */
function windowBlockingAction(isBlocking) {
    return { type: window_1.BLOCKING_WINDOW_DURING_AN_ACTION, isBlocking };
}
exports.windowBlockingAction = windowBlockingAction;
function redirectOnSignInFormAction(redirect) {
    return { type: window_1.REDIRECT_ON_SIGN_IN_FORM, redirect };
}
exports.redirectOnSignInFormAction = redirectOnSignInFormAction;
function isRedirectAction(redirect) {
    return { type: window_1.REDIRECT, redirect };
}
