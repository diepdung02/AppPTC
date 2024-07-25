import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigation';

// Fake data for testing
const fakeNotifications = [
  {
    id: '1',
    icon: 'https://img.upanh.tv/2024/07/22/reject89259f678d8bbaef.png',
    title: 'Đơn nghỉ phép',
    summary: 'Đơn nghỉ phép của bạn đã bị từ chối',
    date: '2024-07-20',
  },
  {
    id: '2',
    icon: 'https://img.upanh.tv/2024/07/22/approved.png',
    title: 'Đơn xin tăng ca',
    summary: 'Đơn xin tăng ca của bạn được duyệt',
    date: '2024-07-21',
  },
];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Notifications'>;
};

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(fakeNotifications);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeNotifications);

  useEffect(() => {
    setFilteredData(notifications);
  }, [notifications]);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = notifications.filter(
      (item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.summary.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // const handleItemPress = (item: typeof fakeNotifications[0]) => {
  //   navigation.navigate('NotificationDetail', { notification: item });
  // };

  const renderItem = ({ item }: { item: typeof fakeNotifications[0] }) => (
    <TouchableOpacity style={styles.notificationContainer} >
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationSummary}>{item.summary}</Text>
        <View style={styles.notificationInfor}>
          <Text style={styles.notificationDate}>{item.date}</Text>
          <Text style={styles.notificationManager}>By: Phòng nhân sự</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm"
        inputContainerStyle={{ backgroundColor: 'white' }}
        value={search}
        onChangeText={handleSearch}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có thông báo nào.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
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
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily:'CustomFont-Regular'
  },
  notificationContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    fontFamily:'CustomFont-Regular'
  },
  notificationTextContainer: {
    marginLeft: 10,
    flex: 1,
    fontFamily:'CustomFont-Regular'
  },
  notificationTitle: {
    fontSize: 16,
    alignSelf:'center',
    fontFamily:'CustomFont-Bold'
  },
  notificationSummary: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily:'CustomFont-Regular'
  },
  notificationDate: {
    fontSize: 12,
    color: COLORS.date,
    fontFamily:'CustomFont-Regular'
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#757575',
    fontFamily:'CustomFont-Regular'
  },
  notificationManager:{
    fontSize: 12,
    color: COLORS.date,
    fontFamily:'CustomFont-Italic'
  },
  notificationInfor:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

export default NotificationScreen;
