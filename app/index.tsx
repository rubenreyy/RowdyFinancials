import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import AccountsScreen from './screens/AccountsScreen';
import ProfileScreen from './screens/ProfileScreen';

// Define the type for navigation parameters (optional)
export type RootTabParamList = {
  Home: undefined;
  Accounts: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#32292F' },
          tabBarActiveTintColor: '#D1E3DD',
          tabBarInactiveTintColor: '#D1E3DD',
          headerStyle: { backgroundColor: '#32292F' },
          headerTintColor: '#D1E3DD',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Tab.Screen 
          name="Accounts" 
          component={AccountsScreen} 
          options={{ title: 'Accounts' }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profile' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
