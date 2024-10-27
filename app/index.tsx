import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Colors from './constants/Colors';
import { AccountsProvider } from './AccountsContext';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import AccountsScreen from './screens/AccountsScreen';
import ProfileScreen from './screens/ProfileScreen';

export type RootTabParamList = {
  Home: undefined;
  Accounts: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Extend DefaultTheme to apply custom background
const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.background,
    text: Colors.text,
    border: Colors.accent,
    primary: Colors.accent,
    notification: Colors.accent,
  },
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <AccountsProvider>
          <NavigationContainer independent={true} theme={MyTheme}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: Colors.background },
                tabBarActiveTintColor: Colors.accent,
                tabBarInactiveTintColor: Colors.text,
                headerStyle: {
                  backgroundColor: Colors.background,
                  height: 60,
                },
                headerTitleStyle: {
                  fontSize: 18,
                },
                headerTintColor: Colors.text,
                tabBarIcon: ({ color, size }) => {
                  // Initialize iconName with a default icon
                  let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

                  if (route.name === 'Home') {
                    iconName = 'home-outline';
                  } else if (route.name === 'Accounts') {
                    iconName = 'wallet-outline';
                  } else if (route.name === 'Profile') {
                    iconName = 'person-outline';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
              <Tab.Screen name="Accounts" component={AccountsScreen} options={{ title: 'Accounts' }} />
              <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
            </Tab.Navigator>
          </NavigationContainer>
        </AccountsProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
