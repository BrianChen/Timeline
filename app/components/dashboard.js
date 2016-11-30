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

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    let myFirebaseRef = this.props.myFirebaseRef

    this.itemsRef = myFirebaseRef.child('items');

    this.state = {
      newTodo: '',
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };

    this.items = [];
  }

  componentDidMount() {
    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({
        id: dataSnapshot.key,
        text: dataSnapshot.val()
      });
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });

    this.itemsRef.on('child_removed', (dataSnapshot) => {
      this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });
  }

  addTodo() {
    if (this.state.newTodo !== '') {
      this.itemsRef.push({
        todo: this.state.newTodo
      });
      this.setState({
        newTodo: ''
      });
    }
  }

  removeTodo(rowData) {
    this.itemsRef.child(rowData.id).remove();
  }

  renderRow(rowData) {
    return(
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeTodo(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.todoText}>{rowData.text.todo}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.addTodo()}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Add!</Text>
          </TouchableHighlight>
        </View>
        <ListView
          dataSource={this.state.todoSource}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
  },
  inputContainer:{
    paddingTop: 100,
    marginTop: 5,
    padding: 10,
    flexDirection: 'row',
  },
  button:{
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    // color: '#FFFFFF',
    borderRadius: 4
  },
  btnText:{
    fontSize: 18,
    // color: '#fff',
    marginTop: 6
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