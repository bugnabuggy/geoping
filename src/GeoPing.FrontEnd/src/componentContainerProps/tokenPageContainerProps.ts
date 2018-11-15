import IDispatchFunction from '../types/functionsTypes/dispatchFunction';

export default interface ITokenPageContainerProps {
  verifyToken: () => ( dispatch: IDispatchFunction ) => void;
}