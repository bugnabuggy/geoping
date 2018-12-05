import ICheckinStateType from '../types/stateTypes/checkinStateType';
import { ETimer } from '../enums/timerEnum';

export const checkinState: ICheckinStateType = {
  selectList: [],
  difference: null,
  isCheckIn: false,
  selectedListId: '',
  isListLoading: false,
  isPointLoading: false,
  isStartTimer: ETimer.None,
  countTimer: 0,
};
