import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  NavigatorIOS
} from 'react-native';

import Firebase from 'firebase';
import Dashboard from './app/components/dashboard';
import NewNote from './app/components/new_note';
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
    this.refs.nav.push({
      title: 'New Note',
      component: NewNote,
      rightButtonTitle: 'Done',
      onRightButtonPress: () => this.handleDoneEdit(),
      passProps: { myFirebaseRef: this.myFirebaseRef },
    })
  }

  handleDoneEdit() {
    this.refs.nav.push({
      title: "Timeline",
      component: Dashboard,
      rightButtonTitle: 'New Note',
      onRightButtonPress: () => this.handleNewNote(),
    })
  }

  render() {
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
