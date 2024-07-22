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
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useSelector } from "react-redux";
  import { RootState } from "../../../redux/overtime/store";
  import { StackNavigationProp } from "@react-navigation/stack";
  import { RootStackParamList } from "../../navigator/navigation";
  import { SearchBar } from "@rneui/themed";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import COLORS from "../../../constants/Color";
  import { LeaveRequest } from "../../../redux/overtime/leaveSlice";
  import moment from "moment";

  type RequestMainProps = {
    navigation: StackNavigationProp<RootStackParamList, "RequestMain">;
  };

  const RequestMain: React.FC<RequestMainProps> = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const leaveRequests = useSelector((state: RootState) => state.leave.requests);
    const [filteredData, setFilteredData] = useState<LeaveRequest[]>(
      leaveRequests || []
    );

    useEffect(() => {
      setFilteredData(leaveRequests);
    }, [leaveRequests]);

    const handleSearch = (text: string) => {
      setSearch(text);
      if (!leaveRequests) {
        setFilteredData([]);
        return;
      }
      const filtered = leaveRequests.filter((item) => {
        const dateMatch = item.startDate
          .toLowerCase()
          .includes(text.toLowerCase());
        const leaveTypeMatch = item.leaveType
          .toLowerCase()
          .includes(text.toLowerCase());
        const statusMatch = item.status
          .toLowerCase()
          .includes(text.toLowerCase());
        return dateMatch || leaveTypeMatch || statusMatch;
      });
      setFilteredData(filtered);
    };

    const renderItem = ({ item }: { item: LeaveRequest }) => {
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
      };

      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate("DetailRequest", { item })}
        >
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Thông tin nghỉ phép:</Text>
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
              <Text style={styles.detailText}>Ngày bắt đầu:</Text>
              <Text style={styles.itemText}>{item.startDate}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>Ngày kết thúc:</Text>
              <Text style={styles.itemText}>{item.endDate}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>Loại nghỉ phép:</Text>
              <Text style={styles.itemText}>{item.leaveType}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>Lí do:</Text>
              <Text style={styles.itemText}>{item.reason}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>Số ngày nghỉ:</Text>
              <Text style={styles.itemText}>{item.dayOffs}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>Số ngày nghỉ còn lại:</Text>
              <Text style={styles.itemText}>{item.remainingDaysOff}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>Số ngày nghỉ đã sử dụng:</Text>
              <Text style={styles.itemText}>{item.usedDaysOff}</Text>
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


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBack}
          >
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tất cả yêu cầu</Text>
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
          onPress={() => navigation.navigate("LeaveRequest")}
          style={styles.addButton}
        >
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
      height:270,
    },
    itemText: {
      fontSize: 16,
      color: "black",
    },
    detail: {
      flexDirection: "row",
    },
    detailText: {
      width: 150,
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
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
    statusText: {
      textAlign: "center",
      fontSize: 12,
    },
    createdAtContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      position:'absolute',
    },
    createdAt: {
      fontWeight: "600",
    },
    codeContainer: {
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "flex-end",
      left:330,
    },
    itemCode:{
      fontSize:13,
    },
    itemStatus: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      color: "white",
      fontWeight: "600",
      alignSelf: "flex-start",
      borderRadius: 5, 
    },
  });

  export default RequestMain;
