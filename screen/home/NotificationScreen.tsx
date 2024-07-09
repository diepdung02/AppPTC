import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../constants/Color'; 
import { RootStackParamList } from '../navigator/natigation';
import { SearchBar } from "@rneui/themed";


type NotificationItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Notifications'>;
};

const notification: NotificationItem[] = [
  {
    id: "1",
    title: "Nghỉ lễ Tết",
    summary: "Doanh thu của công ty trong quý vừa qua vượt xa kỳ vọng.",
    image: "https://via.placeholder.com/150",
    date: "30-06-2024",
  },
  {
    id: "2",
    title: "Thông báo",
    summary: "Chúng tôi rất vui mừng thông báo về việc khai trương văn phòng mới tại New York.",
    image: "https://example.com/images/new_office.jpg",
    date: "25-06-2024",
  },
  {
    id: "3",
    title: "Nhân viên xuất sắc của tháng",
    summary: "Chúc mừng Jane Doe đã được trao giải Nhân viên xuất sắc của tháng.",
    image: "https://example.com/images/employee_of_month.jpg",
    date: "20-06-2024",
  },
  {
    id: "4",
    title: "Sự kiện xây dựng đội nhóm sắp tới",
    summary: "Tham gia sự kiện xây dựng đội nhóm vào tháng tới để tăng cường hợp tác.",
    image: "https://example.com/images/team_building.jpg",
    date: "15-06-2024",
  },
  {
    id: "5",
    title: "Chương trình sức khỏe và thể dục",
    summary: "Chương trình sức khỏe và thể dục mới của chúng tôi nhằm cải thiện sức khỏe của nhân viên.",
    image: "https://example.com/images/wellness_program.jpg",
    date: "10-06-2024",
  },
];

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<NotificationItem[]>(notification);

  const handleItemPress = (item: NotificationItem) => {
    navigation.navigate('NotificationDetail', { notification: item });
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = notification.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase()) ||
      item.summary.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>
      <SearchBar
        placeholder="Tìm kiếm"
        inputContainerStyle={{ backgroundColor: "white" }}
        value={search}
        onChangeText={handleSearch}
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSummary}>{item.summary}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemSummary: {
    color: '#666',
    marginTop: 5,
  },
  itemDate: {
    color: '#000',
    marginTop: 5,
  },
});

export default NotificationScreen;
