import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../../constants/Color'; // Adjust path as per your project structure
import { StackNavigationProp } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LeaveRequest, addLeaveRequest } from '../../../../redux/Slice/leaveSlice'; // Adjust path as per your project structure
import moment from 'moment'; 
import { addManagerNotification, ManagerNotificationItem } from '../../../../redux/managerSlice/managerNotificationSlice';

type Props = {
  navigation: StackNavigationProp<{}>;
}

const LeaveRequestScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  // State for form inputs
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');

  // State for date picker visibility and selected date field
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [selectedDateField, setSelectedDateField] = useState<'start' | 'end' | null>(null);

  // State for current request number
  const [currentRequestNumber, setCurrentRequestNumber] = useState<number>(1); 

  // State for remaining days off
  const [remainingDaysOff, setRemainingDaysOff] = useState<number>(12); // Initialize with 12 days

  // Fetch current request number and remaining days off from AsyncStorage on component mount
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

  // Function to save data to AsyncStorage
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


  // Function to calculate days off between start and end dates
  const calculateDaysOff = (start: string, end: string): number => {
    const startMoment = moment(start, 'DD-MM-YYYY');
    const endMoment = moment(end, 'DD-MM-YYYY');
    const days = endMoment.diff(startMoment, 'days') + 1;
    return days;
  };

  // Function to handle form submission
  // Function to handle form submission
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
          summary: `Nhân viên đã gửi đơn xin nghỉ từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()} (${leaveType})`,
          icon: 'https://example.com/image.png',
          date: new Date().toLocaleDateString(),
          image: 'https://example.com/image.png',
          code: generateRequestCode(leaveType),
          startDate: startDate.toLocaleDateString(),
          
        };
  
        dispatch(addManagerNotification(notification));
  
        // Save data to AsyncStorage
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
    'Nghỉ phép năm(AL)',             // Annual leave
    'Nghỉ bệnh(S)',                 // Sick leave
    'Nghỉ thai sản(ML)',             // Maternity leave
    'Nghỉ không lương(U)',          // Unpaid leave
    'Nghỉ kết hôn(MR)',              // Marriage leave
    'Nghỉ tang(BR)',                 // Bereavement leave
];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
              <FontAwesome name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Xin nghỉ phép</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày bắt đầu:</Text>
            <TouchableOpacity style={styles.input} onPress={() => showDatePicker('start')}>
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
            <TouchableOpacity style={styles.input} onPress={() => showDatePicker('end')}>
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
    backgroundColor: COLORS.colorMain,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
  },
  formGroup: {
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: '#000',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('7%'),
    borderRadius: wp('1%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: wp('4%'),
    color: '#000',
  },
  calendarIcon: {
    marginLeft: wp('3%'),
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: wp('1%'),
    paddingHorizontal: wp('3%'),
    height: hp('7%'),
    justifyContent: 'center',
  },
  inputNote: {
    height: hp('15%'),
    borderRadius: wp('1%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('7%'),
    borderRadius: wp('1%'),
    marginTop: hp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginLeft: wp('3%'),
  },
  goBack: {
    padding: wp('2%'),
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: wp('4%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    color: '#000',
  },
  inputAndroid: {
    fontSize: wp('4%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    color: '#000',
  },
});

export default LeaveRequestScreen;
