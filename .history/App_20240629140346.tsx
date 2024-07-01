import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LoginScreen, HomeScreen, TabScreen } from './screen/index';  
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLORS from './constants/Color';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();





const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      const TabScreen:React.FC = () =>{
     return(
          <Tab.Navigator>
               <Tab.Screen name="Home" component={HomeScreen} />
               <Tab.Screen name="Mail" component={MailScreen} />
               <Tab.Screen name="Vote" component={VoteScreen} />
               <Tab.Screen name="Notificatiom" component={NotificationScreen} />
               <Tab.Screen name="User" component={UserScreen} />
          </Tab.Navigator>
     )
}
    
    </NavigationContainer>


export default App;
