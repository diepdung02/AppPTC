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
      // Tìm kiếm các đơn xin nghỉ
      const filteredLeaveRequests = leaveRequests.filter(
        (item) =>
          item.code.toLowerCase().includes(lowercasedText) ||
          item.reason.toLowerCase().includes(lowercasedText)
      );
      setFilteredLeaveRequests(filteredLeaveRequests);
    } else {
      // Tìm kiếm các đơn xin tăng ca
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
      // Cập nhật trạng thái đơn nghỉ phép
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
      // Cập nhật trạng thái đơn tăng ca
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
      // Cập nhật trạng thái đơn nghỉ phép khi từ chối
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
      // Cập nhật trạng thái đơn tăng ca khi từ chối
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
    let statusColor, textColor;
    // Xác định màu sắc dựa trên trạng thái
    switch (item.status) {
      case "Đã được duyệt":
        statusColor = COLORS.green;
        textColor = COLORS.black; 
        break;
      case "Đã bị từ chối":
        statusColor = COLORS.red;
        textColor = COLORS.white; 
        break;
      case "Đang chờ duyệt":
        statusColor = COLORS.yellow;
        textColor = COLORS.black; 
        break;
      default:
        statusColor = COLORS.darkGray;
        textColor = COLORS.black;
        break;
    }

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
        <View style={styles.statusContainer}>
          <Text style={styles.itemText}>Trạng thái: </Text>
          <Text style={[styles.itemText, { backgroundColor: statusColor, color: textColor }]}>
            {` ${item.status}`}
          </Text>
        </View>
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
          keyExtractor={(item) => item.id}
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
          keyExtractor={(item) => item.id}
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
            indicatorStyle={styles.tabIndicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
          />
        )}
        initialLayout={{ width: 400 }}
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
    paddingHorizontal: 10,
  },
  tabBar: {
    backgroundColor: COLORS.primary,
  },
  tabIndicator: {
    backgroundColor: COLORS.white,
  },
  tabLabel: {
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: COLORS.green,
  },
  rejectButton: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default ApproveRequestScreen;
