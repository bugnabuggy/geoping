import React from 'react';
import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderComponent } from "../components/headerComponent";
import { WrapperMapComponent } from "../components/wrapperMapComponent";
import { getOrientation } from "../services/helper";
import {
  changeMovingGeoPoint,
  clearStateGoogleMap,
  getGeoLocation,
  selectPoint,
  updateGeoPoint
} from "../actions/googleMapAction";
import IGeoPoint from "../DTO/geoPointDTO";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { DatePickerComponent } from "../components/datePickerComponent";
import RNPickerSelect from "react-native-picker-select";
import { getFreeCheck, loadLists, loadPoints, loadUsers, selectList } from "../actions/checkinStatisticsActions";
import moment from "moment";
import { TableComponent } from "../components/tableComponent";

type Props = {
  navigation: any;
  state: IinitialStateType;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
  updateGeoPoint: ( marker: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  loadLists: () => ( dispatch: IDispatchFunction ) => void;
  selectList: ( listId: string ) => ( dispatch: IDispatchFunction ) => void;
  loadPoints: ( listId: string, userId: string, dateFrom: string, dateTo: string ) => ( dispatch: IDispatchFunction ) => void;
  loadUsers: ( idList: string ) => ( dispatch: IDispatchFunction ) => void;
  getFreeCheck: ( dateFrom: string, dateTo: string ) => ( dispatch: IDispatchFunction ) => void;
  clearStateGoogleMap: () => ( dispatch: IDispatchFunction ) => void;
};
type State = {
  orientation: string;
  dateFrom: moment.Moment;
  dateTo: moment.Moment;
  userId: string;
  listId: string;
};

class CheckInStatisticsScreen extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
    this.state = {
      orientation: getOrientation (),
      dateFrom: moment ().subtract ( 1, 'day' ),
      dateTo: moment (),
      userId: null,
      listId: null,
    };
    Dimensions.addEventListener ( 'change', () => {
      this.setState ( {
        orientation: getOrientation (),
      } );
    } );
    props.loadLists ();
  }

  componentDidMount(): void {
    this.props.getFreeCheck (
      this.state.dateFrom.utc ().subtract ( 2, 'weeks' ).startOf ( 'day' ).format (),
      this.state.dateTo.utc ().endOf ( 'day' ).format ()
    );
  }
  componentWillUnmount(): void {
    this.props.clearStateGoogleMap ();
  }

  setDate = ( field: string, date: moment.Moment ) => {
    this.setState ( {
      ...this.state,
      [field]: date,
    } );
    const startDate = field === 'dateFrom' ?
      date.utc ().startOf ( 'day' ).format () :
      this.state.dateFrom.utc ().startOf ( 'day' ).format ();
    const endDate = field === 'dateTo' ?
      date.utc ().endOf ( 'day' ).format () :
      this.state.dateTo.utc ().endOf ( 'day' ).format ();
    if ( this.state.listId ) {
      this.props.loadPoints (
        this.state.listId,
        this.state.userId,
        startDate,
        endDate
      );
    } else {
      this.props.getFreeCheck (
        startDate,
        endDate
      );
    }
  };

  formationStatisticsDataForTable = () => {
    const data = this.props.state.googleMap.geoPoints.map ( ( item, index: number ) => {
      return {
        point: {
          ...item,
        },
        check: {
          ...this.props.state.googleMap.checkInGeoPoint[index],
        },
      }
    } );
    return data;
  };

  handleSelectList = ( value ) => {
    this.setState ( {
      listId: value,
      userId: null,
    } );
    // this.props.selectList ( value );
    // console.log ( 'value', value );
    if ( !!value ) {
      this.props.loadPoints (
        value,
        this.state.userId,
        this.state.dateFrom.utc ().startOf ( 'day' ).format (),
        this.state.dateTo.utc ().endOf ( 'day' ).format ()
      );
    } else {
      this.props.getFreeCheck (
        this.state.dateFrom.utc ().subtract ( 2, 'weeks' ).startOf ( 'day' ).format (),
        this.state.dateTo.utc ().endOf ( 'day' ).format ()
      );
      // this.props.loadPoints (
      //   value,
      //   this.state.userId,
      //   this.state.dateFrom.utc ().subtract ( 2, 'weeks' ).startOf ( 'day' ).format (),
      //   this.state.dateTo.utc ().endOf ( 'day' ).format ()
      // );
    }

    if ( value ) {
      this.props.loadUsers ( value );
    }
    // console.log ( 'this.state.dateFrom.format ()', this.state.dateFrom.utc ().startOf ( 'day' ).format () );
    // console.log ( 'this.state.dateTo.format ()', this.state.dateTo.utc ().endOf ( 'day' ).format () );
    // console.log ( ' moment().format ()', moment ().format () );
  };

  handleSelectUser = ( value ) => {
    this.setState ( {
      userId: value,
    } );
    this.props.loadPoints (
      this.state.listId,
      value,
      this.state.dateFrom.utc ().startOf ( 'day' ).format (),
      this.state.dateTo.utc ().endOf ( 'day' ).format ()
    );
  };

  getOptionsCheckList = () => {
    return this.props.state.checkList.checkInStatisticsLists.map ( item => {
      return {
        label: item.name,
        value: item.id,
      };
    } );
  };
  getOptionsUserList = () => {
    return this.props.state.checkinStatistics.selectUser.map ( item => {
      return {
        label: item.fullName || item.userName,
        value: item.userId,
      };
    } );
  };

  render() {
    return (
      <React.Fragment>
        <View>
          <HeaderComponent
            navigation={this.props.navigation}
            title={'Check in statistics'}
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
              value={this.state.listId}
              items={this.getOptionsCheckList ()}
              onValueChange={this.handleSelectList}
            />
            {this.state.listId &&
            ( <React.Fragment>
              <Text style={styles.headerText}>Select User</Text>
              < RNPickerSelect
                placeholder={{
                  label: '- NONE -',
                  value: null,
                }}
                value={this.state.userId}
                items={this.getOptionsUserList ()}
                onValueChange={this.handleSelectUser}
              />
            </React.Fragment> )}
            <Text style={styles.headerText}>Select Period</Text>
            <View style={styles.dateContainer}>
              <Text>from </Text>
              <DatePickerComponent
                date={this.state.dateFrom}
                periodDate="dateFrom"
                maxDate={this.state.dateTo}
                setDate={this.setDate}
              />
            </View>
            <View style={styles.dateContainer}>
              <Text>to </Text>
              <DatePickerComponent
                date={this.state.dateTo}
                periodDate="dateTo"
                minDate={this.state.dateFrom}
                setDate={this.setDate}
              />
            </View>
            <TableComponent
              tableData={this.formationStatisticsDataForTable ()}
              showUserName={!!this.state.listId && !!!this.state.userId}
              usersList={this.props.state.checkinStatistics.selectUser}
              selectedGeoPoint={this.props.state.googleMap.selectedGeoPoint}
            />
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
      loadLists,
      selectList,
      loadPoints,
      loadUsers,
      getFreeCheck,
      clearStateGoogleMap,
    },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( CheckInStatisticsScreen );

const styles = StyleSheet.create ( {
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
} );
