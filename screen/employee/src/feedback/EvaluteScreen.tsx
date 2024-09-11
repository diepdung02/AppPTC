import React, { useState } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import tw from "twrnc";
import COLORS from "../../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/navigation";
import useCustomFonts from "../../../../hooks/useFont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StarRating from "./StarRating";

const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

const { width, height } = Dimensions.get("window");

const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => size * scale;

const fakeReviews = [
  {
    month: "Tháng 7",
    reviews: [
      { category: "Chăm chỉ", level: 5, comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
      { category: "Kỹ năng giao tiếp", level: 4, comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
      { category: "Sáng tạo", level: 5, comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
      { category: "Chủ động trong công việc", level: 5, comment: "Rất chủ động và sáng tạo trong công việc." },
      { category: "Làm việc nhóm", level: 4, comment: "Làm việc nhóm hiệu quả và tích cực." },
      { category: "Làm việc độc lập", level: 4, comment: "Có khả năng làm việc độc lập tốt." },
      { category: "Trung thực", level: 5, comment: "Luôn trung thực và đáng tin cậy." },
      { category: "Mối quan hệ với đồng nghiệp", level: 4, comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
      { category: "Kỹ năng chuyên môn", level: 5, comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
      { category: "Đi làm đúng giờ", level: 5, comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
      { category: "Đi làm đầy đủ", level: 5, comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
      { category: "Năng suất", level: 5, comment: "Năng suất làm việc cao và hiệu quả." },
    ],
  },
  {
    month: "Tháng 8",
    reviews: [
      { category: "Chăm chỉ", level: 5, comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
      { category: "Kỹ năng giao tiếp", level: 4, comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
      { category: "Sáng tạo", level: 5, comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
      { category: "Chủ động trong công việc", level: 5, comment: "Rất chủ động và sáng tạo trong công việc." },
      { category: "Làm việc nhóm", level: 4, comment: "Làm việc nhóm hiệu quả và tích cực." },
      { category: "Làm việc độc lập", level: 4, comment: "Có khả năng làm việc độc lập tốt." },
      { category: "Trung thực", level: 5, comment: "Luôn trung thực và đáng tin cậy." },
      { category: "Mối quan hệ với đồng nghiệp", level: 4, comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
      { category: "Kỹ năng chuyên môn", level: 5, comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
      { category: "Đi làm đúng giờ", level: 5, comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
      { category: "Đi làm đầy đủ", level: 5, comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
      { category: "Năng suất", level: 5, comment: "Năng suất làm việc cao và hiệu quả." },
    ],
  },
  {
    month: "Tháng 9",
    reviews: [
      { category: "Chăm chỉ", level: 5, comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
      { category: "Kỹ năng giao tiếp", level: 4, comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
      { category: "Sáng tạo", level: 5, comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
      { category: "Chủ động trong công việc", level: 5, comment: "Rất chủ động và sáng tạo trong công việc." },
      { category: "Làm việc nhóm", level: 4, comment: "Làm việc nhóm hiệu quả và tích cực." },
      { category: "Làm việc độc lập", level: 4, comment: "Có khả năng làm việc độc lập tốt." },
      { category: "Trung thực", level: 5, comment: "Luôn trung thực và đáng tin cậy." },
      { category: "Mối quan hệ với đồng nghiệp", level: 4, comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
      { category: "Kỹ năng chuyên môn", level: 5, comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
      { category: "Đi làm đúng giờ", level: 5, comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
      { category: "Đi làm đầy đủ", level: 5, comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
      { category: "Năng suất", level: 5, comment: "Năng suất làm việc cao và hiệu quả." },
    ],
  },
];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "EvaluateScreen">;
};

const EvaluateScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeReviews);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  const fontsLoaded = useCustomFonts();

  const toggleExpand = (month: string) => {
    setExpandedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const renderItem = ({ item }: { item: typeof fakeReviews[0] }) => (
    <View style={[tw`mb-4`]}>
      <TouchableOpacity onPress={() => toggleExpand(item.month)} style={tw`flex-row items-center`}>
        <Text
          style={[
            tw`text-lg font-semibold mb-2 flex-1`,
            { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize: getScaledSize(18) },
          ]}
        >
          {item.month}
        </Text>
        <MaterialCommunityIcons
          name={expandedMonths.includes(item.month) ? "chevron-up" : "chevron-down"}
          size={getScaledSize(24)}
          color={COLORS.black}
        />
      </TouchableOpacity>
      {expandedMonths.includes(item.month) && item.reviews.map((review, index) => (
        <View
          key={index}
          style={[
            tw`p-3 bg-white mb-2 rounded-lg`,
            { padding: getScaledSize(12) },
          ]}
        >
          <View style={tw` items-center justify-between`}>
            <Text
              style={[
                tw`text-lg font-semibold`,
                {
                  color: COLORS.black,
                  fontFamily: "CustomFont-Bold",
                  fontSize: getScaledSize(16),
                },
              ]}
            >
              {review.category}
            </Text>
            <StarRating
              rating={review.level} // Đặt rating cho từng review
              maxRating={5}
              starSize={30}
              starColor="#FFD700"
            />
          </View>
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
            {review.comment}
          </Text>
        </View>
      ))}
    </View>
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
      <View
        style={[
          tw`flex-row items-center py-2.5 px-5 mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2`}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text
          style={[
            tw` flex-1 text-center`,
            { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize: getScaledSize(18), },
          ]}
        >
          Danh sách đánh giá
        </Text>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.month}
        contentContainerStyle={tw`p-5`}
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
            Không có đánh giá nào.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default EvaluateScreen;
