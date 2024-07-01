import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MailScreen from "./MailScreen";
import NotificationScreen from "./NotificationScreen";
import UserScreen from "./UserScreen";
import VoteScreen from "./VoteScreen";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();
const TabScreen = () =>{
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