import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigator/navigation";
import COLORS from "../../constants/Color";


type ManagerNotificationDetailRouteProp = RouteProp<
  RootStackParamList,
  "ManagerNotificationDetail"
>;

type Props = {
  route: ManagerNotificationDetailRouteProp;
  navigation: StackNavigationProp<
    RootStackParamList,
    "ManagerNotificationDetail"
  >;
};

const ManagerNotificationDetail: React.FC<Props> = ({ route }) => {
  const { notification } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.code}>{notification.code}</Text>
        <Text style={styles.date}>{notification.date}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.colorMain,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  code: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
});

export default ManagerNotificationDetail;
