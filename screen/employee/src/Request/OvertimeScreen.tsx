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

// Fake overtime requests data
const fakeOvertimeRequests = [
  {
    id: 1,
    code: "2407250003",
    startDate: "13-07-2023",
    startTime: "08:00",
    endTime: "12:00",
    reason: "Hỗ trợ dự án",
    status: "Đã được duyệt",
  },
  {
    id: 2,
    code: "2407250002",
    startDate: "12-07-2023",
    startTime: "13:00",
    endTime: "17:00",
    reason: "Bảo trì hệ thống",
    status: "Đang chờ duyệt",
  },
  {
    id: 3,
    code: "2407250001",
    startDate: "11-07-2023",
    startTime: "09:00",
    endTime: "18:00",
    reason: "Nghiên cứu và phát triển",
    status: "Đã bị từ chối",
  },
];

type OvertimeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Overtime">;
};

const OvertimeScreen: React.FC<OvertimeScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeOvertimeRequests);
  const [refreshing, setRefreshing] = useState(false); 
  

  useEffect(() => {
    setFilteredData(fakeOvertimeRequests);
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = fakeOvertimeRequests.filter((item) => {
      const lowercasedText = text.toLowerCase();
      return (
        item.status.toLowerCase().includes(lowercasedText) ||
        item.startDate.toLowerCase().includes(lowercasedText) ||
        item.code.toLowerCase().includes(lowercasedText) ||
        item.reason.toLowerCase().includes(lowercasedText) 
      );
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
        style={[tw`p-${getScaledSize(2.5)} m-${getScaledSize(1.25)} mx-${getScaledSize(5)} rounded-md shadow-md`, { backgroundColor: COLORS.white }]}
        onPress={() => navigation.navigate("DetailOvertime", { item })}
      >
        <View >
          <Text style={[tw`mb-${getScaledSize(1.25)} ml-${getScaledSize(2.5)}`, { fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(16) }]}>Thông tin tăng ca:</Text>
          <View style={tw`absolute`}>
            <View style={[tw`flex-col items-end`, { position: 'absolute', left: getScaledSize(310), top: getScaledSize(30) }]}>
              {item.code.split("").map((char: string, index: number) => (
                <Text key={index} style={[{ fontSize: getScaledSize(12) }]}>{char}</Text>
              ))}
            </View>
          </View>
          <View style={[{height:getScaledSize(170)}]}>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Ngày bắt đầu:</Text>
            <Text style={[tw`ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.startDate}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Giờ bắt đầu:</Text>
            <Text style={[tw`ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.startTime}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Giờ kết thúc:</Text>
            <Text style={[tw`ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.endTime}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[{ fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(12), width: getScaledSize(140) }]}>Lí do:</Text>
            <Text style={[tw`ml-${getScaledSize(5)}`, { color: COLORS.black, fontSize: getScaledSize(16) }]}>{truncateText(item.reason, 15)}</Text>
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
          Danh sách đơn tăng ca
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("OvertimeRequest")}
          style={[tw`p-${getScaledSize(2)}`, { borderRadius: 50 }]} 
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
          inputContainerStyle={{ backgroundColor: COLORS.white }}
          inputStyle={{ fontSize: getScaledSize(14) }}
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
    </SafeAreaView>
  );
};

export default OvertimeScreen;
