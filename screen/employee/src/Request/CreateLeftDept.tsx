import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import COLORS from '../../../../constants/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { addCreateLeftDept, CreateLeftDept as LeftDeptType } from '../../../../redux/Slice/leftDeptSlice'; // Rename the import to avoid conflict
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { MaterialCommunityIcons } from "@expo/vector-icons";


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
  navigation: StackNavigationProp<{}>;
}

const CreateLeftDeptScreen: React.FC<Props> = ({ navigation }) => { 
  const dispatch = useDispatch();

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [reason, setReason] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState<boolean>(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    if (date && startTime && endTime && reason) {
      const startDateTime = new Date(date);
      startDateTime.setHours(startTime.getHours());
      startDateTime.setMinutes(startTime.getMinutes());

      const endDateTime = new Date(date);
      endDateTime.setHours(endTime.getHours());
      endDateTime.setMinutes(endTime.getMinutes());

      const newRequest: LeftDeptType = {
        id: Math.random(),
        startDate: startDateTime.toLocaleDateString(),
        startTime: startDateTime.toLocaleTimeString(),
        endTime: endDateTime.toLocaleTimeString(),
        reason,
        status: 'Đang chờ duyệt',
      };

      dispatch(addCreateLeftDept(newRequest));

      try {
        const existingRequests = await AsyncStorage.getItem('leftDeptRequests');
        let parsedRequests = existingRequests ? JSON.parse(existingRequests) : [];
        parsedRequests.push(newRequest);
        await AsyncStorage.setItem('leftDeptRequests', JSON.stringify(parsedRequests));
      } catch (error) {
        console.error('Error saving left department request:', error);
      }

      console.log('New Left Department Request:', newRequest);
      navigation.goBack();
      Alert.alert('Đã gửi đơn');
    } else {
      Alert.alert('Vui lòng điền đầy đủ thông tin.');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, {backgroundColor:COLORS.colorMain}]}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={tw`flex-1`}>
        <View  style={[
          tw`flex-row items-center mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white, padding: getScaledSize(10) },
        ]}>
          <TouchableOpacity
          onPress={() => navigation.goBack()} 
          style={[tw`p-2`, { borderRadius: 50 }]} 
          activeOpacity={0.7} 
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
           <Text style={[tw`text-xl flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(20) }]}>
          Xin ra vào cổng
        </Text>
          </View>
          <View style={tw`mx-${getScaledSize(5)} mt-${getScaledSize(5)}`}>
            <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Ngày :</Text>
            <TouchableOpacity
              style={[tw`flex-row items-center h-${getScaledSize(14)} border border-white rounded pl-${getScaledSize(2)} `,{backgroundColor:COLORS.white} ]}
              onPress={showDatePicker}
            >
              <Text style={[tw`flex-1 `,{ color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]} >{date ? date.toDateString() : 'Chọn ngày '}</Text>
              <FontAwesome name="calendar" size={getScaledSize(20)} color="black" style={tw`mr-${getScaledSize(5)}`} />
            </TouchableOpacity>
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirmDate} onCancel={hideDatePicker} />
          </View>
          <View style={tw`mx-${getScaledSize(5)} mt-${getScaledSize(3)}`}>
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
          <View style={tw`mx-${getScaledSize(5)} mt-${getScaledSize(3)}`}>
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
          <View style={tw`mx-${getScaledSize(5)} mt-${getScaledSize(3)}`}>
            <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Lý do:</Text>
            <TextInput
              style={[tw`border border-white rounded p-${getScaledSize(2)} h-50`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16), backgroundColor:COLORS.white }]}
              value={reason}
              onChangeText={handleReasonChange}
              placeholder="Nhập lý do..."
              multiline
              onKeyPress={handleKeyPress}
              placeholderTextColor={COLORS.black}
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



export default CreateLeftDeptScreen;
