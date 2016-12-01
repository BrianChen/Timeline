import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView,
  Modal
} from 'react-native';
console.disableYellowBox = true;
import Swipeout from 'react-native-swipeout';

import NewNote from './new_note';
import AboutModal from './about_modal';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    myFirebaseRef = this.props.myFirebaseRef;

    this.entriesRef = myFirebaseRef.child('entries');

    this.state = {
      modalVisible: false,
      entrieSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };

    this.entries = [];
    this.onModalClose = this.onModalClose.bind(this);
  }

  componentWillMount() {
    let route = this.props.navigator.navigationContext.currentRoute;
    route.onRightButtonPress = () => this.handleNewNote();
    route.onLeftButtonPress = () => this.handleAbout();
    this.props.navigator.replace(route);
  }

  handleAbout() {
    this.setState({modalVisible: true});
  }

  onModalClose() {
    this.setState({modalVisible: false});
  }

  handleNewNote() {
    this.props.navigator.push({
      title: 'New Note',
      component: NewNote,
      rightButtonTitle: 'Done',
      onRightButtonPress: () => this.handleDone(),
      passProps: { myFirebaseRef: this.props.myFirebaseRef, id: "", text: "", date: "" },
    })
  }

  componentDidMount() {
    this.entriesRef.on('value', (snap) => {
      this.entries = [];
      snap.forEach((child) => {
        this.entries.push({
          text: child.val().text,
          date: child.val().date,
          id: child.key
        });
      });
      this.setState({
        entrieSource: this.state.entrieSource.cloneWithRows(this.entries)
      });
    });
  }

  editEntrie(rowData) {
    this.props.navigator.push({
      title: 'New Note',
      component: NewNote,
      rightButtonTitle: 'Done',
      onRightButtonPress: () => this.handleDone(),
      passProps: { myFirebaseRef: this.props.myFirebaseRef, id: rowData.id, text: rowData.text, date: rowData.date },
    })
  }

  deleteNote(rowData){
    this.entriesRef.child(rowData.id).remove();
  }

  renderRow(rowData) {
    let dateArray = rowData.date.split(" ");
    let month = dateArray[0];
    let day = dateArray[1];
    let charArray = rowData.text.split('');
    let text = "";
    if (charArray.length > 70){
      text = charArray.splice(0,70).join("").concat("...");
    } else {
      text = rowData.text;
    }

    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteNote(rowData) }
    }];

    return(
      <Swipeout
      right={swipeBtns}
      autoClose={true}
      style={styles.swipeOut}
      backgroundColor='transparent'>
        <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.editEntrie(rowData)}>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>{month}</Text>
                <Text style={styles.dateText}>{day}</Text>
              </View>
              <Text style={styles.entrieText}>{text}</Text>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      </Swipeout>
    )
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}>
          <AboutModal closeModal={this.onModalClose}/>
        </Modal>
        <ListView
          dataSource={this.state.entrieSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#DCDCDC',
  },
  rowContainer:{
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  dateBox:{
    padding: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
  },
  dateText:{
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    paddingLeft: 3,
    paddingRight: 3,
  },
  swipeOut:{
    height: 85,
    paddingBottom: 5,
  },
  entrieText: {
    flex: 1,
    padding: 10,
  }
});
