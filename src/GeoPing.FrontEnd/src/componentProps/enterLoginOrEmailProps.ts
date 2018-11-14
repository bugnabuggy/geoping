import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface IEnterLoginOrEmailProps {
  sendLoginOrEmail: ( loginOrEmail: string ) => ( dispatch: IDispatchFunction ) => void;
}