import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Welcome extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'red'}} />
        <View style={{flex: 1, backgroundColor: 'steelblue'}} />
      </View>
    )
  }
}

export default Welcome;
