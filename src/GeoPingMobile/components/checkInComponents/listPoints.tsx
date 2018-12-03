import React from 'react';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import IGeoPoint from "../../DTO/geoPointDTO";
import IDispatchFunction from "../../types/functionsTypes/dispatchFunction";

type Props = {
  listPoints: Array<IGeoPoint>;

  getListPoints: ( idCheckList: string ) => ( dispatch: IDispatchFunction ) => void;
  selectPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {};

export class ListPoints extends React.Component<Props, State> {
  _keyExtractor = ( item: any ) => item.id;

  _renderListPoints = ( props: any ) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground ()}
        onPress={() => {
          this.props.selectPoint ( props.item );
        }}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{props.item.name}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.listPoints}
          renderItem={this._renderListPoints}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
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