import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

class AboutModal extends React.Component {

  constructor(props){
    super(props);

  }

  render() {
    return(
      <View style={styles.aboutContainer}>
        <View style={styles.header}>
          <Text style={styles.about}>About</Text>
          <TouchableHighlight
            onPress={this.props.closeModal}
            underlayColor='#dddddd'>
            <Text style={styles.done}>Done</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.info}>
          <View style={styles.infoChild}>
            <Text style={styles.leftText}>Version</Text>
            <Text style={styles.rightText}>1.0</Text>
          </View>
          <View style={styles.infoChild}>
            <Text style={styles.leftText}>Write a Review</Text>
          </View>
          <View style={styles.infoChild}>
            <Text style={styles.leftText}>Remove Ads</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.credits}>
            <Text>Timeline</Text>
            <Text>Created by Brian Chen</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  aboutContainer:{
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  header:{
    backgroundColor: 'white',
    height: 63,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  about:{
    marginTop: 25,
    marginRight: 110,
    fontWeight: 'bold',
    fontSize: 15,
  },
  done:{
    marginTop: 25,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 20,
  },
  info:{
    marginTop: 30,
  },
  infoChild:{
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftText:{
    fontFamily: 'helvetica neue',
    padding: 10,
    marginLeft: 10,
  },
  rightText:{
    padding: 10,
    marginRight: 10,
  },
  footer:{
    marginTop:350,
  },
  credits:{
    alignItems: 'center',
  }
})

export default AboutModal
