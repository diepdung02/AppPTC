import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  HomeScreen,
  NotificationScreen,
  UserScreen,
  MailScreen,
  VoteScreen,
  ProductScreen,
  DetailProductScreen,
  LeaveRequestScreen,
  RequestMain,
  DetailRequest,
  DetailOvertime,
  OvertimeScreen,
  ScheduleScreen,
} from "./screen/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "react-native";
import { RootStackParamList } from "./screen/navigator/natigation";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const sampleData = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/150",
    title: "Sản phẩm 1",
    detail: [
      { key: "Mô tả", info: "Chi tiết 1" },
      { key: "Giá", info: "1000 VND" },
    ],
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/150",
    title: "Sản phẩm 2",
    detail: [
      { key: "Mô tả", info: "Chi tiết 2" },
      { key: "Giá", info: "2000 VND" },
    ],
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/150",
    title: "Sản phẩm 3",
    detail: [
      { key: "Mô tả", info: "Chi tiết 3" },
      { key: "Giá", info: "3000 VND" },
    ],
  },
  {
    id: 4,
    imageUrl: "https://via.placeholder.com/150",
    title: "Sản phẩm 4",
    detail: [
      { key: "Mô tả", info: "Chi tiết 4" },
      { key: "Giá", info: "4000 VND" },
    ],
  },
  {
    id: 5,
    imageUrl: "https://via.placeholder.com/150",
    title: "Sản phẩm 5",
    detail: [
      { key: "Mô tả", info: "Chi tiết 5" },
      { key: "Giá", info: "5000 VND" },
    ],
  },
];

const HomeTabNavigator: React.FC = () => {
  return (
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
        component={MailScreen}
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
        component={VoteScreen}
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
};

const App: React.FC = () => {
  return (
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
          options={{ headerShown: false }}
        >
          {(props) => <OvertimeScreen {...props} data={sampleData} />}
        </Stack.Screen>
        <Stack.Screen
          name="DetailOvertime"
          component={DetailOvertime}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestMain"
          options={{ headerShown: false }}
        >
          {(props) => <RequestMain {...props} data={sampleData} />}
        </Stack.Screen>
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
          options={{ headerShown: false }}
        >
          {(props) => <ProductScreen {...props} data={sampleData} />}
        </Stack.Screen>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
