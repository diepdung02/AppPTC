import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from 'react-native';
import tw from 'twrnc';
import COLORS from '../../../../constants/Color'; // Điều chỉnh đường dẫn theo cấu trúc dự án của bạn
import { StackNavigationProp } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LeaveRequest, addLeaveRequest } from '../../../../redux/Slice/leaveSlice';
import moment from 'moment';
import { addManagerNotification, ManagerNotificationItem } from '../../../../redux/managerSlice/managerNotificationSlice';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

// Kích thước cơ sở để điều chỉnh kích thước
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Tính toán tỷ lệ dựa trên tỷ lệ nhỏ hơn
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

type Props = {
  navigation: StackNavigationProp<{}>;
};

const LeaveRequestScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [selectedDateField, setSelectedDateField] = useState<'start' | 'end' | null>(null);

  const [currentRequestNumber, setCurrentRequestNumber] = useState<number>(1);

  const [remainingDaysOff, setRemainingDaysOff] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const number = await AsyncStorage.getItem('currentRequestNumber');
        const remainingDays = await AsyncStorage.getItem('remainingDaysOff');
        if (number) {
          setCurrentRequestNumber(parseInt(number, 10));
        }
        if (remainingDays) {
          setRemainingDaysOff(parseInt(remainingDays, 10));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const saveData = async (key: string, data: string) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  const generateRequestCode = (leaveType: string): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const leaveCodeMatch = leaveType.match(/\(([^)]+)\)/);
    const leaveCode = leaveCodeMatch ? leaveCodeMatch[1] : '';

    const requestCode = `${year}${month}${day}${currentRequestNumber.toString().padStart(4, '0')} R${leaveCode}`;
    return requestCode;
  };

  const calculateDaysOff = (start: string, end: string): number => {
    const startMoment = moment(start, 'DD-MM-YYYY');
    const endMoment = moment(end, 'DD-MM-YYYY');
    const days = endMoment.diff(startMoment, 'days') + 1;
    return days;
  };

  const handleSubmit = async () => {
    if (startDate && endDate && leaveType && reason) {
      const daysOff = calculateDaysOff(startDate.toLocaleDateString(), endDate.toLocaleDateString());

      if (remainingDaysOff >= daysOff) {
        const newRequest: LeaveRequest = {
          id: Math.random(),
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          leaveType,
          reason,
          status: 'Đang chờ duyệt',
          createdAt: new Date().toLocaleDateString(),
          code: generateRequestCode(leaveType),
          dayOffs: `${daysOff} ngày`,
          remainingDaysOff: `${remainingDaysOff - daysOff} ngày`,
          usedDaysOff: `${12 - (remainingDaysOff - daysOff)} ngày`,
        };

        dispatch(addLeaveRequest(newRequest));

        const notification: ManagerNotificationItem = {
          id: Math.random().toString(),
          title: 'Đơn nghỉ phép',
          summary: `Nhân viên Diệp Minh Dũng bộ phận ERP đã gửi đơn xin nghỉ từ: ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()} (${leaveType})`,
          icon: 'https://example.com/image.png',
          date: new Date().toLocaleDateString(),
          image: 'https://example.com/image.png',
          code: generateRequestCode(leaveType),
          startDate: startDate.toLocaleDateString(),
        };

        dispatch(addManagerNotification(notification));

        try {
          const existingRequests = await AsyncStorage.getItem('leaveRequests');
          const parsedRequests = existingRequests ? JSON.parse(existingRequests) : [];
          parsedRequests.push(newRequest);
          await AsyncStorage.setItem('leaveRequests', JSON.stringify(parsedRequests));

          await saveData('remainingDaysOff', newRequest.remainingDaysOff.toString());

          const incrementedNumber = currentRequestNumber + 1;
          setCurrentRequestNumber(incrementedNumber);
          saveData('currentRequestNumber', incrementedNumber.toString());
        } catch (error) {
          console.error('Error saving data:', error);
        }
        console.log('New Leave Request:', newRequest);
        navigation.goBack();
        Alert.alert('Đã gửi đơn');
      } else {
        Alert.alert('Ngày nghỉ phép trong năm của bạn đã hết.');
      }
    } else {
      Alert.alert('Vui lòng điền đầy đủ thông tin.');
    }
  };

  const showDatePicker = (field: 'start' | 'end') => {
    setSelectedDateField(field);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    if (selectedDateField === 'start') {
      setStartDate(date);
    } else if (selectedDateField === 'end') {
      setEndDate(date);
    }
    hideDatePicker();
  };

  const handleReasonChange = (text: string) => {
    const cleanedText = text.replace(/^\s*\n/gm, '');
    setReason(cleanedText);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const leaveTypes = [
    'Nghỉ phép năm(AL)',
    'Nghỉ bệnh(S)',
    'Nghỉ thai sản(ML)',
    'Nghỉ không lương(U)',
    'Nghỉ kết hôn(MR)',
    'Nghỉ tang(BR)',
  ];

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
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
              Xin nghỉ phép
            </Text>
          </View>
          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
            <Text style={[tw`text-base mb-1`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Ngày bắt đầu:</Text>
            <TouchableOpacity style={tw`flex-row justify-between items-center h-14 rounded px-3 bg-white`} onPress={() => showDatePicker('start')}>
              <Text style={[tw`text-base`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>
                {startDate ? startDate.toDateString() : 'Chọn ngày bắt đầu'}
              </Text>
              <FontAwesome name="calendar" size={getScaledSize(20)} color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
            <Text style={[tw`text-base mb-1`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Ngày kết thúc:</Text>
            <TouchableOpacity style={tw`flex-row justify-between items-center h-14 rounded px-3 bg-white`} onPress={() => showDatePicker('end')}>
              <Text style={[tw`text-base`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>
                {endDate ? endDate.toDateString() : 'Chọn ngày kết thúc'}
              </Text>
              <FontAwesome name="calendar" size={getScaledSize(20)} color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
  <Text style={[tw`text-base mb-1`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Loại nghỉ phép:</Text>
  <RNPickerSelect
    onValueChange={value => setLeaveType(value)}
    items={leaveTypes.map(type => ({ label: type, value: type }))}
    placeholder={{ label: 'Chọn loại nghỉ phép', value: null }}
    style={{
      placeholder: {
        color: COLORS.black,
        fontSize: getScaledSize(16),
        fontFamily: 'CustomFont-Regular',
        borderRadius: 5,
        paddingLeft: 5,
        backgroundColor: COLORS.white,
        height:55
      },
    }}
    
  />
</View>

          <View style={tw`mx-${getScaledSize(5)} my-${getScaledSize(3)}`}>
            <Text style={[tw`text-base mb-1`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Lý do:</Text>
            <TextInput
              value={reason}
              onChangeText={handleReasonChange}
              multiline
              numberOfLines={4}
              placeholder="Nhập lý do..."
              placeholderTextColor={COLORS.darkGray}
              style={[tw` p-3 rounded h-50`, { fontSize: getScaledSize(16), color: COLORS.black, fontFamily: 'CustomFont-Regular', backgroundColor:COLORS.white }]}
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
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LeaveRequestScreen;
