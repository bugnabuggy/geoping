import IDispatchFunction from '../DTO/types/dispatchFunction';
import { CHANGE_FILTERS_ALL_USERS } from '../constantsForReducer/allUsers';

export const changeFilters = ( fieldName: string, value: any ) => ( dispatch: IDispatchFunction ) => {
  dispatch(changeFiltersAction(fieldName, value));
};

/* Actions */

function changeFiltersAction( fieldName: string, value: any): Object {
  return { type: CHANGE_FILTERS_ALL_USERS, ...{ fieldName, value } };
}