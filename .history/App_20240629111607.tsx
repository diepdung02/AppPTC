import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LoginScreen, HomeScreen } from './screen/index';  
import COLORS from './constants/Color';


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeTabs: React.FC = () => (
  <Tab.Navigator screenOptions={
    {
      tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', marginTop:50, },
      tabBarStyle: { backgroundColor: COLORS.pink },
      tabBarIndicatorStyle: { backgroundColor: '#ff6347', height: 3 },
      tabBarActiveTintColor: '#ff6347',
      tabBarInactiveTintColor: '#555',
    }
  }>
    <Tab.Screen name="Schedule" component={Schedule} />
    <Tab.Screen name="Hr" component={Hr} />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
