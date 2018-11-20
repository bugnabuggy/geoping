"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allUsers_1 = require("../constantsForReducer/allUsers");
exports.changeFilters = (fieldName, value) => (dispatch) => {
    dispatch(changeFiltersAction(fieldName, value));
};
/* Actions */
function changeFiltersAction(fieldName, value) {
    return Object.assign({ type: allUsers_1.CHANGE_FILTERS_ALL_USERS }, { fieldName, value });
}
