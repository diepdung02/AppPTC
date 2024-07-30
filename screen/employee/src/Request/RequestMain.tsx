import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchBar } from "@rneui/themed";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc"; // Import twrnc
import COLORS from "../../../../constants/Color";
import { RootStackParamList } from "../../../navigator/navigation";
import moment from "moment";

const { width, height } = Dimensions.get('window');

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Calculate scale based on the smaller ratio
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

const leaveRequests = [
  {
    id: 3,
    code: '2407250003 AL',
    startDate: '2024-09-15',
    endDate: '2024-09-20',
    leaveType: 'Nghỉ không lương',
    reason: 'Việc cá nhân',
    
    dayOffs: 6,
    remainingDaysOff: 10,
    usedDaysOff: 4,
    status: 'Đang chờ duyệt',
  },
  {
    id: 2,
    code: '2407250002 S',
    startDate: '2024-08-01',
    endDate: '2024-08-05',
    leaveType: 'Nghỉ bệnh',
    reason: 'Ốm đau',
    dayOffs: 5,
    remainingDaysOff: 10,
    usedDaysOff: 3,
    status: 'Đã bị từ chối',
  },
  {
    id: 1,
    code: '2407250001 AL',
    startDate: '2024-07-01',
    endDate: '2024-07-10',
    leaveType: 'Nghỉ phép năm',
    reason: 'Đi du lịch',
    dayOffs: 10,
    remainingDaysOff: 15,
    usedDaysOff: 5,
    status: 'Đã được duyệt',
  },
];

type RequestMainProps = {
  navigation: StackNavigationProp<RootStackParamList, "RequestMain">;
};

const RequestMain: React.FC<RequestMainProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(leaveRequests);

  useEffect(() => {
    setFilteredData(leaveRequests);
  }, []);

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

  const renderItem = ({ item }: { item: any }) => {
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

    return (
      <TouchableOpacity
        style={[tw`p-2.5 m-1.25 mx-5 rounded-md shadow-md `, { backgroundColor: COLORS.white }]}
        onPress={() => navigation.navigate("DetailRequest", { item })}
      >
        <View style={tw`flex-1`}>
          <Text style={[tw`text-lg mb-1.25 ml-2.5`, { fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(16) }]}>Thông tin nghỉ phép:</Text>
          <View style={tw`absolute`}>
            <View style={[tw`flex-col items-end`, { position: 'absolute', left: 310 * scale, top: 30 * scale }]}>
              {item.code.split("").map((char: string, index: number) => (
                <Text key={index} style={[tw`text-xs`, { fontSize: getScaledSize(12) }]}>{char}</Text>
              ))}
            </View>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Ngày bắt đầu:</Text>
            <Text style={[tw`text-lg ml-5`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.startDate}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Ngày kết thúc:</Text>
            <Text style={[tw`text-lg ml-5`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.endDate}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Loại nghỉ phép:</Text>
            <Text style={[tw`text-lg ml-5`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.leaveType}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Lí do:</Text>
            <Text style={[tw`text-lg ml-5`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.reason}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Số ngày nghỉ:</Text>
            <Text style={[tw`text-lg ml-5`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.dayOffs}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Số ngày nghỉ còn lại:</Text>
            <Text style={[tw`text-lg ml-5`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.remainingDaysOff}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Số ngày nghỉ đã sử dụng:</Text>
            <Text style={[tw`text-lg ml-5`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.usedDaysOff}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`w-37.5 text-lg`, { fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12) }]}>Trạng thái:</Text>
            <Text style={[tw`px-2 py-1 rounded-md text-center ml-5`, { backgroundColor: statusColor, color: textColor, textAlign: 'center', fontSize: getScaledSize(16) }]}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[tw`flex-1 mt-${StatusBar.currentHeight || 0}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center py-2.5 px-5`, { backgroundColor: COLORS.white }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()} 
        style={[tw`p-2`, { borderRadius: 50 }]} 
        activeOpacity={0.7} 
      >
        <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
      </TouchableOpacity>

      <Text style={[tw`text-xl flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(20) }]}>
        Danh sách đơn nghỉ phép
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("LeaveRequest")}
        style={[tw`p-2`, { borderRadius: 50 }]} 
        activeOpacity={0.7} 
      >
        <MaterialCommunityIcons name="plus-circle-outline" size={getScaledSize(24)} color={COLORS.black} />
      </TouchableOpacity>
    </View>
      <View style={tw`flex-row items-center justify-center mt-2.5 px-5`}>
        <SearchBar
          placeholder="Tìm kiếm"
          onChangeText={handleSearch}
          value={search}
          lightTheme
          round
          containerStyle={tw`flex-1`}
          inputContainerStyle={{ height: getScaledSize(40), backgroundColor: COLORS.white }}
          inputStyle={{ fontSize: getScaledSize(16) }}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={tw`pb-5`}
      />
      {/* <TouchableOpacity
        style={[
          tw`absolute bottom-2 right-2 rounded-full p-2 shadow-md`,
          { backgroundColor: COLORS.primary },
        ]}
        onPress={() => navigation.navigate("SendMail")}
      >
        <FontAwesome
          name="plus-circle"
          size={getScaledSize(50)}
          color={COLORS.white}
        />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default RequestMain;
