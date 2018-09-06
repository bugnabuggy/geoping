import ILocationProps from '../locationProps';

export default interface IHeaderComponentContainerProps {
  location: ILocationProps;
  routeKey: string;

  editRoute: ( routeKey: string ) => ( dispatch: Function ) => void;
}