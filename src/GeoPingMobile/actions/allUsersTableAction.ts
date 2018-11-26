import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { CHANGE_EMPLOYEE } from '../constantsForReducer/allUsers';

export const changeEmployee = ( idRow: number, value: boolean ) => ( dispatch: IDispatchFunction ) => {
  dispatch ( changeEmployeeAction ( idRow, value ) );
};

function changeEmployeeAction( idRow: number, value: boolean ): Object {
  return { type: CHANGE_EMPLOYEE, ...{ idRow, value } };
}