"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profileState_1 = require("../state/profileState");
const profile_1 = require("../constantsForReducer/profile");
function profileReducer(state = profileState_1.profileState, action) {
    const reduceObject = {
        [profile_1.LOAD_INFO]: loadProfileData,
        [profile_1.SHOW_MODAL_WINDOW]: showModalChangePassword,
        [profile_1.CLOSE_MODAL_WINDOW]: closeModalChangePassword
    };
    return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}
exports.default = profileReducer;
function loadProfileData(state, action) {
    return Object.assign({}, state, action.profile, { 
        // birthday: new Date(action.profile.birthday),
        isLoaded: true });
}
function showModalChangePassword(state, action) {
    const newState = Object.assign({}, state, { isShowModal: action.isShow });
    return newState;
}
function closeModalChangePassword(state, action) {
    const newState = Object.assign({}, state, { isShowModal: action.isShow });
    return newState;
}
