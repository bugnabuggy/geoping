import React from 'react'
import { Text, View } from 'react-native';

type Props = {
  navigation: any,
};
type State = {};

export class ForgotPasswordScreen extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>Forgot password</Text>
      </View>
    );
  }
}