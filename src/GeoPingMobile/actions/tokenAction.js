"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const windowAction_1 = require("./windowAction");
exports.verifyToken = () => (dispatch) => {
    windowAction_1.windowBlocking(true)(dispatch);
};
