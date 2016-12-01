import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Keyboard,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import Paper from '../../img/texture_paper2.png';

class NewNote extends React.Component {

  constructor(props) {
    //myFirebaseRef, text, date
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text,
      date: this.props.date,
    };

    this.itemsRef = this.props.myFirebaseRef.child('entries');
    this.items = [];
  }

  componentWillMount() {
    let route = this.props.navigator.navigationContext.currentRoute;
    route.onRightButtonPress = () => this.handleDone();
    this.props.navigator.replace(route);
  }

  handleDone() {
    Keyboard.dismiss();
    let id = this.state.id;
    if (id == ""){
      let newRef = this.itemsRef.push({
        text: this.state.text,
        date: this.state.date
      })
      this.state.id = newRef.key;
    } else {
      let id = this.state.id;
      let note = this.props.myFirebaseRef.child('entries').child(id);
      note.update({text: this.state.text});
    }
  }

  handleChange() {

  }

  render() {
    let date = new Date().toString();
    let dateArray = date.split(" ");
    let newDate = dateArray.splice(1, 3);
    let newDateString = newDate.join(" ");
    this.state.date = newDateString;
    return (
      <View style={styles.noteView}>
        <Image style={styles.img} source={Paper} style={styles.backgroundImage}>
          <Text style={styles.dateText}>{newDateString}</Text>
          <TextInput
          style={styles.textInput}
          multiline = {true}
          numberOfLines = {4}
          placeholder="How was your day?"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          />
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noteView:{
    flex: 1,
    marginTop: 63,
    backgroundColor: 'transparent',
  },
  textInput:{
    width: 360,
    height: 36,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    flex: 4,
    fontSize: 18,
  },
  dateText:{
    padding: 10,
    marginLeft: 140,
  },
  img:{
    flex: 1,
    width:100,
    height:100,
    resizeMode: 'contain',
  },
});

export default NewNote
