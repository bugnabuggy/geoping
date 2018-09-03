import ICheckinStateType from '../DTO/types/stateTypes/checkinStateType';
import { checkinState } from '../state/checkinState';

export default function checkinReducer(state: ICheckinStateType = checkinState, action: any) {
  const reduceObject: any = {

  };

  return reduceObject.hasOwnProperty(action.type) ? reduceObject[action.type](state, action) : state;
}