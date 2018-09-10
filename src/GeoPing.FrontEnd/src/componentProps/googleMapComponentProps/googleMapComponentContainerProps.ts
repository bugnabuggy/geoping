import IDispatchFunction from '../../DTO/types/dispatchFunction';

export default interface IGoogleMapComponentContainerProps {
  markers: any;
  isAddMarker: boolean;

  addPoints: ( propsPoints: any ) => ( dispatch: IDispatchFunction ) => void;
  permissionToAddMarker: ( isAddMarker: boolean ) => ( dispatch: IDispatchFunction ) => void;
}