"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userState_1 = require("../state/userState");
const user_1 = require("../constantsForReducer/user");
const profile_1 = require("../constantsForReducer/profile");
function userReducer(state = userState_1.userState, action) {
    const reduceObject = {
        [user_1.USER_AUTHORIZATION]: userAuthorization,
        [user_1.USER_SIGN_OUT]: sigOutUser,
        [user_1.USER_AUTHORIZATION_TEST_PERIOD]: userAuthorizationTestPeriod,
        [user_1.REDIRECT_DASHBOARD_FOR_LOGIN]: redirect,
        [user_1.LOAD_USER_NAME]: loadUserData,
        [profile_1.SAVE_AVATAR]: saveAvatar,
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = userReducer;
function userAuthorization(state, action) {
    return Object.assign({}, state, { authorized: action.authorization });
}
function sigOutUser(state, action) {
    return Object.assign({}, state, { authorized: false });
}
function userAuthorizationTestPeriod(state, action) {
    return Object.assign({}, state, { authorized: action.authorization });
}
function redirect(state, action) {
    return Object.assign({}, state, { redirectDashboard: action.isRedirect });
}
function loadUserData(state, action) {
    return Object.assign({}, state, action.userData);
}
function saveAvatar(state, action) {
    return Object.assign({}, state, { avatar: action.avatar });
}
