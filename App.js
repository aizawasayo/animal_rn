import 'react-native-gesture-handler';
import React from 'react';
import Provider from '@store'
import Routes from '@router';

const App = () => {
  return (
    <Provider>
      <Routes/>
    </Provider> 
  );
}

export default App;