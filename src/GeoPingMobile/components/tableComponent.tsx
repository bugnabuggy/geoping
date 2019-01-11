import React from 'react';
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ISelectUser } from "../types/stateTypes/checkinStatisticsStateType";
import IGeoPoint from "../DTO/geoPointDTO";
import moment = require("moment");

type Props = {
  tableData: Array<any>;
  showUserName: boolean;
  usersList: Array<ISelectUser>;
  selectedGeoPoint: IGeoPoint;
};
type State = {};

export class TableComponent extends React.Component<Props, State> {

  _keyExtractor = ( item: any ) => item.point.idForMap;

  _renderTableHeader = () => {

  };
  _renderTableBody = ( props ) => {

    let userName: ISelectUser = {
      userName: '',
      fullName: '',
      userId: '',
      email: '',
    };
    const date: string = props.item.check.date ? moment ( props.item.check.date ).format ( 'LLL' ) : '';
    const style: any = {
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#8E8E8E',
      backgroundColor: props.item.point.color,
    };
    if ( this.props.showUserName && !!props.item.check.userId && this.props.usersList.length ) {
      userName = this.props.usersList.find ( item => item.userId === props.item.check.userId );
    }
    return (
      <React.Fragment>
        <View style={style}>
          {this.props.showUserName &&
          (
            <React.Fragment>
              <Text style={styles.bodyItem}>{userName.fullName || userName.userName}</Text>
              <View style={styles.separator}/>
            </React.Fragment>
          )}
          <Text style={styles.bodyItem}>{props.item.point.name}</Text>
          <View style={styles.separator}/>
          <Text style={styles.bodyItem}>{props.item.point.lat + ' / ' + props.item.point.lng}</Text>
          <View style={styles.separator}/>
          <Text style={styles.bodyItem}>{props.item.check.distance}</Text>
          <View style={styles.separator}/>
          <Text style={styles.bodyItem}>{date}</Text>
        </View>
      </React.Fragment>
    );
  };

  _renderTable = () => {

  };//
  render() {
    // console.log('this.props.tableData', this.props.tableData);
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          {this.props.showUserName &&
          (
            <React.Fragment>
              <Text style={styles.headerItem}>User name</Text>
              <View style={styles.separator}/>
            </React.Fragment>
          )}
          <Text style={styles.headerItem}>Name</Text>
          <View style={styles.separator}/>
          <Text style={styles.headerItem}>Coords point</Text>
          <View style={styles.separator}/>
          <Text style={styles.headerItem}>Distance</Text>
          <View style={styles.separator}/>
          <Text style={styles.headerItem}>Date time</Text>
        </View>
        <FlatList
          data={this.props.tableData}
          renderItem={this._renderTableBody}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  container: {
    marginBottom: 70,
    paddingLeft: 5,
    paddingRight: 5,
  },
  containerHeader: {
    backgroundColor: '#cad2dd',
    height: 35,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerItem: {
    padding: 5,
    flex: 1,
  },
  containerBody: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#8E8E8E',
    // backgroundColor: '',
  },
  bodyItem: {
    padding: 5,
    flex: 1,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#8E8E8E',
  },
} );
