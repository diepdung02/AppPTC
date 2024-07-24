import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../../constants/Color'; 

type RootStackParamList = {
  Product: undefined; // Define your screen names here
  // Add more screen names as needed
};

type ScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ScheduleScreenNavigationProp;
};

type Day = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

const ScheduleScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const tasksByDate: Record<string, { id: string, code: string, route: string, name: string, quantity: number }[]> = {
    '2024-07-16': [
      { id: '1', code: 'RH9829', route: '392', name: 'Table', quantity: 20 },
      { id: '2', code: 'RB833', route: 'H832', name: 'Chair', quantity: 15 },
    ],
    '2024-07-17': [
      { id: '3', code: 'RB833', route: 'H832', name: 'Chair', quantity: 15 },
      { id: '4', code: 'RB833', route: 'H832', name: 'Desk', quantity: 10 },
    ],
  };

  const renderTask = ({ item }: { item: { code: string; route: string; name: string; quantity: number } }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Product')}>
        <Text style={styles.taskText}>Mã Hàng: {item.code}</Text>
        <Text style={styles.taskText}>Route Code: {item.route}</Text>
        <Text style={styles.taskText}>Tên Hàng: {item.name}</Text>
        <Text style={styles.taskText}>Số Lượng: {item.quantity}</Text>
      </TouchableOpacity>
    </View>
  );

  const getMarkedDates = () => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
    };
  };

  const tasksToShow = selectedDate ? tasksByDate[selectedDate] || [] : [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sản xuất</Text>
      </View>
      <Calendar
        onDayPress={(day: Day) => setSelectedDate(day.dateString)}
        markedDates={getMarkedDates()}
        style={styles.calendar}
      />
      <Text style={styles.selectedDate}>{selectedDate ? new Date(selectedDate).toDateString() : 'Chọn ngày'}</Text>
      <Text style={styles.detailTitle}>Chi tiết công việc:</Text>
      <FlatList
        data={tasksToShow}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily:'CustomFont-Regular'
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
  },
  calendar: {
    marginBottom: 10,
  },
  selectedDate: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  detailTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  taskText: {
    fontSize: 14,
  },
  taskList: {
    paddingHorizontal: 15,
  },
});

export default ScheduleScreen;
