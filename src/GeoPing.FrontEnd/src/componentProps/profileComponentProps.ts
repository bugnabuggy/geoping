import IProfileStateType from '../types/stateTypes/profileStateType';
import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import IWindowStateType from '../types/stateTypes/windowStateType';
import IPaymentStateType from '../types/stateTypes/paymentStateType';

export  interface IProfileComponentProps {
  profileState: IProfileStateType;
  isShowModal: boolean;
  window: IWindowStateType;
  payment: IPaymentStateType;

  loadProfileData: (idUser: string) => (dispatch: IDispatchFunction ) => void;
  updateProfileData: (data: any) => (dispatch: IDispatchFunction ) => void;
  showModalChangePassword: () => (dispatch: IDispatchFunction ) => void;
  closeModalChangePassword: () => (dispatch: IDispatchFunction ) => void;
  changePassword: (password: string, newPassword: string ) => (dispatch: IDispatchFunction ) => void;
  upgradeAccount?: () => (dispatch: IDispatchFunction ) => void;
  saveAvatar: ( ) => void;
  paymentYandexCheckout: ( commoditiesId: string ) => ( dispatch: IDispatchFunction ) => void;
  selectCommodities: ( commodityId: string ) => ( dispatch: IDispatchFunction ) => void;
  paymentPayPalCheckout: ( commoditiesId: string ) => ( dispatch: IDispatchFunction ) => void;
}