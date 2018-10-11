import IDispatchFunction from '../DTO/types/dispatchFunction';

export default interface IAboutComponentContainerProps {
  useTestPeriod: ( email: string, password: string ) => ( dispatch: IDispatchFunction ) => void;
  getVirtualDatabase: () => ( dispatch: IDispatchFunction ) => void;
}