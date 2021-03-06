import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
    FlatList, 
    KeyboardAvoidingView, 
    TextInput,
    Keyboard,
    Animated
} from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import Colors from '../Colors';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppSweap from '../App1';

export default class TodoModal extends React.Component {
    state = {
        newTodo: ""
    };

    toogleTodoCompleted = index => {
        let list = this.props.list
        list.todos[index].completed = !list.todos[index].completed

        this.props.updateList(list);
    };

    addTodo = () => {
        let list = this.props.list
        list.todos.push({title: this.state.newTodo, completed: false})

        this.props.updateList(list)
        this.setState({newTodo: ""})

        Keyboard.dismiss();
    };

    renderTodo = (todo, index) => {
        return (
            
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toogleTodoCompleted(index)}>
                    <Ionicons 
                        name={todo.completed ? 'ios-square' : "ios-square-outline"} 
                        size={24} 
                        color={Colors.gray} 
                        style={{width: 32}} 
                    />
                </TouchableOpacity>

                <Text style={
                    [styles.todo, 
                    {
                        textDecorationLine: todo.completed ? "line-through" : "none", 
                        color: todo.completed ? Colors.gray : Colors.black
                    }
                    ]}
                >
                    {todo.title}
                </Text>
            </View> 
        );
    };

    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });
        return (
          <RectButton style={styles.leftAction} onPress={this.close}>
            <Animated.Text
              style={[
                styles.actionText,
                {
                  transform: [{ translateX: trans }],
                },
              ]}>
              Archive
            </Animated.Text>
          </RectButton>
        );
      };
    

    rightActions = (dragX, index) => { 
        return (
            <TouchableOpacity>
                <Animated.View>
                    <Animated.Text>Delete </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };
    

    render() {
        const list = this.props.list;
        
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;
         
        return (
            <KeyboardAvoidingView style={{flex: 1, }} behavior="padding">
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={{position: 'absolute', top: 16, right: 16, zIndex: 10}}
                    onPress={this.props.closeModal}
                >
                    <AntDesign name="close" size={24} color={Colors.black}/>
                </TouchableOpacity>

                <View style={[styles.section, styles.header, {borderBottomColor: list.color }]}>
                    <View>
                        <Text style={styles.title}>{list.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                        </Text>
                    </View>
                </View>
                
                <View style={[styles.section, {flex: 3}]}>
                    { <FlatList 
                        data={list.todos} 
                        renderItem={({item, index }) => this.renderTodo(item, index)} 
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                        showsVerticalScrollIndicator={false}
                    />
                    }
                     
                </View>

                <View 
                    style={[styles.section, styles.footer]}
                >
                    <TextInput 
                        style={[styles.input, {borderColor: list.color}]} 
                        onChangeText={text => this.setState({newTodo: text})} 
                        value={this.state.newTodo}
                    />
                    <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]} onPress={() => this.addTodo()}>
                        <AntDesign name="plus" size={16} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: Colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,

        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: Colors.black,
        fontWeight: "700",
        fontSize: 16
    }
})