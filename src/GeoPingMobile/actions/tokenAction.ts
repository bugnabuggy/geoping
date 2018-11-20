import IDispatchFunction from '../types/functionsTypes/dispatchFunction';
import { windowBlocking } from './windowAction';

export const verifyToken = () => ( dispatch: IDispatchFunction ) => {
  windowBlocking( true )( dispatch );
};