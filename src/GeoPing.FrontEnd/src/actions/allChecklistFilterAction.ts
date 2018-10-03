import IDispatchFunction from '../DTO/types/dispatchFunction';
import { ALL_CHECKLIST_FILTER_CHANGE } from '../DTO/constantsForReducer/allChecklist';

export const changeFields = ( field: string, value: string ) => ( dispatch: IDispatchFunction ) => {
  dispatch( changeFieldsAction( field, value ) );
};

/* Actions */

function changeFieldsAction( field: string, value: string ): Object {
  return { type: ALL_CHECKLIST_FILTER_CHANGE, ...{ field, value } };
}