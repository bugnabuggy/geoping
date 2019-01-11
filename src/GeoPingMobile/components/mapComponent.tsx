import React from 'react';
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker } from 'react-native-maps';
import IGeoPoint from "../DTO/geoPointDTO";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { defaultMarker } from "../constants/defaultMarker";
import { v4 as uuidV4 } from 'uuid';
import { IGoogleMapStateType } from "../types/stateTypes/googleMapStateType";
import ICheckinStateType from "../types/stateTypes/checkinStateType";
import { geoCodePosition } from "../services/httpMapService";

type Props = {
  googleMap: IGoogleMapStateType;
  myPosition: boolean;
  checkin: ICheckinStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
  updateGeoPoint: ( marker: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  centerMap: {
    latitude: number;
    longitude: number;
  };
  error: string;
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
    };
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
          //watchPosition
          navigator.geolocation.getCurrentPosition (
            ( position ) => {
              this.props.getGeoLocation ( position.coords.latitude, position.coords.longitude );
            },
            ( error ) => {
              console.log ( 'error', error );
              this.setState ( {
                error: error.message,
              } )
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300 }
          );
        } else {
          console.log ( 'response PERMISSIONS', granted );
        }
      } )
      .catch ( ( error: any ) => {
        console.log ( 'error PERMISSIONS', error );
      } )
  }

  setColorMarker = ( marker ) => {
    let color: string = 'red';
    if ( this.props.googleMap.selectedGeoPoint.idForMap === marker.idForMap ) {
      color = this.props.googleMap.selectedGeoPoint.color;
    } else {
      color = marker.color;
    }//
    return color;
  };

  _renderMarker = () => {
    return this.props.googleMap.geoPoints.map ( marker => {
      const latlang = {
        latitude: marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ? this.props.googleMap.selectedGeoPoint.lat : marker.lat,
        longitude: marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ? this.props.googleMap.selectedGeoPoint.lng : marker.lng,
      };
      const colorMarker: string = this.setColorMarker ( marker );
      const id: string = uuidV4 ();
      return (
        <React.Fragment key={id}>
          <React.Fragment>
            <Marker
              key={id}
              coordinate={latlang}
              title={marker.name}
              pinColor={colorMarker}
              draggable={marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap}
              description={marker.description}
              onPress={() => {
                if ( this.props.googleMap.selectedGeoPoint.idForMap && marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ) {
                  this.props.selectPoint ( defaultMarker );
                } else {//if ( !this.props.googleMap.selectedGeoPoint.idForMap ) {//
                  this.props.selectPoint ( marker );
                }
              }}
              onDragEnd={( e ) => {
                geoCodePosition ( Number ( e.nativeEvent.coordinate.latitude ), Number ( e.nativeEvent.coordinate.longitude ) )
                  .then ( ( response: any ) => {
                    const point: IGeoPoint = {
                      ...marker,
                      lng: e.nativeEvent.coordinate.longitude,
                      lat: e.nativeEvent.coordinate.latitude,
                      description: response[0].formattedAddress,
                    };
                    // console.log('response', response[0].formattedAddress);
                    this.props.updateGeoPoint ( point );
                  } )
                  .catch ( ( error: any ) => {
                    console.log ( 'error --', error );
                  } );
              }}
            />
            < Circle
              center={latlang}
              radius={marker.idForMap === this.props.googleMap.selectedGeoPoint.idForMap ? this.props.googleMap.selectedGeoPoint.radius : marker.radius}
              fillColor="rgba(237, 9, 17, 0.3)"
              strokeColor="rgb(237, 9, 17)"
            />
          </React.Fragment>
          {/*//   )*/}
          {/*// }*/}
        </React.Fragment>
      );
    } );
  };
  _renderMyPositionMarker = () => {
    const latlang = {
      latitude: this.props.googleMap.position.lat,
      longitude: this.props.googleMap.position.lng,
    };
    return (
      <Marker
        coordinate={latlang}
        title="Me"
        image={require ( '../assets/images/pin-96.png' )}
      />
    )
  };

  render() {
    return (
      <View>
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
              {this.props.myPosition && this.props.googleMap.position.isSuccess &&
              this.props.checkin.isCheckIn &&
              this._renderMyPositionMarker ()
              }
            </MapView>
          )
          :
          (
            <View style={{
              height: '100%',
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
