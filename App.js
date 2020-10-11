import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from './Colors';
import tempData from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

export default class Aoo extends React.Component {
  state = {
    addTodoVisable: false
  }

  toggleAddtodoModal() {
    this.setState({ addTodoVisable: !this.state.addTodoVisable });
  }

  renderList = list => {
    return <TodoList list={list}/>
  }


  render() {
    return (
      <View style={styles.container}>
        <Modal 
          animationType="slide" 
          visible={this.state.addTodoVisable} 
          onRequestClose={() => this.toggleAddtodoModal()}
        >
          <AddListModal closeModal={() => this.toggleAddtodoModal()} />
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
              data={tempData} 
              keyExtractor={item => item.name} 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
              renderItem={({item})=> this.renderList(item)}  
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
