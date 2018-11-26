import React from 'react';
import { Slider, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import IGeoPoint from "../DTO/geoPointDTO";
import IDispatchFunction from "../types/functionsTypes/dispatchFunction";
import { RenderItemComponent } from "./renderItemComponent";
import { ECodeImage } from "../enums/codeImage";

type Props = {
  selectedGeoPoint: IGeoPoint;
  isEditing: boolean;
  idList: string;

  cancelGeoPoint: () => ( dispatch: IDispatchFunction ) => void;
  changeDataGeoPoint: ( field: string, data: string | number ) => ( dispatch: IDispatchFunction ) => void;
  saveGeoPoint: ( geoPoint: IGeoPoint ) => ( dispatch: IDispatchFunction ) => void;
};
type State = {};

export class PointEditFormComponent extends React.Component<Props, State> {
  render() {
    const isEditing: boolean = this.props.isEditing;
    return (
      <View style={styles.container}>
        <Text>Name</Text>
        <TextInput
          placeholder="Name"
          editable={isEditing}
          style={styles.input}
          value={this.props.selectedGeoPoint.name}
          onChangeText={( name: string ) => {
            this.props.changeDataGeoPoint ( 'name', name );
          }}
        />
        <View style={styles.coordsContainer}>
          <Text style={styles.coordsText}>
            Lat
          </Text>
          <TextInput
            style={styles.coordsInput}
            keyboardType='numeric'
            placeholder="Name"
            editable={isEditing}
            value={this.props.selectedGeoPoint.lat.toString ()}
            onChangeText={( lat: string ) => {
              this.props.changeDataGeoPoint ( 'lat', parseInt ( lat ) );
            }}
          />
          <Text style={styles.coordsText}>
            Long
          </Text>
          <TextInput
            style={styles.coordsInput}
            keyboardType='numeric'
            placeholder="Name"
            editable={isEditing}
            value={this.props.selectedGeoPoint.lng.toString ()}
            onChangeText={( lng: string ) => {
              this.props.changeDataGeoPoint ( 'lng', parseInt ( lng ) );
            }}
          />
        </View>
        <Slider
          style={styles.slider}
          step={1}
          minimumValue={0}
          maximumValue={500}
          value={this.props.selectedGeoPoint.radius}
          disabled={!isEditing}
          onValueChange={( radius: number ) => {
            console.log ( 'radius', radius );
            this.props.changeDataGeoPoint ( 'radius', radius );
          }}
        />
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={5}
          placeholder="Approximate address"
          placeholderTextColor="grey"
          editable={isEditing}
          value={this.props.selectedGeoPoint.description}
          onChangeText={( description: string ) => {
            this.props.changeDataGeoPoint ( 'description', description );
          }}
        />
        {isEditing &&
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.cancelGeoPoint ();
            }}
          >
            <RenderItemComponent
              codeIcon={ECodeImage.Times}
              style={styles.iconCancel}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const newMarker: IGeoPoint = {
                ...this.props.selectedGeoPoint,
                idList: this.props.idList,
              };
              this.props.saveGeoPoint ( newMarker );
            }}
          >
            <RenderItemComponent
              codeIcon={ECodeImage.Check}
              style={styles.iconCheck}
            />
          </TouchableOpacity>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  container: {
    // flex: 0.5,
    margin: 10,
    padding: 10,
    borderWidth: 2,
  },
  input: {
    borderWidth: 2,
  },
  coordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  coordsText: {
    textAlign: 'center'
  },
  coordsInput: {
    borderWidth: 2,
    minWidth: 130,
  },
  textArea: {
    borderWidth: 2,
    maxHeight: 150,
    justifyContent: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconCheck: {
    fontSize: 40,
    fontFamily: 'FontAwesome5_Solid',
    color: '#1b9610'
  },
  iconCancel: {
    fontSize: 40,
    fontFamily: 'FontAwesome5_Solid',
    color: '#a80f21',
  },
  slider: {
    marginTop: 15,
    marginBottom: 15,
  }
} );