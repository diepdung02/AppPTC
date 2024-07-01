import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../../constants/Color"; // Ensure this path is correct for your color constants
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/natigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LeaveRequest'>; 
}

const RequestMain: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LeaveRequest')}
        style={styles.addButton}
      >
        <MaterialCommunityIcons name="plus-circle" size={50} color="white" />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <View style={[styles.leaveItem, { backgroundColor: "#D4F4F9", borderColor: "#4874E3" }]}>
          <Text style={styles.text}>Số ngày phép còn lại</Text>
          <Text style={styles.text}>3</Text>
        </View>
        <View style={[styles.leaveItem, { backgroundColor: "#4FDEF1", borderColor: "#4874E3" }]}>
          <Text style={styles.text}>Số ngày phép đã duyệt</Text>
          <Text style={styles.text}>3</Text>
        </View>
        <View style={[styles.leaveItem, { backgroundColor: "#F3ECA8", borderColor: "#F6FF00" }]}>
          <Text style={styles.text}>Số ngày phép đang chờ</Text>
          <Text style={styles.text}>3</Text>
        </View>
        <View style={[styles.leaveItem, { backgroundColor: "#FEB0B0", borderColor: "#FF4E4E" }]}>
          <Text style={styles.text}>Số ngày phép bị hủy</Text>
          <Text style={styles.text}>3</Text>
        </View>
      </View>
      <View style={styles.status}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.statusText}>Sắp tới</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.statusText}>Sắp tới</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain, // Ensure COLORS.colorMain is defined in your constants
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#29D6D6",
    borderRadius: 30,
    padding: 10,
    elevation: 8,
  },
  centerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  leaveItem: {
    width: 120,
    height: 100,
    margin: 20,
    borderRadius: 3,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  status: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#29D6D6",
  },
  statusText: {
    textAlign: "center",
    color: "black",
  },
});

export default RequestMain;
