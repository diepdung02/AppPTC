import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/navigation";
import { SearchBar } from "@rneui/themed";

// Fake data
const fakeOvertimeRequests = [
  {
    id: 1,
    code: "2407250001",
    startDate: "2023-07-10",
    startTime: "08:00",
    endTime: "12:00",
    reason: "Hỗ trợ dự án",
    status: "Đã được duyệt",
  },
  {
    id: 2,
    code: "2407250002",
    startDate: "2023-07-11",
    startTime: "13:00",
    endTime: "17:00",
    reason: "Bảo trì hệ thống",
    status: "Đang chờ duyệt",
  },
  {
    id: 3,
    code: "2407250003",
    startDate: "2023-07-12",
    startTime: "09:00",
    endTime: "18:00",
    reason: "Nghiên cứu và phát triển",
    status: "Đã bị từ chối",
  },
];

type OvertimeItemProps = {
  item: OvertimeRequest;
  navigation: StackNavigationProp<RootStackParamList, "Overtime">;
};

const OvertimeItem: React.FC<OvertimeItemProps> = ({ item, navigation }) => {
  let statusColor, textColor;
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("DetailOvertime", { item })}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Thông tin tăng ca:</Text>
        <View style={styles.createdAtContainer}>
          <View style={styles.codeContainer}>
            {item.code.split("").map((char, index) => (
              <Text key={index} style={[styles.itemCode, styles.createdAt]}>
                {char}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Ngày tăng ca:</Text>
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
          <Text style={styles.itemText}>{truncateText(item.reason, 20)}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Trạng thái:</Text>
          <Text
            style={[
              styles.itemStatus,
              { backgroundColor: statusColor, color: textColor },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OvertimeScreen: React.FC<{
  navigation: StackNavigationProp<RootStackParamList, "Overtime">;
}> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<OvertimeRequest[]>(
    fakeOvertimeRequests || []
  );

  useEffect(() => {
    setFilteredData(fakeOvertimeRequests);
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = fakeOvertimeRequests.filter((item) => {
      const dateMatch = item.startDate
        .toLowerCase()
        .includes(text.toLowerCase());
      const timeMatch = item.startTime
        .toLowerCase()
        .includes(text.toLowerCase());
      const reasonMatch = item.reason
        .toLowerCase()
        .includes(text.toLowerCase());
      const statusMatch = item.status
        .toLowerCase()
        .includes(text.toLowerCase());
      return dateMatch || timeMatch || reasonMatch || statusMatch;
    });
    setFilteredData(filtered);
  };

  const renderItem = ({ item }: { item: OvertimeRequest }) => (
    <OvertimeItem item={item} navigation={navigation} />
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
        <Text style={styles.headerTitle}>Tăng ca</Text>
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
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("OvertimeRequest")}
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
  itemContainer: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    height: 220,
  },
  itemText: {
    fontSize: 16,
    color: "black",
    flexShrink: 1, // Ensure the text can shrink if needed
  },
  detail: {
    flexDirection: "row",
  },
  detailText: {
    width: 150,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.addButton,
    borderRadius: 30,
    padding: 10,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
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
  button: {
    width: 80,
    height: 30,
    marginLeft: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  statusText: {
    textAlign: "center",
    fontSize: 12,
  },
  deleteButton: {
    marginLeft: 10,
  },
  createdAtContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "absolute",
    top: 10,
    right: 10,
  },
  createdAt: {
    fontWeight: "600",
  },
  itemStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "white",
    fontWeight: "600",
    alignSelf: "flex-start",
    borderRadius: 5,
  },
  codeContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  itemCode: {
    fontSize: 13,
  },
});

export default OvertimeScreen;
