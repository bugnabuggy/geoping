import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IinitialStateType from "../types/stateTypes/initialStateType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { HeaderComponent } from "../components/headerComponent";
import { PointEditFormComponent } from "../components/pointEditFormComponent";
import { ListPointsComponent } from "../components/listPointsComponent";
import { MapComponent } from "../components/mapComponent";
import {
  addNewPoint,
  cancelGeoPoint,
  changeDataGeoPoint,
  changeMovingGeoPoint,
  getGeoLocation,
  getListPoints,
  saveGeoPoint,
  selectPoint
} from "../actions/googleMapAction";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import IGeoPoint from "../DTO/geoPointDTO";
import { RenderItemComponent } from "../components/renderItemComponent";
import { ECodeImage } from "../enums/codeImage";
import { defaultMarker } from "../constants/defaultMarker";
import { v4 as uuidV4 } from 'uuid';

type Props = {
  navigation: any;
  state: IinitialStateType;

  getListPoints: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  cancelGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  saveGeoPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  changeMovingGeoPoint: ( geoPoint: { lat: number, lng: number } ) => ( dispatch: IDispatchFunction ) => void;
  changeDataGeoPoint: ( field: string, data: string | number ) => ( dispatch: IDispatchFunction ) => void;
  addNewPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  getGeoLocation: ( latitude: number, longitude: number ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {};

class CheckListScreen extends React.Component<Props, State> {
  componentDidMount(): void {
    if ( this.props.navigation.state.params.idList ) {
      this.props.getListPoints ( this.props.navigation.state.params.idList );
    }
    // console.log(this.props.navigation.state.params.idList);
  }

  componentDidUpdate( prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any ): void {
    // console.log ( 'selectedGeoPoint', this.props.state.googleMap.selectedGeoPoint );
  }

  addNewPoint = () => {
    const geoPoint: IGeoPoint = {
      ...defaultMarker,
      lng: this.props.state.googleMap.position.lng,
      lat: this.props.state.googleMap.position.lat,
      idForMap: uuidV4 (),
    };
    this.props.addNewPoint ( geoPoint );
  };

  render() {
    return (
      <View>
        <HeaderComponent
          navigation={this.props.navigation}
          title={this.props.navigation.state.params.nameList}
        />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        >
          <MapComponent
            googleMap={this.props.state.googleMap}

            selectPoint={this.props.selectPoint}
            changeMovingGeoPoint={this.props.changeMovingGeoPoint}
            getGeoLocation={this.props.getGeoLocation}
          />
          <View style={styles.container}>
            <TouchableOpacity
              disabled={this.props.state.checkList.isEditing}
              style={styles.touchable}
              onPress={this.addNewPoint}
            >
              <RenderItemComponent
                codeIcon={ECodeImage.PlusCircle}
                style={styles.addPointIcon}
              />
              <Text style={styles.addPointText}>add new point</Text>
            </TouchableOpacity>
          </View>
          <PointEditFormComponent
            selectedGeoPoint={this.props.state.googleMap.selectedGeoPoint}
            isEditing={this.props.state.checkList.isEditing}
            idList={this.props.navigation.state.params.idList}

            cancelGeoPoint={this.props.cancelGeoPoint}
            changeDataGeoPoint={this.props.changeDataGeoPoint}
            saveGeoPoint={this.props.saveGeoPoint}
          />
          <ListPointsComponent
            geoPointsList={this.props.state.googleMap.geoPoints}
            selectedGeoPoint={this.props.state.googleMap.selectedGeoPoint}

            selectPoint={this.props.selectPoint}
            cancelGeoPoint={this.props.cancelGeoPoint}
          />
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
      getListPoints,
      selectPoint,
      cancelGeoPoint,
      saveGeoPoint,
      changeMovingGeoPoint,
      changeDataGeoPoint,
      addNewPoint,
      getGeoLocation,
    },
    dispatch );

export default connect ( mapStateToProps, mapDispatchToProps ) ( CheckListScreen );

const styles = StyleSheet.create ( {
  container: {
    margin: 15,
    height: 30,
  },
  addPointText: {
    fontSize: 20,
    marginLeft: 10,
  },
  addPointIcon: {
    fontSize: 20,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
  }
} );
