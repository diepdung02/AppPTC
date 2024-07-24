import React, { useState } from "react";
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

  const renderItem = ({ item }: { item: Request }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Đã được duyệt":
          return COLORS.green;
        case "Đang chờ duyệt":
          return COLORS.yellow;
        case "Đã bị từ chối":
          return COLORS.red;
        default:
          return COLORS.black;
      }
    };

    return (
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
            <Text
              style={styles.itemText}
            >{`Giờ kết thúc: ${item.endTime}`}</Text>
            <Text style={styles.itemText}>{`Lý do: ${item.reason}`}</Text>
          </>
        )}
        <Text
          style={[
            styles.itemText,
            { color: getStatusColor(item.status) },
          ]}
        >{`Trạng thái: ${item.status}`}</Text>
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
      </View>
    );
  };

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
        initialLayout={{ width: 400 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  tabBar: {
    backgroundColor: COLORS.primary,
  },
  indicator: {
    backgroundColor: COLORS.secondary,
  },
  tabLabel: {
    fontWeight: "bold",
  },
  flatListContainer: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: COLORS.primary,
  },
  rejectButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: COLORS.gray,
  },
});

export default ApproveRequestScreen;
