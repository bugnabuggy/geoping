"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allUsers_1 = require("../constantsForReducer/allUsers");
exports.changeEmployee = (idRow, value) => (dispatch) => {
    dispatch(changeEmployeeAction(idRow, value));
};
function changeEmployeeAction(idRow, value) {
    return Object.assign({ type: allUsers_1.CHANGE_EMPLOYEE }, { idRow, value });
}
