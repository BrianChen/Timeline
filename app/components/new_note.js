import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';

class NewNote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <TextInput
        style={styles.textInput}
        multiline = {true}
        numberOfLines = {4}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    )
  }
}

const styles = StyleSheet.create({
  navigator:{
    flex: 1,
  },
  textInput:{
    marginTop: 80,
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
  }
});

export default NewNote
