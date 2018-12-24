import React from 'react';
import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, ScrollView, Text, View } from "react-native";
import { HeaderComponent } from "../components/headerComponent";
import { WrapperMapComponent } from "../components/wrapperMapComponent";
import { getOrientation } from "../services/helper";
import { changeMovingGeoPoint, getGeoLocation, selectPoint, updateGeoPoint } from "../actions/googleMapAction";
import IGeoPoint from "../DTO/geoPointDTO";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { DatePickerComponent } from "../components/datePickerComponent";
import RNPickerSelect from "react-native-picker-select";

type Props = {
  navigation: any;
  state: IinitialStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
  updateGeoPoint: ( marker: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  orientation: string;
};

class CheckInStatisticsScreen extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
    this.state = {
      orientation: getOrientation (),
    };
    Dimensions.addEventListener ( 'change', () => {
      this.setState ( {
        orientation: getOrientation (),
      } );
    } );
  }

  getOptionsCheckList = () => {
    return this.props.state.checkList.checkInLists.map ( item => {
      return {
        label: item.name,
        value: item.id,
      };
    } );
  };

  render() {
    return (
      <React.Fragment>
        <View>
          <HeaderComponent
            navigation={this.props.navigation}
            title={'Check sn statistics'}
          />
          <ScrollView>
            <WrapperMapComponent
              state={this.props.state}
              orientation={this.state.orientation}
              myPosition={false}

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
                // this.props.selectCheckList ( value );
                // // this.props.getListPoints ( value );
                // this.props.loadPoints ( value );
              }}
            />
            <Text style={styles.headerText}>Select User</Text>
            <RNPickerSelect
              placeholder={{
                label: '- NONE -',
                value: null,
              }}
              items={this.getOptionsCheckList ()}
              onValueChange={( value ) => {
                console.log ( 'value', value );
                // this.props.selectCheckList ( value );
                // // this.props.getListPoints ( value );
                // this.props.loadPoints ( value );
              }}
            />
            <Text style={styles.headerText}>Select Period</Text>
            <View style={styles.dateContainer}>
              <Text>from   </Text>
              <DatePickerComponent/>
            </View>
            <View style={styles.dateContainer}>
              <Text>to   </Text>
              <DatePickerComponent/>
            </View>
          </ScrollView>
        </View>
      </React.Fragment>
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
      selectPoint,
      changeMovingGeoPoint,
      getGeoLocation,
      updateGeoPoint,
    },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( CheckInStatisticsScreen );

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  headerText: {
    marginTop: 5,
    marginLeft: 10,
  },
});
