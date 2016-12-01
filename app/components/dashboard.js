import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';
console.disableYellowBox = true;

import NewNote from './new_note';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    myFirebaseRef = this.props.myFirebaseRef

    this.entriesRef = myFirebaseRef.child('entries');

    this.state = {
      text: '',
      date: '',
      entrieSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };

    this.entries = [];

  }

  // componentWillMount() {
  //   let route = this.props.navigator.navigationContext.currentRoute;
  //   route.onRightButtonPress = () => this.handleNewNote();
  //   this.props.navigator.replace(route);
  // }

  // handleDone() {
  //
  // }

  handleNewNote() {
    this.props.navigator.push({
      title: 'New Note',
      component: NewNote,
      rightButtonTitle: 'Done',
      onRightButtonPress: () => {this.handleDone()},
      passProps: { myFirebaseRef: this.myFirebaseRef, text: "", date: "" },
    })
  }

  // componentDidMount() {
  //   this.entriesRef.on('child_added', (dataSnapshot) => {
  //     this.entries.push({
  //       id: dataSnapshot.key,
  //       text: dataSnapshot.child('entries/text').val(),
  //       date: dataSnapshot.child('entries/date').val(),
  //     });
  //     this.setState({
  //       todoSource: this.state.todoSource.cloneWithRows(this.items)
  //     });
  //   });
  //   debugger;
  //
  //   this.itemsRef.on('child_removed', (dataSnapshot) => {
  //     this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
  //     this.setState({
  //       todoSource: this.state.todoSource.cloneWithRows(this.items)
  //     });
  //   });
  // }


  // removeTodo(rowData) {
  //   this.itemsRef.child(rowData.id).remove();
  // }

  renderRow(rowData) {
    return(
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeEntrie(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.entrieText}>{rowData.text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Text>Hello</Text>
        <ListView
          dataSource={this.state.entrieSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
  // render() {
  //   return (
  //     <View style={styles.appContainer}>
  //       <View style={styles.inputContainer}>
  //         <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
  //         <TouchableHighlight
  //           style={styles.button}
  //           onPress={() => this.addTodo()}
  //           underlayColor='#dddddd'>
  //           <Text style={styles.btnText}>Add!</Text>
  //         </TouchableHighlight>
  //       </View>
  //       <ListView
  //         dataSource={this.state.todoSource}
  //         renderRow={this.renderRow.bind(this)}/>
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    marginTop: 63,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    // color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  todoText: {
    flex: 1
  }
});
