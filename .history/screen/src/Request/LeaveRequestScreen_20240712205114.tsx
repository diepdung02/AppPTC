import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../constants/Color'; 
import { StackNavigationProp } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LeaveRequest, addLeaveRequest } from '../../../redux/overtime/leaveSlice';
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

  const leaveTypes = ['Nghỉ phép năm', 'Nghỉ bệnh', 'Nghỉ thai sản', 'Nghỉ không lương'];

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

  const handleSubmit = async () => {
    if (startDate && endDate && leaveType && reason) {
      const newRequest: LeaveRequest = {
        id: Math.random(),
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        leaveType,
        reason,
        status: 'Đang chờ duyệt',
      };

      dispatch(addLeaveRequest(newRequest));

      try {
        const existingRequests = await AsyncStorage.getItem('leaveRequests');
        let parsedRequests = existingRequests ? JSON.parse(existingRequests) : [];
        parsedRequests.push(newRequest);
        await AsyncStorage.setItem('leaveRequests', JSON.stringify(parsedRequests));
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
  },
  goBack:{
    height:60,
    width:60,
    alignItems:'center',
    justifyContent:'center',
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: hp('6%'),
    fontSize: wp('4%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: wp('7.5%'),
  },
  inputAndroid: {
    height: hp('6%'),
    fontSize: wp('4%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: wp('7.5%'),
  },
  placeholder: {
    color: 'gray',
  },
});

export default LeaveRequestScreen;
