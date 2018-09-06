export default interface IGoogleMapComponentContainerProps {
  markers: any;
  isAddMarker: boolean;

  addPoints: ( propsPoints: any ) => ( dispatch: Function ) => void;
  permissionToAddMarker: ( isAddMarker: boolean ) => ( dispatch: Function ) => void;
}