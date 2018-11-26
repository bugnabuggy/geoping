"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userStateType_1 = require("../types/stateTypes/userStateType");
exports.userState = {
    userName: '',
    avatar: '',
    authorized: false,
    roleUser: userStateType_1.ERoleUser.User,
    redirectDashboard: false,
    token: '',
};
