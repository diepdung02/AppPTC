import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from 'twrnc';
import COLORS from '../../../../constants/Color';

type RootStackParamList = {
  Product: undefined;
};

type ScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ScheduleScreenNavigationProp;
};

type Task = {
  id: string;
  code: string;
  route: string;
  name: string;
  quantity: number;
};

type Day = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Calculate scale
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

// Function to get scaled size
const getScaledSize = (size: number) => size * scale;

const ScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const tasksByDate: Record<string, Task[]> = {
    '2024-08-05': [
      { id: '1', code: 'RH9829', route: '392', name: 'Bàn', quantity: 20 },
      { id: '2', code: 'RB833', route: 'H832', name: 'Ghế', quantity: 15 },
    ],
    '2024-08-06': [
      { id: '3', code: 'RB833', route: 'H832', name: 'Ghế', quantity: 15 },
      { id: '4', code: 'RB833', route: 'H832', name: 'Bàn làm việc', quantity: 10 },
    ],
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={tw`p-${getScaledSize(4)} border-b border-gray-300`}>
      <TouchableOpacity onPress={() => navigation.navigate('Product')} accessibilityLabel={`Đi đến chi tiết sản phẩm ${item.name}`} accessibilityHint={`Xem chi tiết của ${item.name}`}>
        <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Mã Hàng: {item.code}</Text>
        <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Mã Route: {item.route}</Text>
        <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Tên Hàng: {item.name}</Text>
        <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>Số Lượng: {item.quantity}</Text>
      </TouchableOpacity>
    </View>
  );

  const getMarkedDates = () => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
    };
  };

  const tasksToShow = selectedDate ? tasksByDate[selectedDate] || [] : [];

  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center mt-${getScaledSize(5)}`, {backgroundColor:COLORS.white}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()} 
        style={[tw`pl-${getScaledSize(5)}`, { borderRadius: 50 }]} 
        activeOpacity={0.7} 
      >
    <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
  </TouchableOpacity>
  <Text style={[tw` mr-${getScaledSize(10)} p-${getScaledSize(5)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(18), flex: 1, textAlign: 'center' }]}>
    Lịch sản xuất
  </Text>
</View>
      <Calendar
        onDayPress={(day: Day) => setSelectedDate(day.dateString)}
        markedDates={getMarkedDates()}
        style={tw`mb-${getScaledSize(2)}`}
      />
      <Text style={[tw`text-center`, { fontSize: getScaledSize(16), marginVertical: getScaledSize(8), color: COLORS.black, fontFamily: 'CustomFont-Bold' }]}>
        {selectedDate ? new Date(selectedDate).toDateString() : 'Chọn ngày'}
      </Text>
      <Text style={[tw`text-center`, { fontSize: getScaledSize(16), fontFamily: 'CustomFont-Bold', marginBottom: getScaledSize(8), color: COLORS.black }]}>Chi tiết công việc:</Text>
      <FlatList
        data={tasksToShow}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-${getScaledSize(4)}`}
      />
    </SafeAreaView>
  );
};

export default ScheduleScreen;
