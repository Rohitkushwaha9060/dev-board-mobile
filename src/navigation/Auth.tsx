import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen, SignUpScreen} from '../screens/Auth';
import {COLORS} from '../constants';
import {MainNavigation} from './Main';
import {useAuthStore} from '../store';

const Stack = createNativeStackNavigator();

export function AuthNavigation() {
  const auth = useAuthStore();
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Dev Board',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 20,
          color: COLORS.white,
        },
      }}
      initialRouteName="SignIn">
      {auth?.auth?.isAuth ? (
        <Stack.Screen
          name="Main"
          component={MainNavigation}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
