import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Slice/store';
import { ManagerNotificationItem } from '../../redux/managerSlice/managerNotificationSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/navigation';
import { SearchBar } from '@rneui/themed'; 
import COLORS from '../../constants/Color';

type ManagerNotificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ManagerNotification'>;

const ManagerNotification: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.managerNotification.notifications);
  const dispatch = useDispatch();
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
        <View style={styles.notificationInfor}>
        <Text style={styles.notificationDate}>{item.date}</Text>
        <Text style={styles.notificationEmployee}>By: Diệp Minh Dũng(ERP)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  // useEffect(() => {
  //   const simulateNewNotification = () => {
  //     const newNotification: ManagerNotificationItem = {
  //       id: `${notifications.length + 1}`,
  //       title: 'Thông báo email mới',
  //       code: 'EMAIL123',
  //       summary: 'Bạn đã nhận được một email mới.',
  //       date: new Date().toLocaleDateString(),
  //     };
  //     dispatch(addManagerNotification(newNotification));
  //   };

  //   const interval = setInterval(simulateNewNotification, 30000);

  //   return () => clearInterval(interval);
  // }, [notifications, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm"
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
    backgroundColor: COLORS.colorMain,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    fontFamily:'CustomFont-Regular'
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily:'CustomFont-Bold',
    alignSelf:'center'
  },
  notificationCode: {
    fontSize: 14,
    marginVertical: 4,
    fontFamily:'CustomFont-Regular'
  },
  notificationSummary: {
    fontSize: 14,
    marginVertical: 4,
    fontFamily:'CustomFont-Regular'
  },
  notificationDate: {
    fontSize: 12,
    color: '#888888',
    fontFamily:'CustomFont-Regular'
  },
  notificationInfor:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  notificationEmployee:{
    fontSize: 12,
    color: COLORS.date,
    fontFamily:'CustomFont-Italic'
  },
});

export default ManagerNotification;
