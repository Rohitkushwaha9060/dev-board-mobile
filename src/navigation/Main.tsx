import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlogsScreen, HomeScreen} from '../screens/Main';
import {COLORS} from '../constants';
//@ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color = '#fff', size = 22}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Blogs') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'QAs') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarActiveTintColor: COLORS.white,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Blogs" component={BlogsScreen} />
      <Tab.Screen name="QAs" component={BlogsScreen} />
      <Tab.Screen name="Profile" component={BlogsScreen} />
    </Tab.Navigator>
  );
}
