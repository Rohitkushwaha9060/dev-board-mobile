import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {AuthNavigation} from './src/navigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
