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
  } from "react-native";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import COLORS from "../../../constants/Color"; // Đảm bảo bạn import đúng đường dẫn đến file Color.js nếu có
  import { StackNavigationProp } from "@react-navigation/stack";
  import { RootStackParamList } from "../../navigator/navigation"; // Điều chỉnh đường dẫn nếu cần thiết
  import { useDispatch } from "react-redux";
  import { addEmail } from "../../../redux/Slice/mailSlice"; // Điều chỉnh đường dẫn nếu cần thiết
  import { v4 as uuidv4 } from "uuid";

  type Props = {
    navigation: StackNavigationProp<RootStackParamList, "SendMail">;
  };

  const fixedRecipientEmail = "example@example.com";

  const SendEmailScreen: React.FC<Props> = ({ navigation }) => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [reason, setReason] = useState<string>("");
    const dispatch = useDispatch();

    const handleSendEmail = () => {
      if (!subject || !message) {
        Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
        return;
      }

      const emailPayload = {
        id: uuidv4(),
        to: fixedRecipientEmail,
        subject,
        message,
        timestamp: new Date().toLocaleString(), // Bảo đảm thêm thời gian khi gửi email
      };

      dispatch(addEmail(emailPayload));

      Alert.alert("Thành công", "Đã gửi mail thành công");
      setSubject("");
      setMessage("");
      navigation.goBack();
    };

    const handleReasonChange = (text: string) => {
      const cleanedText = text.trim(); // Loại bỏ khoảng trắng ở đầu và cuối dòng
      setReason(cleanedText);
      setMessage(cleanedText); // Cập nhật cả message nếu cần
    };

    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Gửi Email</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text>To:</Text>
            <TextInput
              style={styles.inputEmail}
              value={fixedRecipientEmail}
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
              onChangeText={(text) => handleReasonChange(text)} // Sử dụng hàm handleReasonChange để xử lý
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
    inputEmail:{
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
