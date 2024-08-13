import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import COLORS from "../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import { useDispatch } from "react-redux";
import { addEmail } from "../../../redux/Slice/mailSlice";
import { addEmailNotification } from "../../../redux/managerSlice/managerNotificationSlice"; 
import { v4 as uuidv4 } from "uuid";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Calculate scale
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

// Function to get scaled size
const getScaledSize = (size: number) => Math.round(size * scale);

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "SendMail">;
};

const managerEmail = "manager@example.com";

const SendEmailScreen: React.FC<Props> = ({ navigation }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendEmail = () => {
    if (!subject || !message) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    const emailPayload = {
      id: uuidv4(),
      to: managerEmail,
      subject,
      message,
      timestamp: new Date().toLocaleString(),
    };

    dispatch(addEmail(emailPayload));

    const notificationPayload = {
      id: uuidv4(),
      title: "Thông báo email mới",
      code: "",
      summary: `Email gửi tới ${managerEmail} với chủ đề: ${subject}`,
      date: new Date().toLocaleString(),
      icon: "", 
      image: "", 
      startDate: new Date().toISOString(), 
    };

    dispatch(addEmailNotification(notificationPayload));

    Alert.alert("Thành công", "Đã gửi mail thành công");
    setSubject("");
    setMessage("");
    navigation.goBack();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gửi Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text>To:</Text>
          <TextInput
            style={styles.inputEmail}
            value={managerEmail}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Chủ đề"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Nội dung"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    padding: 20,
  },
  inputEmail: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  input: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    height: "50%",
  },
  button: {
    backgroundColor: COLORS.blue,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SendEmailScreen;
