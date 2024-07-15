import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../constants/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

const LeftDeptScreen: React.FC = () => {
  const [direction, setDirection] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const handleSave = () => {
    // Lưu thông tin vào hệ thống hoặc gửi lên server
    console.log(`Đã lưu thông tin: ${direction}, ${workerName}, ${startDate}, ${endDate}`);
    // Đặt lại các trường nhập liệu
    setDirection('');
    setWorkerName('');
    setStartDate(null);
    setEndDate(null);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    if (startDate && selectedDate < startDate) {
      alert('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!');
      return;
    }
    setEndDate(selectedDate);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (time: Date) => {
    setStartDate(time);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (time: Date) => {
    if (startDate && time < startDate) {
      alert('Giờ kết thúc không được nhỏ hơn giờ bắt đầu!');
      return;
    }
    setEndDate(time);
    hideEndTimePicker();
  };

  const toggleDropdown = () => {
    setDropdownVisibility(!isDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.label}>Chọn vào hoặc ra:</Text>
          <RNPickerSelect
            onValueChange={(value) => setDirection(value)}
            items={[
              { label: 'Vào', value: 'Vào' },
              { label: 'Ra', value: 'Ra' },
            ]}
            value={direction}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />

          <Text style={styles.label}>Chọn ngày:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={showDatePicker}
          >
            <Text>{endDate ? endDate.toDateString() : startDate ? startDate.toDateString() : 'Chọn ngày'}</Text>
            <FontAwesome name="calendar" size={wp('5%')} color="black" style={styles.icon} />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />

          <Text style={styles.label}>Chọn giờ bắt đầu:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={showStartTimePicker}
          >
            <Text>{startDate ? startDate.toLocaleTimeString() : 'Chọn giờ bắt đầu'}</Text>
            <FontAwesome name="clock-o" size={wp('5%')} color="black" style={styles.icon} />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmStartTime}
            onCancel={hideStartTimePicker}
          />

          <Text style={styles.label}>Chọn giờ kết thúc:</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={showEndTimePicker}
          >
            <Text>{endDate ? endDate.toLocaleTimeString() : 'Chọn giờ kết thúc'}</Text>
            <FontAwesome name="clock-o" size={wp('5%')} color="black" style={styles.icon} />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmEndTime}
            onCancel={hideEndTimePicker}
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu thông tin</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: wp('4%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: wp('10%'),
    marginBottom: hp('2%'),
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: wp('4%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: wp('10%'),
    marginBottom: hp('2%'),
    backgroundColor: 'white',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.colorMain,
  },
  label: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: 'black',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('6%'),
    width: wp('80%'),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
    backgroundColor: 'white',
  },
  icon: {
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: '#2738C2',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 5,
    marginTop: hp('2%'),
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'),
    textAlign: 'center',
  },
});

export default LeftDeptScreen;
