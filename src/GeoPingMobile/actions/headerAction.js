"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const header_1 = require("../constantsForReducer/header");
exports.editRoute = (routeKey) => (dispatch) => {
    dispatch(editRouteAction(routeKey));
};
/* Action */
function editRouteAction(routeKey) {
    return { type: header_1.EDIT_ROUTE_HEADER_LINK, routeKey };
}
