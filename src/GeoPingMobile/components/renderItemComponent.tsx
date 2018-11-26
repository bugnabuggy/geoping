import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ECodeImage } from "../enums/codeImage";

type Props = {
  codeIcon: ECodeImage;
  style?: any;
};
type State = {};

export class RenderItemComponent extends React.Component<Props, State> {
  render() {
    return (
      <Text style={{ ...this.props.style, fontFamily: 'FontAwesome5_Solid' }}>{this.props.codeIcon}</Text>
    );
  }
}

const styles = StyleSheet.create ( {
  icon: {
    fontFamily: 'FontAwesome5_Solid',
  }
} );
