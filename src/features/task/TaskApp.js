import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
} from '../../app/redux/actions/taskAction';

const TaskApp = () => {
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText('');
    }
  };
  const handleEditTask = () => {
    if (editedTaskText.trim()) {
      dispatch(editTask(editingTaskId, editedTaskText));
      setEditingTaskId(null);
      setEditedTaskText('');
    }
  };

  const startEditingTask = (taskId, taskNewText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskNewText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.task}>
            {editingTaskId === item.id ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editedTaskText}
                  onChangeText={setEditedTaskText}
                />
                <Button title="Save" onPress={handleEditTask} />
              </>
            ) : (
              <>
                <TouchableOpacity onPress={() => dispatch(toggleTask(item.id))}>
                  <Text
                    style={
                      item.completed ? styles.completed : styles.notCompleted
                    }>
                    {item.text}
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Edit"
                  onPress={() => startEditingTask(item.id, item.text)}
                />
                <Button
                  title="Delete"
                  onPress={() => dispatch(deleteTask(item.id))}
                />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default TaskApp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  notCompleted: {
    textDecorationLine: 'none',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});
