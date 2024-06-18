import React from 'react';

import store from './src/app/store';
import {Provider} from 'react-redux';
import Counter from './src/features/counter/Counter';

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
