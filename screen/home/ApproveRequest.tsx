import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/overtime/store'; // Adjust path as per your project structure
import { LeaveRequest, updateLeaveRequestStatus, deleteLeaveRequest } from '../../redux/overtime/leaveSlice'; // Adjust path as per your project structure
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from "@rneui/themed";

type Props = {
  navigation: StackNavigationProp<{}>;
};

const ApproveLeaveScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const leaveRequests = useSelector((state: RootState) => state.leave.requests);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(leaveRequests);

  useEffect(() => {
    
  }, []);

  const handleApprove = (request: LeaveRequest) => {
    const updatedRequest: LeaveRequest = {
      ...request,
      status: 'Đã được duyệt', // Update status to 'Đã được duyệt'
    };
    dispatch(updateLeaveRequestStatus(updatedRequest));
    Alert.alert('Đã duyệt đơn');
  };

  const handleReject = (request: LeaveRequest) => {
    const updatedRequest: LeaveRequest = {
      ...request,
      status: 'Đã bị từ chối', // Update status to 'Đã bị từ chối'
    };
    dispatch(updateLeaveRequestStatus(updatedRequest));
    Alert.alert('Đã từ chối đơn');
  };

//   const handleDelete = (id: number) => {
//     dispatch(deleteLeaveRequest(id));
//     Alert.alert('Đã xóa đơn');
//   };

const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = leaveRequests.filter(
      (item) =>
        item.code.toLowerCase().includes(text.toLowerCase()) ||
        item.leaveType.toLowerCase().includes(text.toLowerCase()) ||
        item.startDate.toLowerCase().includes(text.toLowerCase()) ||
        item.status.toLowerCase().includes(text.toLowerCase()) 
    );
    setFilteredData(filtered);
  };
  const renderItem = ({ item }: { item: LeaveRequest }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`Mã đơn: ${item.code}`}</Text>
      <Text style={styles.itemText}>{`Ngày bắt đầu: ${item.startDate}`}</Text>
      <Text style={styles.itemText}>{`Ngày kết thúc: ${item.endDate}`}</Text>
      <Text style={styles.itemText}>{`Số ngày nghỉ: ${item.usedDaysOff}`}</Text>
      <Text style={styles.itemText}>{`Số ngày nghỉ còn lại: ${item.remainingDaysOff}`}</Text>
      <Text style={styles.itemText}>{`Loại nghỉ phép: ${item.leaveType}`}</Text>
      <Text style={styles.itemText}>{`Lý do: ${item.reason}`}</Text>
      <Text style={styles.itemText}>{`Trạng thái: ${item.status}`}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={() => handleApprove(item)}>
          <Text style={styles.buttonText}>Duyệt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => handleReject(item)}>
          <Text style={styles.buttonText}>Từ chối</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả đơn nghỉ phép</Text>
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
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có đơn nào để duyệt.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    margin:20
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  deleteButton: {
    backgroundColor: '#FFEB3B',
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
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 5,
  },
  goBack: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ApproveLeaveScreen;