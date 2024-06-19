import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
  setPriority,
  fetchTasks,
  assignTask,
} from '../../app/redux/actions/taskAction';
import {
  fetchUsers,
  addUser,
  editUser,
  deleteUser,
} from '../../app/redux/actions/userAction';
import RadioGroup from 'react-native-radio-buttons-group';

const TaskApp = () => {
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [editedPriorityText, setEditedPriorityText] = useState('');
  const [priorityValue, setPriorityValue] = useState('normal');

  const [userName, setUserName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const radioButtons = useMemo(
    () => [
      {
        id: 'normal', // acts as primary key, should be unique and non-empty string
        label: 'normal',
        value: 'normal',
        color: '#0080FF',
      },
      {
        id: 'quick',
        label: 'quick',
        value: 'quick',
        color: '#EAC100',
      },
      {
        id: 'urgent',
        label: 'urgent',
        value: 'urgent',
        color: '#AE0000',
      },
    ],
    [],
  );
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const users = useSelector(state => state.users);
  // const priorities = useSelector(state => state.priorities);
  // console.log('priority:', priorities);

  useEffect(() => {
    dispatch(fetchTasks()); // get data from api
    dispatch(fetchUsers()); // get data from api
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskText.trim()) {
      const taskId = Date.now(); // Generate a unique ID for the task
      dispatch(addTask(taskText, taskId, priorityValue));
      // dispatch(setPriority(taskId, priorityValue));
      setTaskText('');
      setPriorityValue('normal');
    }
  };

  const handleEditTask = () => {
    if (editedTaskText.trim() && editingTaskId !== null) {
      dispatch(editTask(editingTaskId, editedTaskText, editedPriorityText));
      setEditingTaskId(null);
      setEditedTaskText('');
      setEditedPriorityText('');
    }
  };

  const startEditingTask = (taskId, taskNewText, priority) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskNewText);
    setEditedPriorityText(priority);
  };

  const handleAddUser = () => {
    if (userName.trim()) {
      dispatch(addUser(userName));
      setUserName('');
    }
  };

  const handleAssignTask = taskId => {
    if (selectedUserId) {
      dispatch(assignTask(taskId, selectedUserId));
    }
  };

  const handleUserChange = (userId, newName) => {
    dispatch(editUser(userId, newName));
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.addingContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={taskText}
            onChangeText={setTaskText}
          />
          <RadioGroup
            containerStyle={{alignItems: 'flex-start'}}
            radioButtons={radioButtons}
            onPress={setPriorityValue}
            selectedId={priorityValue}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={{textAlign: 'center'}}>Add Task</Text>
        </TouchableOpacity>
      </View>
      {tasks && tasks.length > 0 && (
        <FlatList
          style={{marginRight: 20, marginLeft: 20}}
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
                  <RadioGroup
                    containerStyle={{marginTop: 10}}
                    radioButtons={radioButtons}
                    onPress={setEditedPriorityText}
                    selectedId={editedPriorityText}
                    layout="row"
                  />
                  <Button title="Save" onPress={handleEditTask} />
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => dispatch(toggleTask(item.id))}>
                    <Text
                      style={
                        item.completed ? styles.completed : styles.notCompleted
                      }>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                  <Text>Priority: {item.priority}</Text>
                  <Text>
                    Assigned to:{' '}
                    {users.find(user => user.id === item.userId)?.name ||
                      'Unassigned'}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      startEditingTask(item.id, item.text, item.priority)
                    }>
                    <Text style={{textAlign: 'center'}}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#ff4848'}]}
                    onPress={() => dispatch(deleteTask(item.id))}>
                    <Text style={{textAlign: 'center'}}>Delete</Text>
                  </TouchableOpacity>

                  {/* <Button
                    title="Assign"
                    onPress={() => handleAssignTask(item.id)}
                  /> */}
                </>
              )}
            </View>
          )}
        />
      )}

      {/* user */}
      <View style={styles.userContainer}>
        <View style={styles.addingContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new user"
            value={userName}
            onChangeText={setUserName}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddUser}>
            <Text>Add User</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // style={styles.userContainer}
          data={users}
          keyExtractor={user => user.id.toString()}
          renderItem={({item}) => (
            <View style={styles.user}>
              <TextInput
                style={styles.editInput}
                value={item.name}
                onChangeText={text => handleUserChange(item.id, text)}
              />
              <Button
                title="Delete User"
                onPress={() => dispatch(deleteUser(item.id))}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default TaskApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskContainer: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 15,
  },
  addingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 4,
  },
  input: {
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#d3d0c5',
    textAlign: 'center',
    justifyContent: 'center',
  },
  editInput: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  task: {
    marginBottom: 15,
    padding: 15,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#ddf7f8',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  notCompleted: {
    color: '#000',
  },
  priorityText: {
    marginBottom: 5,
    color: '#333',
  },
  assignedText: {
    color: '#666',
    fontStyle: 'italic',
  },
  assignPicker: {
    height: 50,
    width: 150,
    marginBottom: 10,
  },
  userContainer: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    // backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },

  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
});
