import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";
import COLORS from "../../../constants/Color"; // Ensure this contains your color definitions
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import useCustomFonts from "../../../hooks/useFont";
import { useTranslation } from 'react-i18next';

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
// Fake data for testing
const fakeNotifications = [
  {
    id: "7",
    icon: "",
    image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/08/tet-trung-thu-2023-5.jpg", // Không có hình ảnh
    title: "Bầu chọn quà Trung Thu",
    summary: "Bạn có một cuộc bầu chọn về món quà Trung Thu. Hãy tham gia ngay!",
    date: "12-08-2024",
    sender: "Phòng nhân sự",
    link: "",
    vote:"",
  },
  {
    id: "6",
    icon: "",
    image: "https://khaosat.me/blog/wp-content/uploads/2021/04/danh-gia-nhan-vien-1024x576.jpg", // Không có hình ảnh
    title: "Đánh giá nhân viên",
    summary: "Bạn đã được nhận đánh giá vào tháng 7.",
    date: "31-07-2024",
    sender: "Phòng nhân sự",
    link: "",
    vote:"",

  },
  {
    id: "1",
    icon: "https://img.upanh.tv/2024/07/22/reject89259f678d8bbaef.png",
    image: "", 
    title: "Đơn nghỉ phép",
    summary: "Đơn nghỉ phép của bạn đã bị từ chối",
    date: "27-07-2024",
    sender:"Phòng nhân sự",
    link:"",
    vote:"",

  },
  {
    id: "2",
    icon: "https://img.upanh.tv/2024/07/22/approved.png",
    image: "", 
    title: "Đơn xin tăng ca",
    summary: "Đơn xin tăng ca của bạn được duyệt",
    date: "22-07-2024",
    sender:"Phòng nhân sự",
    link:"",
    vote:"",

  },
  {
    id: "3",
    icon: "", 
    image: "https://tse3.mm.bing.net/th?id=OIP.rT1CaU2Yj6DMaEFx0H1vagHaD4&pid=Api&P=0&h=180",
    title: "Thông báo họp nhóm",
    summary: "Lịch họp nhóm tháng này đã được cập nhật. Vui lòng kiểm tra lịch và tham gia đúng giờ.",
    date: "12-07-2024",
    sender:"Phòng nhân sự",
    link:"",
    vote:"",

  },
  {
    id: "4",
    icon: "", // No icon
    image: "https://tse3.mm.bing.net/th?id=OIP._y2oyjAWBbYzjjqjyTtwEgHaE8&pid=Api&P=0&h=180",
    title: "Khen thưởng",
    summary: "Chúc mừng bạn đã đạt được khen thưởng từ công ty vì đã có những sáng kiển hay đóng góp cho công ty.",
    date: "03-07-2024",
    sender:"Phòng nhân sự",
    link:"https://docs.google.com/spreadsheets/d/e/2PACX-1vTpozmUpqn_MlpVcs-C_Qafd0bvVMcscHxSApiHekRyemPaYiE4K7KR4FeED0A1mg/pubhtml",
    vote:""
  },
  {
    id: "5",
    icon: "", // No icon
    image: "https://tse4.mm.bing.net/th?id=OIP.QR8DDcbYdEth7t3ODHPaDwHaE8&pid=Api&P=0&h=180",
    title: "Cập nhật chính sách",
    summary: "Chính sách nghỉ phép mới đã được áp dụng. Vui lòng đọc tài liệu mới để hiểu rõ hơn về quy định.",
    date: "24-06-2024",
    sender:"Phòng nhân sự",
    link:"",
    vote:""
  },

];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Notifications">;
};

const NotificationScreen: React.FC<Props> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(fakeNotifications);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeNotifications);
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false); 

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
  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
         <View style={[tw`p-${getScaledSize(4)} `]}>
        <SearchBar
          placeholder={t("search")}
          inputContainerStyle={[
            tw`bg-white`,
            { backgroundColor: COLORS.white },
          ]}
          containerStyle={[
            tw`bg-transparent border-t-0 mt-${getScaledSize(5)}`, // Không có viền trên
            {
              borderBottomWidth: 1, // Viền dưới
              borderBottomColor: COLORS.border, // Màu viền dưới với opacity
            },
          ]}
          onChangeText={handleSearch}
          value={search}
          placeholderTextColor={COLORS.black}
        />
      </View>
        
      <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
