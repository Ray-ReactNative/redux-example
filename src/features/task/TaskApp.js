import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
  setPriority,
  fetchTasks,
} from '../../app/redux/actions/taskAction';
import {Picker} from '@react-native-picker/picker';

const TaskApp = () => {
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const [priorityValue, setPriorityValue] = useState('normal');

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const priorities = useSelector(state => state.priorities);

  useEffect(() => {
    dispatch(fetchTasks()); // get data from api
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskText.trim()) {
      const taskId = Date.now(); // Generate a unique ID for the task
      dispatch(addTask(taskText, taskId));
      dispatch(setPriority(taskId, priorityValue));
      setTaskText('');
    }
  };

  const handleEditTask = () => {
    if (editedTaskText.trim() && editingTaskId !== null) {
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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priorityValue}
          style={styles.picker}
          itemStyle={{height: 150}}
          mode="dropdown"
          onValueChange={itemValue => setPriorityValue(itemValue)}>
          <Picker.Item label="normal" value="normal" color="green" />
          <Picker.Item label="quick" value="quick" color="#EAC100" />
          <Picker.Item label="urgent" value="urgent" color="red" />
        </Picker>
      </View>
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
                <Text>Priority: {priorities[item.id]}</Text>
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
  pickerContainer: {
    marginBottom: 100,
  },
  picker: {
    height: 20,
    width: '100%',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
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
