import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../constants/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { addCreateLeftDept, CreateLeftDept as LeftDeptType } from '../../../redux/overtime/leftDeptSlice'; // Rename the import to avoid conflict
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: StackNavigationProp<{}>;
}

const CreateLeftDeptScreen: React.FC<Props> = ({ navigation }) => { // Rename the component to resolve conflict
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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
              <FontAwesome name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Xin ra vào cổng</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày bắt đầu:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={showDatePicker}
            >
              <Text style={styles.dateText}>{date ? date.toDateString() : 'Chọn ngày bắt đầu'}</Text>
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
              placeholder="Nhập lý do xin nghỉ phép"
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
    textAlignVertical: 'top'
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
  goBack: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateLeftDeptScreen;
