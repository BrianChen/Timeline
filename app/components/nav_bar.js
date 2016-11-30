import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';

class NavBar extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){

  }

  render() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          Timeline
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    // color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20
  }
})

export default NavBar;
