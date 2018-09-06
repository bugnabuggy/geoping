import { EDIT_ROUTE_HEADER_LINK } from '../DTO/constantsForReducer/header';

export const editRoute = (routeKey: string) => (dispatch: Function) => {
  dispatch(editRouteAction(routeKey));
};

/* Action */
function editRouteAction(routeKey: string): Object {
  return {type: EDIT_ROUTE_HEADER_LINK, routeKey};
}