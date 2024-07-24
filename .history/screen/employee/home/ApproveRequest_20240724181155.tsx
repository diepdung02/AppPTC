import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/Slice/store";
import {
  LeaveRequest,
  updateLeaveRequestStatus,
  addNotification,
} from "../../../redux/Slice/leaveSlice";
import {
  OvertimeRequest,
  updateOvertimeRequestStatus,
} from "../../../redux/Slice/overtimeSlice";
import { SearchBar } from "@rneui/themed";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { StackNavigationProp } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../../../constants/Color";

type Props = {
  navigation: StackNavigationProp<{}>;
};

type Request = LeaveRequest | OvertimeRequest;

const ApproveRequestScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const leaveRequests = useSelector((state: RootState) => state.leave.requests);
  const overtimeRequests = useSelector(
    (state: RootState) => state.overtime.requests
  );

  const [search, setSearch] = useState("");
  const [filteredLeaveRequests, setFilteredLeaveRequests] =
    useState(leaveRequests);
  const [filteredOvertimeRequests, setFilteredOvertimeRequests] =
    useState(overtimeRequests);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "leave", title: "Đơn xin nghỉ" },
    { key: "overtime", title: "Đơn xin tăng ca" },
  ]);

  useEffect(() => {
    handleSearch(search);
  }, [leaveRequests, overtimeRequests]);

  const handleSearch = (text: string) => {
    setSearch(text);

    const lowercasedText = text.toLowerCase();

    if (index === 0) {
      const filteredLeaveRequests = leaveRequests.filter(
        (item) =>
          item.code.toLowerCase().includes(lowercasedText) ||
          item.reason.toLowerCase().includes(lowercasedText)
      );
      setFilteredLeaveRequests(filteredLeaveRequests);
    } else {
      const filteredOvertimeRequests = overtimeRequests.filter(
        (item) =>
          item.code.toLowerCase().includes(lowercasedText) ||
          item.reason.toLowerCase().includes(lowercasedText)
      );
      setFilteredOvertimeRequests(filteredOvertimeRequests);
    }
  };

  const handleApprove = (request: Request) => {
    if ("leaveType" in request) {
      const updatedRequest: LeaveRequest = {
        ...request,
        status: "Đã được duyệt",
      };
      dispatch(updateLeaveRequestStatus(updatedRequest));
      dispatch(
        addNotification({
          id: Date.now().toString(),
          title: "Đơn nghỉ phép đã được duyệt",
          summary: `Đơn nghỉ phép với mã ${request.code} đã được duyệt.`,
          date: new Date().toLocaleDateString("vi-VN"),
          icon: "https://img.upanh.tv/2024/07/22/approved.png",
          image: "https://via.placeholder.com/150",
        })
      );
    } else {
      const updatedRequest: OvertimeRequest = {
        ...request,
        status: "Đã được duyệt",
      };
      dispatch(updateOvertimeRequestStatus(updatedRequest));
      dispatch(
        addNotification({
          id: Date.now().toString(),
          title: "Đơn tăng ca đã được duyệt",
          summary: `Đơn tăng ca với mã ${request.code} đã được duyệt.`,
          date: new Date().toLocaleDateString("vi-VN"),
          icon: "https://img.upanh.tv/2024/07/22/approved.png",
          image: "https://via.placeholder.com/150",
        })
      );
    }
    Alert.alert("Đã duyệt đơn");
  };

  const handleReject = (request: Request) => {
    if ("leaveType" in request) {
      const updatedRequest: LeaveRequest = {
        ...request,
        status: "Đã bị từ chối",
      };
      dispatch(updateLeaveRequestStatus(updatedRequest));
      dispatch(
        addNotification({
          id: Date.now().toString(),
          title: "Đơn nghỉ phép đã bị từ chối",
          summary: `Đơn nghỉ phép với mã ${request.code} đã bị từ chối.`,
          date: new Date().toLocaleDateString("vi-VN"),
          icon: "https://img.upanh.tv/2024/07/22/reject89259f678d8bbaef.png",
          image: "https://via.placeholder.com/150",
        })
      );
    } else {
      const updatedRequest: OvertimeRequest = {
        ...request,
        status: "Đã bị từ chối",
      };
      dispatch(updateOvertimeRequestStatus(updatedRequest));
      dispatch(
        addNotification({
          id: Date.now().toString(),
          title: "Đơn tăng ca đã bị từ chối",
          summary: `Đơn tăng ca với mã ${request.code} đã bị từ chối.`,
          date: new Date().toLocaleDateString("vi-VN"),
          icon: "https://img.upanh.tv/2024/07/22/reject89259f678d8bbaef.png",
          image: "https://via.placeholder.com/150",
        })
      );
    }
    Alert.alert("Đã từ chối đơn");
  };

  const renderItem = ({ item }: { item: Request }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`Mã đơn: ${item.code}`}</Text>
      {"leaveType" in item ? (
        <>
          <Text
            style={styles.itemText}
          >{`Ngày bắt đầu: ${item.startDate}`}</Text>
          <Text
            style={styles.itemText}
          >{`Ngày kết thúc: ${item.endDate}`}</Text>
          <Text
            style={styles.itemText}
          >{`Số ngày nghỉ: ${item.usedDaysOff}`}</Text>
          <Text
            style={styles.itemText}
          >{`Số ngày nghỉ còn lại: ${item.remainingDaysOff}`}</Text>
          <Text
            style={styles.itemText}
          >{`Loại nghỉ phép: ${item.leaveType}`}</Text>
          <Text style={styles.itemText}>{`Lý do: ${item.reason}`}</Text>
        </>
      ) : (
        <>
          <Text
            style={styles.itemText}
          >{`Ngày tăng ca: ${item.startDate}`}</Text>
          <Text
            style={styles.itemText}
          >{`Giờ bắt đầu: ${item.startTime}`}</Text>
          <Text style={styles.itemText}>{`Giờ kết thúc: ${item.endTime}`}</Text>
          <Text style={styles.itemText}>{`Lý do: ${item.reason}`}</Text>
        </>
      )}
      <Text
        style={[
          styles.itemText,
          item.status === "Đã được duyệt"
            ? styles.approvedText
            : item.status === "Đã bị từ chối"
            ? styles.rejectedText
            : styles.pendingText,
        ]}
      >{`Trạng thái: ${item.status}`}</Text>
      {item.status === "Đang chờ duyệt" && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleApprove(item)}
          >
            <Text style={styles.buttonText}>Duyệt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleReject(item)}
          >
            <Text style={styles.buttonText}>Từ chối</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderScene = SceneMap({
    leave: () => (
      <View style={styles.tabContainer}>
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
          data={filteredLeaveRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Không có đơn nghỉ phép nào để duyệt.
            </Text>
          }
        />
      </View>
    ),
    overtime: () => (
      <View style={styles.tabContainer}>
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
          data={filteredOvertimeRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Không có đơn tăng ca nào để duyệt.
            </Text>
          }
        />
      </View>
    ),
  });

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabBarLabel}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabContainer: {
    flex: 1,
    padding: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  approvedText: {
    color: "green",
  },
  rejectedText: {
    color: "red",
  },
  pendingText: {
    color: "black",
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  tabBar: {
    backgroundColor: "#ffffff",
  },
  tabBarLabel: {
    fontWeight: "bold",
  },
  indicator: {
    backgroundColor: COLORS.primary,
  },
});

export default ApproveRequestScreen;
