import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  NavigatorIOS,
  Keyboard,
  Image
} from 'react-native';

import Firebase from 'firebase';
import Dashboard from './app/components/dashboard';
import NewNote from './app/components/new_note';
import Icon from 'react-native-vector-icons/FontAwesome';
console.disableYellowBox = true;

export default class TimeLine extends React.Component {

  constructor(props) {
    super(props);
    const firebaseConfig = {
      apiKey: 'AIzaSyAA4tvWjV2LVL_CiPLxoD-EJNf-gTFHpXI',
      databaseURL: 'https://timeline-397c1.firebaseio.com/',
      storageBucket: ""
    }
    Firebase.initializeApp(firebaseConfig);
    this.myFirebaseRef = Firebase.database().ref();
  }

  handleNewNote() {

  }

  handleAbout() {

  }

  render() {
    let NewNoteIcon = <Icon name="rocket" size={12} color='black' />;
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.navigator}
        barTintColor='#48afdb'
        initialRoute = {{
          title: "Timeline",
          component: Dashboard,
          rightButtonTitle: 'New Note',
          onRightButtonPress: () => this.handleNewNote(),
          leftButtonTitle: 'About',
          onLeftButtonPress: () => this.handleAbout(),
          passProps: { myFirebaseRef: this.myFirebaseRef },
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  navigator:{
    flex: 1,
  }
});

AppRegistry.registerComponent('TimeLine', () => TimeLine);
