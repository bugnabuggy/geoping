import React from 'react';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import IGeoPoint from "../../DTO/geoPointDTO";
import IDispatchFunction from "../../types/functionsTypes/dispatchFunction";
import { defaultMarker } from "../../constants/defaultMarker";
import { IGoogleMapStateType } from "../../types/stateTypes/googleMapStateType";
import ICheckinStateType from "../../types/stateTypes/checkinStateType";

type Props = {
  googleMap: IGoogleMapStateType;
  enableScrollViewScroll: boolean;
  checkin: ICheckinStateType;

  getListPoints: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  onEnableScroll: ( value: boolean ) => void;
};
type State = {};

export class ListPoints extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
    this.state = {};
  }

  setBackGroundListItem = ( item ) => {
    if ( this.props.googleMap.selectedGeoPoint.id === item.id ) {
      if ( this.props.googleMap.checkInGeoPoint.find ( check => check.pointId === item.id ) ||
        this.props.googleMap.selectedGeoPoint.radius >= this.props.checkin.difference ) {
        return '#19b71a';
      } else {
        return '#d7c626';
      }
    } else {
      if ( this.props.googleMap.checkInGeoPoint.find ( check => check.pointId === item.id ) ) {
        return '#418c45';
      } else {
        return '#eeeeee';
      }
    }
  };

  _keyExtractor = ( item: any ) => item.id;

  _renderListPoints = ( props: any ) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground ()}
        onPress={() => {
          if ( this.props.googleMap.selectedGeoPoint.id === props.item.id ) {
            this.props.selectPoint ( defaultMarker );
          } else {
            this.props.selectPoint ( props.item );
          }
        }}
      >
        <View
          // style={styles.itemContainer}
          style={{
            height: 40,
            justifyContent: 'center',
            padding: 2,
            backgroundColor: this.setBackGroundListItem ( props.item ),
          }}
        >
          <Text style={styles.item}>{props.item.name}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.googleMap.geoPoints}
          renderItem={this._renderListPoints}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          onTouchStart={() => {
            this.props.onEnableScroll ( false );
          }}
          onTouchEnd={() => {
            this.props.onEnableScroll ( true );
          }}
          onMomentumScrollEnd={() => {
            this.props.onEnableScroll ( true );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  container: {
    height: 200,
    margin: 4,
    borderWidth: 1,
  },
  itemContainer: {
    height: 40,
    justifyContent: 'center',
    padding: 2,
  },
  item: {
    marginLeft: 10,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
} );