import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  RefreshControl
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchBar } from "@rneui/themed";

import tw from "twrnc"; 
import COLORS from "../../../../constants/Color";
import { RootStackParamList } from "../../../navigator/navigation";


const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const getScaledSize = (size: number) => {
  const minWidth = 320;  
  const maxWidth = 1024; 

  const width = Dimensions.get('window').width;


  const scaleWidth = initialWidth / 375; 
  const scaleHeight = initialHeight / 667; 

  const scale = Math.min(scaleWidth, scaleHeight);

  if (width < minWidth) {
    return size * 0.5; 
  } else if (width > maxWidth) {
    return size * 1.2; 
  } else {
    return size * scale;
  }
};

const leaveRequests = [
  {
    id: 3,
    code: '2407250003 AL',
    startDate: '15-09-2024',
    endDate: '17-09-2024',
    leaveType: 'Nghỉ không lương',
    reason: 'Việc cá nhân',
    
    dayOffs: 2,
    remainingDaysOff: 2,
    usedDaysOff: 10,
    status: 'Đang chờ duyệt',
  },
  {
    id: 2,
    code: '2407250002 S',
    startDate: '02-08-2024',
    endDate: '05-08-2024',
    leaveType: 'Nghỉ bệnh',
    reason: 'Ốm đau',
    dayOffs: 3,
    remainingDaysOff: 4,
    usedDaysOff: 8,
    status: 'Đã bị từ chối',
  },
  {
    id: 1,
    code: '2407250001 AL',
    startDate: '15-07-2024',
    endDate: '10-07-2024',
    leaveType: 'Nghỉ phép năm',
    reason: 'Đi du lịch',
    dayOffs: 5,
    remainingDaysOff: 7,
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
  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    setFilteredData(leaveRequests);
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

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
        style={[tw`p-${getScaledSize(2.5)} m-${getScaledSize(1.25)} mx-${getScaledSize(5)} rounded-md shadow-md `, { backgroundColor: COLORS.white }]}
        onPress={() => navigation.navigate("DetailRequest", { item })}
      >
        <View >
          <Text style={[tw` mb-${getScaledSize(1.25)} ml-${getScaledSize(2.5)}`, { fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(16) }]}>Thông tin nghỉ phép:</Text>
          <View style={tw`absolute`}>
      <View style={[tw`flex-col items-start`, { position: 'absolute', left: getScaledSize(310), top: getScaledSize(30) }]}>
        {item.code.split("").map((char: string, index: number) => (
          <Text key={index} style={[{ fontSize: getScaledSize(12) }]}>{char}</Text>
        ))}
      </View>
    </View>
    <View style={[ {height:getScaledSize(220)}]}>
          <View style={[tw`flex-row`]}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Ngày bắt đầu:</Text>
            <Text style={[tw` ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.startDate}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Ngày kết thúc:</Text>
            <Text style={[tw` ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.endDate}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Loại nghỉ phép:</Text>
            <Text style={[tw` ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.leaveType}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Lí do:</Text>
            <Text style={[tw` ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.reason}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Số ngày nghỉ:</Text>
            <Text style={[tw` ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.dayOffs}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Số ngày nghỉ còn lại:</Text>
            <Text style={[tw` ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.remainingDaysOff}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Số ngày nghỉ đã sử dụng:</Text>
            <Text style={[tw`ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.usedDaysOff}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Trạng thái:</Text>
            <Text style={[tw`px-${getScaledSize(2)} py-${getScaledSize(1)} rounded-md text-center ml-${getScaledSize(5)}`, { backgroundColor: statusColor, color: textColor, textAlign: 'center', fontSize: getScaledSize(16) }]}>{item.status}</Text>
          </View>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center py-${getScaledSize(2.5)} px-${getScaledSize(5)} mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()} 
        style={[tw`p-${getScaledSize(2)}`, { borderRadius: 50 }]} 
        activeOpacity={0.7} 
      >
        <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
      </TouchableOpacity>

      <Text style={[tw`flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(18) }]}>
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
      <View style={tw`flex-row items-center justify-center mt-${getScaledSize(2.5)} px-${getScaledSize(5)}`}>
        <SearchBar
          placeholder="Tìm kiếm"
          onChangeText={handleSearch}
          value={search}
          lightTheme
          round
          containerStyle={tw`flex-1 bg-transparent border-b border-gray-300 border-t-0`}
          inputContainerStyle={{ height: getScaledSize(40), backgroundColor: COLORS.white }}
          inputStyle={{ fontSize: getScaledSize(16) }}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={tw`pb-${getScaledSize(5)}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
