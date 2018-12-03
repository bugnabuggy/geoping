import React from 'react';
import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderComponent } from "../components/headerComponent";
import { getOrientation } from "../services/helper";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import IGeoPoint from "../DTO/geoPointDTO";
import RNPickerSelect from 'react-native-picker-select';
import { loadCheckLists } from "../actions/myCheckListsAction";
import { ListPoints } from "../components/checkInComponents/listPoints";
import { changeMovingGeoPoint, getGeoLocation, getListPoints, selectPoint } from "../actions/googleMapAction";
import { WrapperMapComponent } from "../components/wrapperMapComponent";

type Props = {
  navigation: any;
  state: IinitialStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
  loadCheckLists: () => ( dispatch: IDispatchFunction ) => void;
  getListPoints: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  orientation: string;
  checkLists: Array<{ label: string, value: string }>;
  items: Array<{ label: string, value: string }>;
};

class CheckInScreen extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
    this.state = {
      orientation: getOrientation (),
      checkLists: [],
      items: [
        {
          label: 'Red',
          value: 'red',
        },
        {
          label: 'Orange',
          value: 'orange',
        },
        {
          label: 'Blue',
          value: 'blue',
        },
      ],
    };
    Dimensions.addEventListener ( 'change', () => {
      this.setState ( {
        orientation: getOrientation (),
      } );
    } );
  }

  componentDidMount(): void {
    this.props.loadCheckLists ();
  }

  componentDidUpdate( prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any ): void {

  }

  getOptionsCheckList = () => {
    return this.props.state.checkList.checkLists.map ( item => {
      return {
        label: item.name,
        value: item.id,
      };
    } );
  };

  render() {
    return (
      <View>
        <HeaderComponent
          navigation={this.props.navigation}
          title={'Check In'}
        />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
            flexDirection: this.state.orientation === 'portrait' ? 'column' : 'row',
            marginBottom: 30,
          }}
        >
          <WrapperMapComponent
            state={this.props.state}
            orientation={this.state.orientation}

            selectPoint={this.props.selectPoint}
            changeMovingGeoPoint={this.props.changeMovingGeoPoint}
            getGeoLocation={this.props.getGeoLocation}
          />
          <Text>Select List</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Select a list...',
              value: null,
            }}
            items={this.getOptionsCheckList ()}
            onValueChange={( value ) => {
              console.log ( 'value', value );
              this.props.getListPoints ( value );
            }}
          />
          <Text>Select Point</Text>
          <ListPoints
            listPoints={this.props.state.googleMap.geoPoints}

            getListPoints={this.props.getListPoints}
            selectPoint={this.props.selectPoint}
          />
          <View style={styles.checkInInfoContainer}>
            <View style={styles.buttonContainer}>
              <Button title="Check in" onPress={() => {
              }}/>
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
                <Text style={{ color: '#ff2e11' }}>Diff: 5</Text>
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
      loadCheckLists,
      getListPoints,
      selectPoint,
      changeMovingGeoPoint,
      getGeoLocation,
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
} );