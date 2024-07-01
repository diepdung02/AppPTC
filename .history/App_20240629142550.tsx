import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen, HomeScreen, MailScreen, NotificationScreen, UserScreen, VoteScreen } from './screen/index';
import COLORS from './constants/Color';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import LoginScreen from './auth/LoginScreen';
import HomeScreen from './home/HomeScreen';
// screen/index.tsx

export { default as MailScreen } from './home/MailScreen';
export { default as NotificationScreen } from './home/NotificationScreen';
export { default as UserScreen } from './home/UserScreen';
export { default as VoteScreen } from './home/VoteScreen';


export{
    LoginScreen,
    HomeScreen,
 
}

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
