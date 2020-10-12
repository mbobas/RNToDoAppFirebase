import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from './Colors';
import tempData from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

export default class Aoo extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData
  };

  toggleAddtodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList}/>;
  };

  addList = list => {
    this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos: [] }] });
  };

  updateList = list => {
    this.setState({
      list: this.state.lists.map(item=> {
        return item.id === list.id ? list : item;
      })
    });
  };


  render() {
    return (
      <View style={styles.container}>
        <Modal 
          animationType="slide" 
          visible={this.state.addTodoVisible} 
          onRequestClose={() => this.toggleAddtodoModal()}
        >
          <AddListModal closeModal={() => this.toggleAddtodoModal()} addList={this.addList}/>
        </Modal>
        <View style={{flexDirection: "row"}}>
          <View style={styles.divider} />
          <Text style={styles.title}>
              Todo <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{marginVertcal: 48}}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddtodoModal()}>
              <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{height: 275, paddingLeft: 32}}>
            <FlatList 
              data={this.state.lists} 
              keyExtractor={item => item.name} 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
              renderItem={({item})=> this.renderList(item)}  
              keyboardShouldPersistTaps="always"
            />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "700",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20
  }
});
