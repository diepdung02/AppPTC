import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { Image } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { PersistGate } from "redux-persist/integration/react";
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
  LeftDeptScreen,
  CreateLeftDept,
  DetailLeftDept,
  ApproveLeaveScreen,
  ManagerHomeScreen,
  ManagerNotification,
  ManagerNotificationDetail,
  ManagerMailScreen,
  ManagerMailDetail,
  EvaluateScreen,
  VoteScreen,
  BenefitScreen,
  SalaryScreen,
  ErrorScreen,
  ErrorDetailScreen,
  CheckDetailScreen,
  Output,
  CheckGoodsScreen,
  ManagerEvaluteScreen,
  CheckGoodsDetailScreen,
  UploadQcImageScreen,
  UploadCarCassScreen,
  UpLoadImageProduct,
  ReportImageScreen
} from "./screen/index";
import { RootStackParamList } from "./screen/navigator/navigation";

import store, { persistor } from './redux/Slice/store';



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
            source={{uri:('https://img.upanh.tv/2024/07/22/logo864d13eedac01b24.png')}}
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
const ManagerHomeTabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="ManagerHomeTab"
    screenOptions={{
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { display: "flex" },
    }}
  >
    <Tab.Screen
      name="ManagerHomeTab"
      component={ManagerHomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={{uri:('https://img.upanh.tv/2024/07/22/logo864d13eedac01b24.png')}}
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
      name="ManagerMail"
      component={ManagerMailScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="email" color={color} size={size} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="ManagerNotifications"
      component={ManagerNotification}
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
          name="ManagerHomeScreen"
          component={ManagerHomeTabNavigator}
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
        <Stack.Screen
          name="LeftDeptScreen"
          component={LeftDeptScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateLeftDept"
          component={CreateLeftDept}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailLeftDept"
          component={DetailLeftDept}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApproveLeaveScreen"
          component={ApproveLeaveScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManagerNotificationDetail"
          component={ManagerNotificationDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManagerMailScreen"
          component={ManagerMailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManagerMailDetail"
          component={ManagerMailDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EvaluateScreen"
          component={EvaluateScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VoteScreen"
          component={VoteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BenefitScreen"
          component={BenefitScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SalaryScreen"
          component={SalaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ErrorScreen"
          component={ErrorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ErrorDetailScreen"
          component={ErrorDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckDetailScreen"
          component={CheckDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Output"
          component={Output}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckGoodsScreen"
          component={CheckGoodsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManagerEvaluteScreen"
          component={ManagerEvaluteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckGoodsDetailScreen"
          component={CheckGoodsDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadQcImageScreen"
          component={UploadQcImageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadCarCassScreen"
          component={UploadCarCassScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpLoadImageProduct"
          component={UpLoadImageProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportImageScreen"
          component={ReportImageScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    </PersistGate>
  </Provider>
);

export default App;
