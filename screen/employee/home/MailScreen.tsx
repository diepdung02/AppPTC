import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import COLORS from "../../../constants/Color"; // Ensure this contains color definitions
import useCustomFonts from "../../../hooks/useFont";

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Get screen dimensions and calculate scale
const { width, height } = Dimensions.get("window");
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

// Function to get scaled size
const getScaledSize = (size: number) => size * scale;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Mail">;
};

// Fake email data with images
const fakeEmails = [
  {
    id: "1",
    subject: "Lời nhắc họp",
    message: "Đừng quên cuộc họp của chúng ta vào lúc 10 giờ sáng ngày mai.",
    to: "Nguyễn Văn A",
    timestamp: "02-08-2024",
    image: "https://tse2.mm.bing.net/th?id=OIP.sUzgVQs4qnN29hw99ppIHgHaFj&pid=Api&P=0&h=180",
  },
  {
    id: "2",
    subject: "Cập nhật dự án",
    message: "Dự án đang tiến triển tốt và đúng tiến độ.",
    to: "Trần Thị B",
    timestamp: "27-07-2024",
    image: "https://tse2.mm.bing.net/th?id=OIP.Iy3dI8Vf8hAf_a9GqLwdHwHaEc&pid=Api&P=0&h=180",
  },
  {
    id: "3",
    subject: "Báo cáo hàng tuần",
    message: "Vui lòng gửi báo cáo hàng tuần vào cuối ngày hôm nay.",
    to: "Phạm Văn C",
    timestamp: "22-07-2024",
    image: "https://tse1.mm.bing.net/th?id=OIP.6WE_rdPZ9eVOwTo7-Foy9wHaFC&pid=Api&P=0&h=180",
  },
  {
    id: "6",
    subject: "Báo cáo hàng tuần",
    message: "Vui lòng gửi báo cáo hàng tuần vào cuối ngày hôm nay.",
    to: "Phạm Văn C",
    timestamp: "12-07-2024",
    image: "https://tse1.mm.bing.net/th?id=OIP.6WE_rdPZ9eVOwTo7-Foy9wHaFC&pid=Api&P=0&h=180",
  },
  {
    id: "4",
    subject: "Báo cáo hàng tuần",
    message: "Vui lòng gửi báo cáo hàng tuần vào cuối ngày hôm nay.",
    to: "Phạm Văn C",
    timestamp: "20-06-2024",
    image: "https://tse2.mm.bing.net/th?id=OIP.cDYOW0VqswuzfEhICIzW9wHaEr&pid=Api&P=0&h=180",
  },
  {
    id: "5",
    subject: "Báo cáo hàng tuần",
    message: "Vui lòng gửi báo cáo hàng tuần vào cuối ngày hôm nay.",
    to: "Phạm Văn C",
    timestamp: "01-06-2024",
    image: "https://tse2.mm.bing.net/th?id=OIP.cDYOW0VqswuzfEhICIzW9wHaEr&pid=Api&P=0&h=180",
  },
];

const MailScreen: React.FC<Props> = ({ navigation }) => {
  const [emails, setEmails] = useState(fakeEmails);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeEmails);

  useEffect(() => {
    // Filter emails based on search query
    const filtered = emails.filter(
      (item) =>
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase()) ||
        item.to.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, emails]);

  const handleItemPress = (item: (typeof fakeEmails)[0]) => {
    navigation.navigate("MailDetail", { emailItem: item });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View
        style={[
          tw`flex-1 justify-center items-center`,
          { backgroundColor: COLORS.black },
        ]}
      >
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`p-2`, { backgroundColor: COLORS.colorMain }]}>
        <SearchBar
          placeholder="Tìm kiếm"
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
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              tw`flex-row items-center p-2 mb-2`,
              { backgroundColor: COLORS.white },
            ]}
            onPress={() => handleItemPress(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: getScaledSize(128),
                height: getScaledSize(80),
                borderRadius: getScaledSize(8),
                resizeMode: "cover",
              }}
            />
            <View style={tw`flex-1 pl-2`}>
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
                Chủ đề: {item.subject}
              </Text>
              <Text
                style={[
                  tw`text-base`,
                  {
                    color: COLORS.black,
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Nội dung: {truncateText(item.message, 50)}
              </Text>
              <View style={tw`flex-row justify-between mt-2`}>
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
                  {item.timestamp}
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
                  To: {item.to}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

<TouchableOpacity
  style={[
    tw`absolute bottom-2 right-2 rounded-full p-2 shadow-md`,
    {
      backgroundColor: COLORS.primary,
      width: 70,
      height: 70,
      justifyContent: 'center', // Căn giữa theo trục chính
      alignItems: 'center',     // Căn giữa theo trục phụ
    },
  ]}
  onPress={() => navigation.navigate("SendMail")}
>
  <FontAwesome
    name="plus-circle"
    size={getScaledSize(50)}
    color={COLORS.white}
  />
</TouchableOpacity>

    </SafeAreaView>
  );
};

export default MailScreen;