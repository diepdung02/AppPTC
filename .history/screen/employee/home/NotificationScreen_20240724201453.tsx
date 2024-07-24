import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Slice/store';
import { NotificationItem } from '../../../redux/Slice/leaveSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from '@rneui/themed';
import COLORS from '../../../constants/Color'; 
import { RootStackParamList } from '../../navigator/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Notifications'>;
};

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const notifications = useSelector((state: RootState) => state.leave.notifications);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<NotificationItem[]>(notifications);

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

  const handleItemPress = (item: NotificationItem) => {
    navigation.navigate('NotificationDetail', { notification: item });
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity style={styles.notificationContainer} onPress={() => handleItemPress(item)}>
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
    alignItems: 'center',
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
    fontWeight: 'bold',
    alignSelf:'center',
    fontFamily:'CustomFont-Regular'
  },
  notificationSummary: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily:'CustomFont-Regular'
  },
  notificationDate: {
    fontSize: 12,
    color: COLORS.date,
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
  },
  notificationManager:{
    fontSize: 12,
    color: COLORS.date,
    fontStyle:'italic',
  },
  notificationInfor:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

export default NotificationScreen;
