import React from 'react';
import { MapComponent } from "./mapComponent";
import { Dimensions, View } from "react-native";
import IinitialStateType from "../types/stateTypes/initialStateType";
import IGeoPoint from "../DTO/geoPointDTO";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { getOrientation, getWindowWidthAndHeight } from "../services/helper";

type Props = {
  state: IinitialStateType;
  orientation: string;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  windowHeight: number;
  windowWidth: number
};
export class WrapperMapComponent extends React.Component<Props, State>{
  constructor(props) {
    super(props);

    this.state = {
      ...this.getWindowSize(),
    };
  }

  componentDidUpdate( prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any ): void {
    if ( prevProps.orientation !== this.props.orientation ) {
      this.setState({
        ...this.getWindowSize(),
      })
    }
  }

  getWindowSize = () => {
    const windowSize: any = {
      ...getWindowWidthAndHeight(),
    };
    return {
      windowHeight: windowSize.height,
      windowWidth: windowSize.width,
    };
  };

  render() {
    const mapSize: number = this.props.orientation === 'portrait' ?
      ( this.state.windowHeight / 2 )
      :
      ( this.state.windowWidth / 2.1 );
    const mapStileSize = {
      [this.props.orientation === 'portrait' ? 'height' : 'width'] : mapSize,
    };
    return(
      <View style={{ ...mapStileSize, padding: 3 }}>
        <MapComponent
          googleMap={this.props.state.googleMap}

          selectPoint={this.props.selectPoint}
          changeMovingGeoPoint={this.props.changeMovingGeoPoint}
          getGeoLocation={this.props.getGeoLocation}
        />
      </View>
    );
  }
}