import React from 'react';
import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Alert, Button, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderComponent } from "../components/headerComponent";
import { getOrientation } from "../services/helper";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import IGeoPoint from "../DTO/geoPointDTO";
import RNPickerSelect from 'react-native-picker-select';
import { ListPoints } from "../components/checkInComponents/listPoints";
import {
  addDistance,
  changeMovingGeoPoint,
  getGeoLocation,
  getListPoints,
  selectPoint,
  updateGeoPoint
} from "../actions/googleMapAction";
import { WrapperMapComponent } from "../components/wrapperMapComponent";
import { selectCheckList } from "../actions/checkListAction";
import * as haversine from 'haversine';
import { checkIn, checkinFlag, loadLists, loadPoints } from "../actions/checkinAction";
import { ICheckInDTO } from "../DTO/checkInDTO";

type Props = {
  navigation: any;
  state: IinitialStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
  // loadCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  loadLists: () => ( dispatch: IDispatchFunction ) => void;
  getListPoints: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectCheckList: ( checkListId: string ) => ( dispatch: IDispatchFunction ) => void;
  checkIn: ( idPoint: string, data: ICheckInDTO ) => ( dispatch: IDispatchFunction ) => void;
  addDistance: ( distance: number ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  checkinFlag: ( isCheckin: boolean ) => ( dispatch: IDispatchFunction ) => void;
  updateGeoPoint: ( marker: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  orientation: string;
  enableScrollViewScroll: boolean;
  isCheckInButtonDisable: boolean;
  buttonColor: string;
};

class CheckInScreen extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
    this.state = {
      orientation: getOrientation (),
      enableScrollViewScroll: true,
      isCheckInButtonDisable: false,
      buttonColor: '#2f36ff',
    };
    // '#24d029'
    Dimensions.addEventListener ( 'change', () => {
      this.setState ( {
        orientation: getOrientation (),
      } );
    } );
    this.props.checkinFlag ( true );
  }

  componentDidMount(): void {
    this.props.loadLists ();
  }

  componentDidUpdate( prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any ): void {
    if ( this.props.state.googleMap.selectedGeoPoint.id && this.props.state.googleMap.position.isSuccess &&
      prevProps.state.googleMap.selectedGeoPoint.id !== this.props.state.googleMap.selectedGeoPoint.id ) {
      const start = {
        latitude: this.props.state.googleMap.selectedGeoPoint.lat,
        longitude: this.props.state.googleMap.selectedGeoPoint.lng,
      };
      const end = {
        latitude: this.props.state.googleMap.position.lat,
        longitude: this.props.state.googleMap.position.lng,
      };
      this.props.addDistance ( Math.round ( haversine.default ( start, end, { unit: 'meter' } ) ) );
    }
  }

  componentWillUnmount(): void {
    this.props.checkinFlag ( false );
  }

  // setStateButton = () => {
  //   if ( !!this.props.state.checkList.selectedGeoList.id ) {
  //     this.setState ( {
  //       isCheckInButtonDisable: true,
  //     } );
  //     console.log ( this.props.state.checkList.selectedGeoList.id );
  //   }
  // };
  //
  // setButtonDisable = () => {
  //   if ( !!this.props.state.checkList.selectedGeoList.id && !!this.props.state.googleMap.selectedGeoPoint.id ) {
  //     return false;
  //   } else //if ( !!!this.props.state.checkList.selectedGeoList.id ) {
  //   if ( this.props.state.googleMap.checkInGeoPoint.find ( check => check.pointId === this.props.state.googleMap.selectedGeoPoint.id ) ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  setButtonColor = () => {
    let color: string = '#2f36ff';
    let isDisable: boolean = true;
    // console.log ( this.props.state.checkin.difference );
    // if (!!!this.props.state.checkList.selectedGeoList.id) {
    //   color = '#2f36ff';
    // } else
    if ( !!this.props.state.checkList.selectedGeoList.id && !!this.props.state.googleMap.selectedGeoPoint.id ) {
      if ( this.props.state.googleMap.checkInGeoPoint.find ( check => check.pointId === this.props.state.googleMap.selectedGeoPoint.id ) ||
        this.props.state.googleMap.selectedGeoPoint.radius >= this.props.state.checkin.difference ) {
        color = '#418c45';
        isDisable = false;
      } else {
        // color = '#d7c626';
        color = 'red';
        isDisable = false;
      }
    } else if ( !!!this.props.state.checkList.selectedGeoList.id ) {
      isDisable = false;
    }
//     return color;
    return {
      isDisable: isDisable,
      color: color,
    };//
  };

  getOptionsCheckList = () => {
    return this.props.state.checkList.checkInLists.map ( item => {
      return {
        label: item.name,
        value: item.id,
      };
    } );
  };

  handlePressCheckIn = () => {
    if ( !!!this.props.state.checkList.selectedGeoList.id ) {
      const data: ICheckInDTO = {
        // DeviceId: '',
        Distance: this.props.state.checkin.difference,
        // Ip: '',
        Latitude: this.props.state.googleMap.position.lat,
        Longitude: this.props.state.googleMap.position.lng,
        Description: this.props.state.googleMap.selectedGeoPoint.description,
        // UserAgent: null,
      };
      this.props.checkIn ( null, data );
    } else if ( !!this.props.state.googleMap.selectedGeoPoint.id ) {
      if ( this.props.state.googleMap.selectedGeoPoint.radius >= this.props.state.checkin.difference ) {
        const data: ICheckInDTO = {
          // DeviceId: '',
          Distance: this.props.state.checkin.difference,
          // Ip: '',
          Latitude: this.props.state.googleMap.selectedGeoPoint.lat,
          Longitude: this.props.state.googleMap.selectedGeoPoint.lng,
          Description: this.props.state.googleMap.selectedGeoPoint.description,
          // UserAgent: null,
        };
        this.props.checkIn ( this.props.state.googleMap.selectedGeoPoint.id, data );
      } else {
        Alert.alert ( 'Need to get closer to the point' );
      }
    } else {
      Alert.alert ( 'Need select point' );
    }
  };
  onEnableScroll = ( value: boolean ) => {
    this.setState ( {
      enableScrollViewScroll: value,
    } );
  };

  render() {
    const stateButton: { isDisable: boolean, color: string } = this.setButtonColor ();
    return (
      <View>
        <HeaderComponent
          navigation={this.props.navigation}
          title={'Check In'}
        />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 70,
            flexDirection: this.state.orientation === 'portrait' ? 'column' : 'row',
            marginBottom: 30,
          }}
          scrollEnabled={this.state.enableScrollViewScroll}
        >
          <WrapperMapComponent
            state={this.props.state}
            orientation={this.state.orientation}
            myPosition={true}

            selectPoint={this.props.selectPoint}
            changeMovingGeoPoint={this.props.changeMovingGeoPoint}
            getGeoLocation={this.props.getGeoLocation}
            updateGeoPoint={this.props.updateGeoPoint}
          />
          <Text style={styles.headerText}>Select List</Text>
          <RNPickerSelect
            placeholder={{
              label: '- NONE -',
              value: null,
            }}
            items={this.getOptionsCheckList ()}
            onValueChange={( value ) => {
              console.log ( 'value', value );
              this.props.selectCheckList ( value );
              // this.props.getListPoints ( value );
              this.props.loadPoints ( value );
            }}
          />
          {!!this.props.state.checkList.selectedGeoList.id &&
          (
            <React.Fragment>
              <Text style={styles.headerText}>Select Point</Text>
              <ListPoints
                googleMap={this.props.state.googleMap}
                enableScrollViewScroll={this.state.enableScrollViewScroll}
                checkin={this.props.state.checkin}

                getListPoints={this.props.getListPoints}
                selectPoint={this.props.selectPoint}
                onEnableScroll={this.onEnableScroll}
              />
            </React.Fragment>
          )
          }
          <View style={styles.checkInInfoContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title="Check in"
                disabled={stateButton.isDisable}
                color={stateButton.color}
                onPress={this.handlePressCheckIn}
              />
            </View>
            <View style={{ marginLeft: 5, }}>
              <Text>Current coordinates:</Text>
              <View style={styles.infoContainer}>
                <Text
                  style={styles.infoText}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  lat: {this.props.state.googleMap.position.lat}
                </Text>
                <Text
                  style={styles.infoText}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  long: {this.props.state.googleMap.position.lng}
                </Text>
                <Text style={{ color: '#ff2e11' }}>
                  Diff: {this.props.state.checkin.difference}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ( state: IinitialStateType ) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = ( dispatch: any ) =>
  bindActionCreators (
    {
      // loadCheckLists,
      loadLists,
      getListPoints,
      selectPoint,
      changeMovingGeoPoint,
      getGeoLocation,
      selectCheckList,
      checkIn,
      addDistance,
      loadPoints,
      checkinFlag,
      updateGeoPoint,
    },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( CheckInScreen );

const styles = StyleSheet.create ( {
  buttonContainer: {
    marginTop: 10,
    marginLeft: 5,
    width: 100,
  },
  checkInInfoContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoText: {
    width: 100,
  },
  headerText: {
    marginLeft: 10,
  },
} );