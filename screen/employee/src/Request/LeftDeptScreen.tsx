import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Slice/store';
import { SearchBar } from '@rneui/themed';
import COLORS from '../../../../constants/Color';
import { CreateLeftDept } from '../../../../redux/Slice/leftDeptSlice';
import { RootStackParamList } from '../../../navigator/navigation';

type LeftDeptItemProps = {
  item: CreateLeftDept;
  navigation: StackNavigationProp<RootStackParamList, 'LeftDeptScreen'>;
};

const LeftDeptItem: React.FC<LeftDeptItemProps> = ({ item, navigation }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailLeftDept', { item })}>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Ngày:</Text>
          <Text style={styles.itemText}>{item.startDate}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Giờ bắt đầu:</Text>
          <Text style={styles.itemText}>{item.startTime}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Giờ kết thúc:</Text>
          <Text style={styles.itemText}>{item.endTime}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Lí do:</Text>
          <Text style={styles.itemText}>{item.reason}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Trạng thái:</Text>
          <Text style={styles.itemText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const LeftDeptScreen: React.FC<{
  navigation: StackNavigationProp<RootStackParamList, 'LeftDeptScreen'>;
}> = ({ navigation }) => {
  const overtimeRequests = useSelector((state: RootState) => state.leftDept.requests);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<CreateLeftDept[]>(overtimeRequests || []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!overtimeRequests) {
      setFilteredData([]);
      return;
    }
    const filtered = overtimeRequests.filter((item) => {
      const dateMatch = item.startDate.toLowerCase().includes(text.toLowerCase());
      const timeMatch = item.startTime.toLowerCase().includes(text.toLowerCase());
      const reasonMatch = item.reason.toLowerCase().includes(text.toLowerCase());
      const statusMatch = item.status.toLowerCase().includes(text.toLowerCase());
      return dateMatch || timeMatch || reasonMatch || statusMatch;
    });
    setFilteredData(filtered);
  };

  const renderItem = ({ item }: { item: CreateLeftDept }) => (
    <LeftDeptItem item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xin phép ra vào cổng</Text>
      </View>
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
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateLeftDept')}
        style={styles.addButton}
      >
        <FontAwesome name="plus-circle" size={50} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    marginTop: StatusBar.currentHeight || 0,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  goBack: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.addButton,
    borderRadius: 50,
    padding: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  detail: {
    flexDirection: 'row',
  },
  detailText: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LeftDeptScreen;
