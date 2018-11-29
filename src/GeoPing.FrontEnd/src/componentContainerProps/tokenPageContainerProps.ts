import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ITokenPageContainerProps {
  match: any;
  userId: string;

  verifyToken: ( token: string, userId: string ) => ( dispatch: IDispatchFunction ) => void;
}