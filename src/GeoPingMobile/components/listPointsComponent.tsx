import React from 'react';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { keyExtractor } from "../services/helper";
import IGeoPoint from "../DTO/geoPointDTO";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { RenderItemComponent } from "./renderItemComponent";
import { ECodeImage } from "../enums/codeImage";

type Props = {
  geoPointsList: Array<IGeoPoint>;
  selectedGeoPoint: IGeoPoint;

  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
  cancelGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  deleteGeoPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {};

export class ListPointsComponent extends React.Component<Props, State> {
  _renderItem = ( props ) => {
    const colorItem: string = this.props.selectedGeoPoint.idForMap ?
      props.item.idForMap === this.props.selectedGeoPoint.idForMap ? '#30891f' : '#9b9fa0'
      :
      '#dfe3e4';
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground ()}
        onPress={() => {
          if ( this.props.selectedGeoPoint.idForMap && props.item.idForMap === this.props.selectedGeoPoint.idForMap) {
            this.props.cancelGeoPoint();
          } else if (!this.props.selectedGeoPoint.idForMap){
            this.props.selectPoint ( props.item );
          }
        }}
      >
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colorItem,
            padding: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={styles.itemName}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {props.item.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // console.log ( 'Delete' )
              this.props.deleteGeoPoint(props.item);
            }}
          >
            <RenderItemComponent
              codeIcon={ECodeImage.TrashAlt}
              style={styles.itemIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.geoPointsList}
          renderItem={this._renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={2}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  container: {
    margin: 10,
    // height: '100%'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#0c0c0c',
  },
  itemContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    fontSize: 20,
  },
  itemIcon: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: 40,
    fontFamily: 'FontAwesome5_Solid',
    fontSize: 35,
    justifyContent: 'center',
    color: '#a80f21',
  },
  list: {
    // maxHeight: 200,
  }
} );