import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../constants/Color'; // Adjust path as per your project structure
import { StackNavigationProp } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LeaveRequest, addLeaveRequest } from '../../../redux/overtime/leaveSlice'; // Adjust path as per your project structure

type Props = {
  navigation: StackNavigationProp<{}>;
}

const LeaveRequestScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [selectedDateField, setSelectedDateField] = useState<'start' | 'end' | null>(null);
  const [currentRequestNumber, setCurrentRequestNumber] = useState<number>(1); // Initialize with 1

  useEffect(() => {
    // Function to retrieve currentRequestNumber from AsyncStorage
    const fetchCurrentRequestNumber = async () => {
      try {
        const number = await AsyncStorage.getItem('currentRequestNumber');
        if (number) {
          setCurrentRequestNumber(parseInt(number, 10)); // Parse retrieved number
        }
      } catch (error) {
        console.error('Error fetching currentRequestNumber:', error);
      }
    };

    fetchCurrentRequestNumber(); // Call function on component mount
  }, []);

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
    if (startDate && endDate && leaveType && reason) {
      const newRequest: LeaveRequest = {
        id: Math.random(),
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        leaveType,
        reason,
        status: 'Đang chờ duyệt',
        createdAt: new Date().toLocaleDateString(),
        code: generateRequestCode(), // Generate and assign request code
      };

      dispatch(addLeaveRequest(newRequest));

      try {
        const existingRequests = await AsyncStorage.getItem('leaveRequests');
        let parsedRequests = existingRequests ? JSON.parse(existingRequests) : [];
        parsedRequests.push(newRequest);
        await AsyncStorage.setItem('leaveRequests', JSON.stringify(parsedRequests));

        // Increment currentRequestNumber and save it back to AsyncStorage
        const incrementedNumber = currentRequestNumber + 1;
        setCurrentRequestNumber(incrementedNumber);
        saveRequestNumber(incrementedNumber);
      } catch (error) {
        console.error('Error saving leave request:', error);
      }

      console.log('New Leave Request:', newRequest);
      navigation.goBack();
      Alert.alert('Đã gửi đơn');
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

  const leaveTypes = ['Nghỉ phép năm', 'Nghỉ bệnh', 'Nghỉ thai sản', 'Nghỉ không lương'];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
              <FontAwesome name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Xin nghỉ phép</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày bắt đầu:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => showDatePicker('start')}
            >
              <Text style={styles.dateText}>{startDate ? startDate.toDateString() : 'Chọn ngày bắt đầu'}</Text>
              <FontAwesome name="calendar" size={wp('5%')} color="black" style={styles.calendarIcon} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible && selectedDateField === 'start'}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày kết thúc:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => showDatePicker('end')}
            >
              <Text style={styles.dateText}>{endDate ? endDate.toDateString() : 'Chọn ngày kết thúc'}</Text>
              <FontAwesome name="calendar" size={wp('5%')} color="black" style={styles.calendarIcon} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible && selectedDateField === 'end'}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Lựa chọn loại nghỉ phép:</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setLeaveType(value)}
                items={leaveTypes.map((type) => ({ label: type, value: type }))}
                style={pickerSelectStyles}
                placeholder={{ label: 'Chọn loại nghỉ phép', value: null }}
                value={leaveType}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Lý do xin nghỉ:</Text>
            <TextInput
              style={styles.inputNote}
              multiline
              placeholder="Nhập lý do xin nghỉ"
              value={reason}
              onChangeText={handleReasonChange}
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
    backgroundColor: COLORS.colorMain, // Assuming you have a colorMain defined in your COLORS constant
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
    fontWeight: 'bold',
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
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  goBack: {
    padding: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: wp('4%'),
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  inputAndroid: {
    fontSize: wp('4%'),
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
});

export default LeaveRequestScreen;
