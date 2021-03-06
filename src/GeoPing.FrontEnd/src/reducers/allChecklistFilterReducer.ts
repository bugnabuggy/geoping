import IAllChecklistFilterStateType from '../types/stateTypes/allChecklistFilterStateType';
import { allChecklistFilterState } from '../state/allChecklistFilterState';
import { ALL_CHECKLIST_FILTER_CHANGE } from '../constantsForReducer/allChecklist';

export default function allChecklistFilterReducer(
  state: IAllChecklistFilterStateType = allChecklistFilterState,
  action: any
) {
  const reduceObject: any = {
    [ALL_CHECKLIST_FILTER_CHANGE]: allChecklistFilterChange
  };

  return reduceObject.hasOwnProperty( action.type ) ? reduceObject[action.type]( state, action ) : state;
}

function allChecklistFilterChange( state: IAllChecklistFilterStateType, action: any) {
  const newState: IAllChecklistFilterStateType = Object.assign({}, state, {
    [action.field]: action.value,
  });
  return newState;
}