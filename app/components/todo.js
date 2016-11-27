import React from 'react';
import {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';

import Firebase from 'firebase';

class Todo extends Component {

  constructor(props){
    super(props);
    let myFirebaseRef = new Firebase('https://Timeline.firebaseapp.com');

    myFirebaseRef.set({
      title: "Hello World",
      author: "Brian",
      location: {
        city:  "NYC",
        state: "New York",
        zip: 11358
      }
    })
  }
}

export default Todo;
