"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allChecklist_1 = require("../constantsForReducer/allChecklist");
exports.changeFields = (field, value) => (dispatch) => {
    dispatch(changeFieldsAction(field, value));
};
/* Actions */
function changeFieldsAction(field, value) {
    return Object.assign({ type: allChecklist_1.ALL_CHECKLIST_FILTER_CHANGE }, { field, value });
}
