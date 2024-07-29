import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";
import COLORS from "../../../constants/Color"; // Ensure this contains your color definitions
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import useCustomFonts from "../../../hooks/useFont";

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Calculate scale
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

// Function to get scaled size
const getScaledSize = (size: number) => size * scale;

// Fake data for testing
const fakeNotifications = [
  {
    id: "1",
    icon: "https://img.upanh.tv/2024/07/22/reject89259f678d8bbaef.png",
    title: "Đơn nghỉ phép",
    summary: "Đơn nghỉ phép của bạn đã bị từ chối",
    date: "20-07-2024",
  },
  {
    id: "2",
    icon: "https://img.upanh.tv/2024/07/22/approved.png",
    title: "Đơn xin tăng ca",
    summary: "Đơn xin tăng ca của bạn được duyệt",
    date: "21-07-2024",
  },
];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Notifications">;
};

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(fakeNotifications);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeNotifications);

  // Load custom fonts
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    setFilteredData(notifications);
  }, [notifications]);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = notifications.filter(
      (item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.summary.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderItem = ({ item }: { item: (typeof fakeNotifications)[0] }) => (
    <TouchableOpacity
      style={[
        tw`flex-row items-center p-3 bg-white mb-2 rounded-lg`,
        { padding: getScaledSize(12) },
      ]}
    >
      <Image
        source={{ uri: item.icon }}
        style={{
          width: getScaledSize(48),
          height: getScaledSize(48),
          borderRadius: getScaledSize(24),
        }}
      />
      <View style={tw`ml-3 flex-1`}>
        <Text
          style={[
            tw`text-lg text-center`,
            {
              color: COLORS.black,
              fontFamily: "CustomFont-Bold",
              fontSize: getScaledSize(16),
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            tw`text-base my-1 `,
            {
              color: COLORS.black,
              fontFamily: "CustomFont-Regular",
              fontSize: getScaledSize(14),
            },
          ]}
        >
          {item.summary}
        </Text>
        <View style={tw`flex-row justify-between mt-1`}>
          <Text
            style={[
              tw`text-sm`,
              {
                color: COLORS.date,
                fontFamily: "CustomFont-Regular",
                fontSize: getScaledSize(12),
              },
            ]}
          >
            {item.date}
          </Text>
          <Text
            style={[
              tw`text-sm`,
              {
                color: COLORS.date,
                fontFamily: "CustomFont-Italic",
                fontSize: getScaledSize(12),
              },
            ]}
          >
            By: Phòng nhân sự
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Text
            style={[
              tw`text-lg`,
              { color: COLORS.black, fontSize: getScaledSize(16) },
            ]}
          >
            Loading Fonts...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
     <SearchBar
          placeholder="Tìm kiếm "
          inputContainerStyle={[
            tw`bg-white`,
            { backgroundColor: COLORS.white },
          ]}
          containerStyle={[
            tw`bg-transparent border-b border-gray-300 border-t-0`,
            { backgroundColor: COLORS.colorMain },
          ]}
          onChangeText={setSearch}
          value={search}
          placeholderTextColor={COLORS.black}
        />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`flex-grow`}
        ListEmptyComponent={
          <Text
            style={[
              tw`text-center mt-5`,
              {
                color: COLORS.darkGray,
                fontSize: getScaledSize(16),
                fontFamily: "CustomFont-Regular",
              },
            ]}
          >
            Không có thông báo nào.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
