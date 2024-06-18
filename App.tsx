import React from 'react';

import store from './src/app/redux/store';
import {Provider} from 'react-redux';
import TaskApp from './src/features/task/TaskApp';

export default function App() {
  return (
    <Provider store={store}>
      <TaskApp />
    </Provider>
  );
}
