import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import { useDispatch } from "react-redux";
import { addEmail } from "../../../redux/Slice/mailSlice";
import { addEmailNotification } from "../../../redux/managerSlice/managerNotificationSlice";
import { v4 as uuidv4 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import COLORS from '../../../constants/Color';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const getScaledSize = (size: number) => {
  const minWidth = 320;  
  const maxWidth = 1024; 

  const width = Dimensions.get('window').width;


  const scaleWidth = initialWidth / 375; 
  const scaleHeight = initialHeight / 667; 

  const scale = Math.min(scaleWidth, scaleHeight);

  if (width < minWidth) {
    return size * 0.5; 
  } else if (width > maxWidth) {
    return size * 1.2; 
  } else {
    return size * scale;
  }
};

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
      <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center p-${getScaledSize(4)} shadow-md mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-${getScaledSize(10)} h-${getScaledSize(10)} items-center justify-center`}>
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[tw` ml-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(18), textAlign: 'center', flex: 1 }]}>
          Gửi mail
        </Text>
      </View>
        <View style={tw`p-5`}>
          <Text>To:</Text>
          <TextInput
            style={tw`h-10 border border-gray-300 rounded-md p-2 bg-white mb-4`}
            value={managerEmail}
            editable={false}
          />
          <TextInput
            style={tw`h-10 border border-gray-300 rounded-md p-2 bg-white mb-4`}
            placeholder="Chủ đề"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2 bg-white mb-4`}
            placeholder="Nội dung"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={20}
          />
          <TouchableOpacity style={tw`bg-blue-500 p-4 rounded-md`} onPress={handleSendEmail}>
            <Text style={tw`text-white text-center text-base`}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SendEmailScreen;
