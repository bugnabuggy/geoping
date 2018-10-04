import { EDIT_ROUTE_HEADER_LINK } from '../constantsForReducer/header';
import IDispatchFunction from '../DTO/types/dispatchFunction';

export const editRoute = (routeKey: string) => (dispatch: IDispatchFunction) => {
  dispatch(editRouteAction(routeKey));
};

/* Action */
function editRouteAction(routeKey: string): Object {
  return {type: EDIT_ROUTE_HEADER_LINK, routeKey};
}