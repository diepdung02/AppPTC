import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";
import COLORS from "../../../constants/Color"; // Ensure this contains your color definitions
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import useCustomFonts from "../../../hooks/useFont";
import { useTranslation } from 'react-i18next';

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
    image: "", // No image
    title: "Đơn nghỉ phép",
    summary: "Đơn nghỉ phép của bạn đã bị từ chối",
    date: "27-07-2024",
    sender:"Phòng nhân sự",
    link:""
  },
  {
    id: "2",
    icon: "https://img.upanh.tv/2024/07/22/approved.png",
    image: "", // No image
    title: "Đơn xin tăng ca",
    summary: "Đơn xin tăng ca của bạn được duyệt",
    date: "22-07-2024",
    sender:"Phòng nhân sự",
    link:""
  },
  {
    id: "3",
    icon: "", // No icon
    image: "https://tse3.mm.bing.net/th?id=OIP.rT1CaU2Yj6DMaEFx0H1vagHaD4&pid=Api&P=0&h=180",
    title: "Thông báo họp nhóm",
    summary: "Lịch họp nhóm tháng này đã được cập nhật. Vui lòng kiểm tra lịch và tham gia đúng giờ.",
    date: "12-07-2024",
    sender:"Phòng nhân sự",
    link:""
  },
  {
    id: "4",
    icon: "", // No icon
    image: "https://tse3.mm.bing.net/th?id=OIP._y2oyjAWBbYzjjqjyTtwEgHaE8&pid=Api&P=0&h=180",
    title: "Khen thưởng",
    summary: "Chúc mừng bạn đã đạt được khen thưởng từ công ty vì đã có những sáng kiển hay đóng góp cho công ty.",
    date: "03-07-2024",
    sender:"Phòng nhân sự",
    link:"https://docs.google.com/spreadsheets/d/e/2PACX-1vTpozmUpqn_MlpVcs-C_Qafd0bvVMcscHxSApiHekRyemPaYiE4K7KR4FeED0A1mg/pubhtml"
  },
  {
    id: "5",
    icon: "", // No icon
    image: "https://tse4.mm.bing.net/th?id=OIP.QR8DDcbYdEth7t3ODHPaDwHaE8&pid=Api&P=0&h=180",
    title: "Cập nhật chính sách",
    summary: "Chính sách nghỉ phép mới đã được áp dụng. Vui lòng đọc tài liệu mới để hiểu rõ hơn về quy định.",
    date: "24-06-2024",
    sender:"Phòng nhân sự",
    link:""
  }
];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Notifications">;
};

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(fakeNotifications);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeNotifications);
  const { t } = useTranslation();

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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const renderItem = ({ item }: { item: typeof fakeNotifications[0] }) => (
    <TouchableOpacity
    style={[
      tw`flex-row items-center p-3 bg-white mb-2 rounded-lg`,
      { padding: getScaledSize(12) },
    ]}
    onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
    >
      {item.image ? (
      <Image
      source={{ uri: item.image }}
      style={[
        {
          width: getScaledSize(128),
          height: getScaledSize(80),
          borderRadius: getScaledSize(8),
        },
        { resizeMode: "cover" },
      ]}
    />
      ) : (
        <Image
          source={{ uri: item.icon }}
          style={{
            width: getScaledSize(48),
            height: getScaledSize(48),
            borderRadius: getScaledSize(24),
          }}
        />
      )}
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
            tw`text-base my-1`,
            {
              color: COLORS.black,
              fontFamily: "CustomFont-Regular",
              fontSize: getScaledSize(14),
            },
          ]}
        >
          {truncateText(item.summary, 60)}
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
            By: {item.sender}
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
      <View style={[tw`p-2`, { backgroundColor: COLORS.colorMain }]}>
        <SearchBar
          placeholder={t("search")}
          inputContainerStyle={[
            tw`bg-white`,
            { backgroundColor: COLORS.white },
          ]}
          containerStyle={[
            tw`bg-transparent border-b border-gray-300 border-t-0`,
            { backgroundColor: COLORS.colorMain },
          ]}
          onChangeText={handleSearch}
          value={search}
          placeholderTextColor={COLORS.black}
        />
      </View>
        
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
