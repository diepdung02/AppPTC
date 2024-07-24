import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Slice/store';
import { ManagerNotificationItem } from '../../redux/managerSlice/managerNotificationSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/navigation';
import { SearchBar } from '@rneui/themed'; // Thêm thư viện tìm kiếm

type ManagerNotificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManagerNotification'>;

const ManagerNotification: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.managerNotification.notifications);
  const navigation = useNavigation<ManagerNotificationScreenNavigationProp>();

  const [search, setSearch] = useState<string>("");

  // Hàm lọc thông báo dựa trên từ khóa tìm kiếm
  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(search.toLowerCase()) ||
    notification.summary.toLowerCase().includes(search.toLowerCase()) ||
    notification.code.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: ManagerNotificationItem }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      // onPress={() => navigation.navigate('ManagerNotificationDetail', { notification: item })}
    >
      <View>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationCode}>{item.code}</Text>
        <Text style={styles.notificationSummary}>{item.summary}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm thông báo"
        inputContainerStyle={{ backgroundColor: "white" }}
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 1,
          borderTopColor: "transparent",
        }}
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily:'CustomFont-Bold'
  },
  notificationCode: {
    fontSize: 14,
    marginVertical: 4,
    fontFamily:'CustomFont-Regular'
  },
  notificationSummary: {
    fontSize: 14,
    marginVertical: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#888888',
  },
});

export default ManagerNotification;
