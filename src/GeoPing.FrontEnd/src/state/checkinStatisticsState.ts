import ICheckinStatisticsStateType from '../types/stateTypes/checkinStatisticsStateType';

export const checkinStatisticsState: ICheckinStatisticsStateType = {
  selectList: [],
  selectUser: [],
  selectPeriod: {
    from: '',
    to: '',
  },
  isCheckInStatistics: false,
};