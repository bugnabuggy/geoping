import React from 'react';
import { Dimensions, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker } from 'react-native-maps';
import IGeoPoint from "../DTO/geoPointDTO";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { defaultMarker } from "../constants/defaultMarker";
import { v4 as uuidV4 } from 'uuid';
import { IGoogleMapStateType } from "../types/stateTypes/googleMapStateType";
import { EnumStatusMarker } from "../enums/statusMarker";

type Props = {
  googleMap: IGoogleMapStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  centerMap: {
    latitude: number;
    longitude: number;
  };
  error: string;
  orientation: string;
};

export class MapComponent extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
    this.state = {
      centerMap: {
        latitude: 0,
        longitude: 0,
      },
      error: '',
      orientation: this.getOrientation (),
    };
    Dimensions.addEventListener ( 'change', () => {
      this.setState ( {
        orientation: this.getOrientation (),
      } );
    } );
  }

  componentDidMount(): void {
    PermissionsAndroid.request (
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        'title': 'Fine location permission',
        'message': 'GeoPing needs access to your location so you can mark the points'
      }
    )
      .then ( ( granted: any ) => {
        if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
          navigator.geolocation.getCurrentPosition (
            ( position ) => {
              this.props.getGeoLocation( position.coords.latitude, position.coords.longitude );
            },
            ( error ) => {
              console.log ( 'error', error );
              this.setState ( {
                error: error.message,
              } )
            },
            { enableHighAccuracy: Platform.OS != 'android', timeout: 2000, maximumAge: 2000 }
          );
        } else {
          console.log ( 'response PERMISSIONS', granted );
        }
      } )
      .catch ( ( error: any ) => {
        console.log ( 'error PERMISSIONS', error );
      } )
  }

  getOrientation = () => {
    if ( Dimensions.get ( 'window' ).width < Dimensions.get ( 'window' ).height ) {
      return 'portrait';
    } else {
      return 'landscape';
    }
  };

  _renderMarker = () => {
    return this.props.googleMap.geoPoints.map ( marker => {
      const latlang = {
        latitude: marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ? this.props.googleMap.selectedGeoPoint.lat : marker.lat,
        longitude: marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ? this.props.googleMap.selectedGeoPoint.lng : marker.lng,
      };
      const colorMarker: string =
        this.props.googleMap.statusMarker === EnumStatusMarker.New ?
          '#1be53d'
          :
          this.props.googleMap.statusMarker === EnumStatusMarker.Edit ?
            '#bfb914'
            :
            '';
      return (
        <React.Fragment key={marker.id}>
          {marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ?
            ( <React.Fragment>
                <Marker
                  key={uuidV4 ()}
                  coordinate={latlang}
                  title={this.props.googleMap.selectedGeoPoint.name}
                  description={this.props.googleMap.selectedGeoPoint.description}
                  pinColor={colorMarker}
                  draggable={true}
                  onDragEnd={( e ) => {
                    const coords: { lat: number, lng: number } = {
                      lng: e.nativeEvent.coordinate.longitude,
                      lat: e.nativeEvent.coordinate.latitude,
                    };
                    this.props.changeMovingGeoPoint ( coords );
                  }}
                  // onDrag={( e ) => {
                  //   const coords: { lat: number, lng: number } = {
                  //     lng: e.nativeEvent.coordinate.longitude,
                  //     lat: e.nativeEvent.coordinate.latitude,
                  //   };
                  //   console.log ( 'e.nativeEvent.coordinate', e.nativeEvent.coordinate );
                  //   this.props.changeMovingGeoPoint ( coords );
                  // }}
                />
                < Circle
                  center={latlang}
                  radius={this.props.googleMap.selectedGeoPoint.radius}
                  fillColor="rgba(237, 9, 17, 0.3)"
                  strokeColor="rgb(237, 9, 17)"
                />
              </React.Fragment>
            )
            :
            ( <React.Fragment>
                <Marker
                  coordinate={latlang}
                  title={marker.name}
                  description={marker.description}
                  onPress={() => {
                    if ( this.props.googleMap.selectedGeoPoint.idForMap && marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ) {
                      this.props.selectPoint ( defaultMarker );
                    } else if ( !this.props.googleMap.selectedGeoPoint.idForMap ) {
                      this.props.selectPoint ( marker );
                    }
                  }}
                />
                < Circle
                  center={latlang}
                  radius={marker.radius}
                  fillColor="rgba(237, 9, 17, 0.3)"
                  strokeColor="rgb(237, 9, 17)"
                />
              </React.Fragment>
            )
          }
        </React.Fragment>
      );
    } );
  };

  render() {
    const windowHeight = Dimensions.get ( 'window' ).height;
    return (
      <View style={{ height: ( windowHeight / 2 ) }}>
        {this.props.googleMap.position.isSuccess && !this.state.error ?
          (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: this.props.googleMap.position.lat,
                longitude: this.props.googleMap.position.lng,
                latitudeDelta: 0.0243,
                longitudeDelta: 0.0234,
              }}
            >
              {this._renderMarker ()}
            </MapView>
          )
          :
          (
            <View style={{
              height: ( windowHeight / 2 ),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={styles.textError}>
                {this.state.error}
              </Text>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  map: {
    height: '100%',
  },
  textError: {
    fontSize: 30,
  },
} );
