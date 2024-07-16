import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../constants/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { addOvertimeRequest, OvertimeRequest } from '../../../redux/overtime/overtimeSlice';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: StackNavigationProp<{}>;
}

const OverTimeRequest: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [reason, setReason] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState<boolean>(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState<boolean>(false);
  const [currentRequestNumber, setCurrentRequestNumber] = useState<number>(1);

  useEffect(() => {
    const loadRequestNumber = async () => {
      try {
        const savedNumber = await AsyncStorage.getItem('currentRequestNumber');
        if (savedNumber !== null) {
          setCurrentRequestNumber(parseInt(savedNumber));
        }
      } catch (error) {
        console.error('Error loading currentRequestNumber:', error);
      }
    };
    loadRequestNumber();
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

  const saveRequestNumber = async (number: number) => {
    try {
      await AsyncStorage.setItem('currentRequestNumber', number.toString());
    } catch (error) {
      console.error('Error saving currentRequestNumber:', error);
    }
  };

  const generateRequestCode = (): string => {
    const requestCode = `202407${currentRequestNumber.toString().padStart(2, '0')}RTC`;
    return requestCode;
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
        code: generateRequestCode(),
      };
  
      dispatch(addOvertimeRequest(newRequest));
  
      try {
        const existingRequests = await AsyncStorage.getItem('overtimeRequests');
        let parsedRequests = existingRequests ? JSON.parse(existingRequests) : [];
        parsedRequests.push(newRequest);
        await AsyncStorage.setItem('overtimeRequests', JSON.stringify(parsedRequests));
  
        setCurrentRequestNumber((prev) => {
          const newRequestNumber = prev + 1;
          saveRequestNumber(newRequestNumber);
          return newRequestNumber;
        });
  
        console.log('New Overtime Request:', newRequest);
        navigation.goBack();
        Alert.alert('Đã gửi đơn');
      } catch (error) {
        console.error('Error saving overtime request:', error);
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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
              <FontAwesome name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Xin tăng ca</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày tăng ca:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={showDatePicker}
            >
              <Text style={styles.dateText}>{date ? date.toDateString() : 'Chọn ngày tăng ca'}</Text>
              <FontAwesome name="calendar" size={wp('5%')} color="black" style={styles.calendarIcon} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Giờ bắt đầu:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => showTimePicker('start')}
            >
              <Text style={styles.dateText}>{startTime ? startTime.toLocaleTimeString() : 'Chọn giờ bắt đầu'}</Text>
              <FontAwesome name="calendar" size={wp('5%')} color="black" style={styles.calendarIcon} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Giờ kết thúc:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => showTimePicker('end')}
            >
              <Text style={styles.dateText}>{endTime ? endTime.toLocaleTimeString() : 'Chọn giờ kết thúc'}</Text>
              <FontAwesome name="calendar" size={wp('5%')} color="black" style={styles.calendarIcon} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Lý do:</Text>
            <TextInput
              style={styles.inputNote}
              multiline
              placeholder="Nhập lý do xin tăng ca"
              value={reason}
              onChangeText={handleReasonChange}
              onKeyPress={handleKeyPress}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  formGroup: {
    margin: wp('5%'),
  },
  label: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: '#000',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('6%'),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingLeft: wp('2%'),
    backgroundColor: 'white',
  },
  dateText: {
    flex: 1,
    color: 'black',
    fontSize: wp('4%'),
  },
  calendarIcon: {
    marginRight: wp('2%'),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    margin: wp('10%'),
    backgroundColor: '#2738C2',
    borderRadius: 5,
    padding: hp('2%'),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp('4.5%'),
    color: 'white',
  },
  inputNote: {
    height: hp('20%'),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingLeft: wp('2%'),
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.colorMain,
    padding: wp('2%'),
  },
  goBack: {
    marginRight: wp('5%'),
  },
  headerTitle: {
    fontSize: wp('5%'),
    color: 'black',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: wp('4%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'black',
    paddingRight: wp('30%'),
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: wp('4%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('2%'),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'black',
    paddingRight: wp('30%'),
    backgroundColor: 'white',
  },
});

export default OverTimeRequest;
