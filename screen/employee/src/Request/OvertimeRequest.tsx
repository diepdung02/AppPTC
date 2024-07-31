import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addOvertimeRequest, OvertimeRequest } from '../../../../redux/Slice/overtimeSlice';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addManagerNotification, ManagerNotificationItem } from '../../../../redux/managerSlice/managerNotificationSlice';
import tw from 'twrnc';
import { StackNavigationProp } from '@react-navigation/stack';
import COLORS from '../../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Calculate scale based on the smaller ratio
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

type Props = {
  navigation: StackNavigationProp<{}>;
};

const OverTimeRequest: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [reason, setReason] = useState<string>('');
  const [overtimeCode, setOvertimeCode] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState<boolean>(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState<boolean>(false);
  const [currentOvertimeNumber, setCurrentOvertimeNumber] = useState<number>(1);

  useEffect(() => {
    const loadOvertimeNumber = async () => {
      try {
        const savedNumber = await AsyncStorage.getItem('currentOvertimeNumber');
        if (savedNumber !== null) {
          setCurrentOvertimeNumber(parseInt(savedNumber));
        }
      } catch (error) {
        console.error('Lỗi khi tải currentOvertimeNumber:', error);
      }
    };
    loadOvertimeNumber();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const showTimePicker = (field: 'start' | 'end') => {
    if (field === 'start') {
      setStartTimePickerVisibility(true);
    } else if (field === 'end') {
      setEndTimePickerVisibility(true);
    }
  };

  const hideTimePicker = () => {
    setStartTimePickerVisibility(false);
    setEndTimePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    if (isStartTimePickerVisible) {
      setStartTime(time);
    } else if (isEndTimePickerVisible) {
      setEndTime(time);
    }
    hideTimePicker();
  };

  const handleReasonChange = (text: string) => {
    const cleanedText = text.replace(/^\s*\n/gm, '');
    setReason(cleanedText);
  };

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Enter') {
      setReason(reason);
    }
  };

  const saveOvertimeNumber = async (number: number) => {
    try {
      await AsyncStorage.setItem('currentOvertimeNumber', number.toString());
    } catch (error) {
      console.error('Lỗi khi lưu currentOvertimeNumber:', error);
    }
  };

  const generateOvertimeCode = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const overtimeCode = `${year}${month}${day}${currentOvertimeNumber.toString().padStart(4, '0')}`;
    return overtimeCode;
  };

  const notifyManager = async (newRequest: OvertimeRequest) => {
    const startDateTime = new Date(date!);
    startDateTime.setHours(startTime!.getHours());
    startDateTime.setMinutes(startTime!.getMinutes());

    const notification: ManagerNotificationItem = {
      id: Math.random().toString(),
      title: 'Đơn xin tăng ca',
      summary: `Nhân viên đã gửi đơn xin tăng ca từ: ${startTime?.toLocaleTimeString()} đến ${endTime?.toLocaleTimeString()}`,
      date: new Date().toLocaleDateString(),
      icon: 'https://example.com/icon.png',
      image: 'https://example.com/icon.png',
      code: generateOvertimeCode(),
      startDate: startDateTime.toLocaleDateString(),
    };

    dispatch(addManagerNotification(notification));

    try {
      const existingNotifications = await AsyncStorage.getItem('managerNotifications');
      let parsedNotifications = existingNotifications ? JSON.parse(existingNotifications) : [];
      parsedNotifications.push(notification);
      await AsyncStorage.setItem('managerNotifications', JSON.stringify(parsedNotifications));
    } catch (error) {
      console.error('Lỗi khi lưu thông báo cho quản lý:', error);
    }
  };

  const handleSubmit = async () => {
    if (date && startTime && endTime && reason) {
      const startDateTime = new Date(date);
      startDateTime.setHours(startTime.getHours());
      startDateTime.setMinutes(startTime.getMinutes());

      const endDateTime = new Date(date);
      endDateTime.setHours(endTime.getHours());
      endDateTime.setMinutes(endTime.getMinutes());

      const newRequest: OvertimeRequest = {
        id: Math.random(),
        startDate: startDateTime.toLocaleDateString(),
        startTime: startDateTime.toLocaleTimeString(),
        endTime: endDateTime.toLocaleTimeString(),
        reason,
        status: 'Đang chờ duyệt',
        createdAt: new Date().toLocaleDateString(),
        code: generateOvertimeCode(),
      };

      dispatch(addOvertimeRequest(newRequest));

      try {
        const existingRequests = await AsyncStorage.getItem('overtimeRequests');
        let parsedRequests = existingRequests ? JSON.parse(existingRequests) : [];
        parsedRequests.push(newRequest);
        await AsyncStorage.setItem('overtimeRequests', JSON.stringify(parsedRequests));

        // Hiển thị mã yêu cầu
        setOvertimeCode(newRequest.code);
        console.log('Mã yêu cầu:', newRequest.code);

        // Thông báo cho quản lý
        await notifyManager(newRequest);

        console.log('Yêu cầu tăng ca mới:', newRequest);
        navigation.goBack();
        Alert.alert('Đã gửi đơn', `Mã yêu cầu của bạn là: ${newRequest.code}`);
      } catch (error) {
        console.error('Lỗi khi lưu yêu cầu tăng ca:', error);
        Alert.alert('Đã xảy ra lỗi khi lưu đơn tăng ca.');
      }
    } else {
      Alert.alert('Vui lòng điền đầy đủ thông tin.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={[tw`flex-1 `, {backgroundColor:COLORS.colorMain}]}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center p-${getScaledSize(2)}`}>
          <TouchableOpacity
          onPress={() => navigation.goBack()} 
          style={[tw`p-2`, { borderRadius: 50 }]} 
          activeOpacity={0.7} 
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
           <Text style={[tw`text-xl flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(20) }]}>
          Xin tăng ca
        </Text>
          </View>
          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
            <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Ngày tăng ca:</Text>
            <TouchableOpacity
              style={[tw`flex-row items-center h-${getScaledSize(14)} border border-white rounded pl-${getScaledSize(2)} `,{backgroundColor:COLORS.white} ]}
              onPress={showDatePicker}
            >
              <Text style={[tw`flex-1 `,{ color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]} >{date ? date.toDateString() : 'Chọn ngày tăng ca'}</Text>
              <FontAwesome name="calendar" size={getScaledSize(20)} color="black" style={tw`mr-${getScaledSize(5)}`} />
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirmDate} onCancel={hideDatePicker} />
          </View>
          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
            <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Giờ bắt đầu:</Text>
            <TouchableOpacity
              style={[tw`flex-row items-center  h-${getScaledSize(14)} border border-white rounded pl-${getScaledSize(2)} `, {backgroundColor:COLORS.white}]}
              onPress={() => showTimePicker('start')}
            >
              <Text style={[tw`flex-1 `, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>{startTime ? startTime.toLocaleTimeString() : 'Chọn giờ bắt đầu'}</Text>
              <FontAwesome name="clock-o" size={getScaledSize(20)} color="black" style={tw`mr-${getScaledSize(5)}`} />
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isStartTimePickerVisible} mode="time" onConfirm={handleConfirmTime} onCancel={hideTimePicker} />
          </View>
          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
            <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Giờ kết thúc:</Text>
            <TouchableOpacity
              style={[tw`flex-row items-center h-${getScaledSize(14)} border border-white rounded pl-${getScaledSize(2)} `, {backgroundColor:COLORS.white}]}
              onPress={() => showTimePicker('end')}
            >
              <Text style={[tw`flex-1 `, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>{endTime ? endTime.toLocaleTimeString() : 'Chọn giờ kết thúc'}</Text>
              <FontAwesome name="clock-o" size={getScaledSize(20)} color="black" style={tw`mr-${getScaledSize(5)}`} />
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isEndTimePickerVisible} mode="time" onConfirm={handleConfirmTime} onCancel={hideTimePicker} />
          </View>
          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
            <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Lý do:</Text>
            <TextInput
              style={[tw`border border-white rounded p-${getScaledSize(2)} h-50`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16), backgroundColor:COLORS.white }]}
              value={reason}
              onChangeText={handleReasonChange}
              placeholder="Nhập lý do..."
              multiline
              onKeyPress={handleKeyPress}
              placeholderTextColor={COLORS.red}
            />
          </View>
          <View style={tw`flex-row justify-center mt-${getScaledSize(5)}`}>
            <TouchableOpacity
              style={[tw` py-${getScaledSize(3)} px-${getScaledSize(20)} rounded-full`, {backgroundColor:COLORS.primary}]}
              onPress={handleSubmit}
            >
              <Text style={[tw``, {fontFamily: 'CustomFont-Regular', color:COLORS.white, fontSize:getScaledSize(20)}]}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


export default OverTimeRequest;
