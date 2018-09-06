export default interface IHeaderComponentProps {
  path: string;
  routeKey: string;

  editRouteAction: ( routeKey: string ) => ( dispatch: Function ) => void;
}