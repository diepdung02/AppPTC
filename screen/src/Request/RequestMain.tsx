import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/overtime/store'; // Ensure RootState is correctly imported
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/natigation'; // Corrected import path
import { SearchBar } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color'; // Assuming you have a 'Colors' file for styling
import { LeaveRequest } from '../../../redux/overtime/leaveSlice';

type RequestMainProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RequestMain'>;
};

const RequestMain: React.FC<RequestMainProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const leaveRequests = useSelector((state: RootState) => state.leave.requests);
  const [filteredData, setFilteredData] = useState<LeaveRequest[]>(leaveRequests || []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!leaveRequests) {
      setFilteredData([]);
      return;
    }
    const filtered = leaveRequests.filter(item => {
      const dateMatch = item.startDate.toLowerCase().includes(text.toLowerCase());
      const leaveTypeMatch = item.leaveType.toLowerCase().includes(text.toLowerCase());
      return dateMatch || leaveTypeMatch;
    });
    setFilteredData(filtered);
  };

  const renderItem = ({ item }: { item: LeaveRequest }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('DetailRequest', { item })}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Tăng ca</Text>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Ngày bắt đầu: </Text>
          <Text style={styles.itemText}>{item.startDate}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Ngày kết thúc: </Text>
          <Text style={styles.itemText}>{item.endDate}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Loại nghỉ phép: </Text>
          <Text style={styles.itemText}>{item.leaveType}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Lí do: </Text>
          <Text style={styles.itemText}>{item.reason}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Trạng thái </Text>
          <Text style={styles.itemText}>{item.status}</Text>
        </View>
      
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả yêu cầu</Text>
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
        renderItem={({ item }) => renderItem({ item })}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={() => navigation.navigate('LeaveRequest')} style={styles.addButton}>
        <MaterialCommunityIcons name="plus-circle" size={50} color="white" />
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight:'600',
  },
  itemText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#29D6D6",
    borderRadius: 30,
    padding: 10,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  goBack: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  statusText: {
    textAlign: "center",
    fontSize: 12,
  },
  detail:{
    flexDirection:'row'
  }
});

export default RequestMain;
