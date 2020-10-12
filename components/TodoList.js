import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import Colors from '../Colors';
import TodoModal from './TodoModal';

export default class TodoList extends React.Component {
    state = {
        showListVisable: false
    }

    toggleListModal() { 
        this.setState({showListVisable: !this.state.showListVisable})
    }

    render() {
        const list = this.props.list;
        const completedCount = list.todos.filter((todo) => todo.completed).length;
        const remaningCount =list.todos.length-completedCount;


        return (
            <View>
                <Modal 
                    animationType="slide" 
                    visible={this.state.showListVisable} 
                    onRequestClose={() => this.toggleListModal()}
                >
                    <TodoModal 
                        list={list} 
                        closeModal={() => this.toggleListModal()}  
                        updateList={this.props.updateList}
                    />
                </Modal>
                <TouchableOpacity 
                    style={[styles.listContainer, {backgroundColor: list.color}]}
                    onPress={() => this.toggleListModal()}
                >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name} 
                </Text>
    
                <View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.count}>{remaningCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
        
            </View>
        );    
    }
    
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18,
    },
    count: {
        fontSize: 48,
        fontWeight: "100", // dosen't work !????
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    }
})