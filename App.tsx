import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from 'react-redux';
import { Image } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { PersistGate } from 'redux-persist/integration/react';
import {
  LoginScreen,
  HomeScreen,
  NotificationScreen,
  UserScreen,
  MailScreen,
  NewsScreen,
  ProductScreen,
  DetailProductScreen,
  LeaveRequestScreen,
  RequestMain,
  DetailRequest,
  DetailOvertime,
  OvertimeScreen,
  ScheduleScreen,
  NewsDetailScreen,
  MailDetailScreen,
  SendEmailScreen,
  NotificationDetailScreen,
  OvertimeRequest,
  OutputScreen,
  OutputList,
} from "./screen/index";
import { RootStackParamList } from "./screen/navigator/natigation";
import store, { persistor } from './redux/overtime/store';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeTabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={{
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { display: "flex" },
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require("./assets/logo.png")}
            style={{ width: 30, height: 30 }}
          />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="News"
      component={NewsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="newspaper" color={color} size={size} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Mail"
      component={MailScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="email" color={color} size={size} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="User"
      component={UserScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
        tabBarLabel: () => null,
      }}
    />
  </Tab.Navigator>
);

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Overtime"
          component={OvertimeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailOvertime"
          component={DetailOvertime}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestMain"
          component={RequestMain}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailRequest"
          component={DetailRequest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaveRequest"
          component={LeaveRequestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={DetailProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MailDetail"
          component={MailDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendMail"
          component={SendEmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationDetail"
          component={NotificationDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OvertimeRequest"
          component={OvertimeRequest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutputScreen"
          component={OutputScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutputList"
          component={OutputList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
