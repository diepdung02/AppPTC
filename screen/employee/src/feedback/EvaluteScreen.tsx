import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";
import COLORS from "../../../../constants/Color"; // Đảm bảo rằng tệp này chứa định nghĩa màu sắc của bạn
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/navigation";
import useCustomFonts from "../../../../hooks/useFont";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import icon library

// Kích thước cơ sở cho việc thay đổi kích thước
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Lấy kích thước màn hình
const { width, height } = Dimensions.get("window");

// Tính tỷ lệ
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

// Hàm để lấy kích thước đã thay đổi
const getScaledSize = (size: number) => size * scale;

// Dữ liệu mẫu với tháng và nhiều mục đánh giá
const fakeReviews = [
   
      {
        month: "Tháng 7",
        reviews: [
          { category: "Chăm chỉ", level: "Tốt", comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
          { category: "Kỹ năng giao tiếp", level: "Hài lòng", comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
          { category: "Sáng tạo", level: "Rất Tốt", comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
          { category: "Chủ động trong công việc", level: "Tốt", comment: "Rất chủ động và sáng tạo trong công việc." },
          { category: "Làm việc nhóm", level: "Tốt", comment: "Làm việc nhóm hiệu quả và tích cực." },
          { category: "Làm việc độc lập", level: "Tốt", comment: "Có khả năng làm việc độc lập tốt." },
          { category: "Trung thực", level: "Tốt", comment: "Luôn trung thực và đáng tin cậy." },
          { category: "Mối quan hệ với đồng nghiệp", level: "Tốt", comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
          { category: "Kỹ năng chuyên môn", level: "Tốt", comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
          { category: "Đi làm đúng giờ", level: "Tốt", comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
          { category: "Đi làm đầy đủ", level: "Tốt", comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
          { category: "Năng suất", level: "Tốt", comment: "Năng suất làm việc cao và hiệu quả." },
        ],
      },
      {
        month: "Tháng 6",
        reviews: [
          { category: "Chăm chỉ", level: "Tốt", comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
          { category: "Kỹ năng giao tiếp", level: "Hài lòng", comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
          { category: "Sáng tạo", level: "Rất Tốt", comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
          { category: "Chủ động trong công việc", level: "Tốt", comment: "Rất chủ động và sáng tạo trong công việc." },
          { category: "Làm việc nhóm", level: "Tốt", comment: "Làm việc nhóm hiệu quả và tích cực." },
          { category: "Làm việc độc lập", level: "Tốt", comment: "Có khả năng làm việc độc lập tốt." },
          { category: "Trung thực", level: "Tốt", comment: "Luôn trung thực và đáng tin cậy." },
          { category: "Mối quan hệ với đồng nghiệp", level: "Tốt", comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
          { category: "Kỹ năng chuyên môn", level: "Tốt", comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
          { category: "Đi làm đúng giờ", level: "Tốt", comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
          { category: "Đi làm đầy đủ", level: "Tốt", comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
          { category: "Năng suất", level: "Tốt", comment: "Năng suất làm việc cao và hiệu quả." },
        ],
      },
      {
        month: "Tháng 5",
        reviews: [
          { category: "Chăm chỉ", level: "Tốt", comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
          { category: "Kỹ năng giao tiếp", level: "Hài lòng", comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
          { category: "Sáng tạo", level: "Rất Tốt", comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
          { category: "Chủ động trong công việc", level: "Tốt", comment: "Rất chủ động và sáng tạo trong công việc." },
          { category: "Làm việc nhóm", level: "Tốt", comment: "Làm việc nhóm hiệu quả và tích cực." },
          { category: "Làm việc độc lập", level: "Tốt", comment: "Có khả năng làm việc độc lập tốt." },
          { category: "Trung thực", level: "Tốt", comment: "Luôn trung thực và đáng tin cậy." },
          { category: "Mối quan hệ với đồng nghiệp", level: "Tốt", comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
          { category: "Kỹ năng chuyên môn", level: "Tốt", comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
          { category: "Đi làm đúng giờ", level: "Tốt", comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
          { category: "Đi làm đầy đủ", level: "Tốt", comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
          { category: "Năng suất", level: "Tốt", comment: "Năng suất làm việc cao và hiệu quả." },
        ],
      },
      {
        month: "Tháng 4",
        reviews: [
          { category: "Chăm chỉ", level: "Tốt", comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
          { category: "Kỹ năng giao tiếp", level: "Hài lòng", comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
          { category: "Sáng tạo", level: "Rất Tốt", comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
          { category: "Chủ động trong công việc", level: "Tốt", comment: "Rất chủ động và sáng tạo trong công việc." },
          { category: "Làm việc nhóm", level: "Tốt", comment: "Làm việc nhóm hiệu quả và tích cực." },
          { category: "Làm việc độc lập", level: "Tốt", comment: "Có khả năng làm việc độc lập tốt." },
          { category: "Trung thực", level: "Tốt", comment: "Luôn trung thực và đáng tin cậy." },
          { category: "Mối quan hệ với đồng nghiệp", level: "Tốt", comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
          { category: "Kỹ năng chuyên môn", level: "Tốt", comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
          { category: "Đi làm đúng giờ", level: "Tốt", comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
          { category: "Đi làm đầy đủ", level: "Tốt", comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
          { category: "Năng suất", level: "Tốt", comment: "Năng suất làm việc cao và hiệu quả." },
        ],
      },
      {
        month: "Tháng 3",
        reviews: [
          { category: "Chăm chỉ", level: "Tốt", comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
          { category: "Kỹ năng giao tiếp", level: "Hài lòng", comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
          { category: "Sáng tạo", level: "Rất Tốt", comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
          { category: "Chủ động trong công việc", level: "Tốt", comment: "Rất chủ động và sáng tạo trong công việc." },
          { category: "Làm việc nhóm", level: "Tốt", comment: "Làm việc nhóm hiệu quả và tích cực." },
          { category: "Làm việc độc lập", level: "Tốt", comment: "Có khả năng làm việc độc lập tốt." },
          { category: "Trung thực", level: "Tốt", comment: "Luôn trung thực và đáng tin cậy." },
          { category: "Mối quan hệ với đồng nghiệp", level: "Tốt", comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
          { category: "Kỹ năng chuyên môn", level: "Tốt", comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
          { category: "Đi làm đúng giờ", level: "Tốt", comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
          { category: "Đi làm đầy đủ", level: "Tốt", comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
          { category: "Năng suất", level: "Tốt", comment: "Năng suất làm việc cao và hiệu quả." },
        ],
      },
    {
      month: "Tháng 2",
      reviews: [
        { category: "Chăm chỉ", level: "Tốt", comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
        { category: "Kỹ năng giao tiếp", level: "Hài lòng", comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
        { category: "Sáng tạo", level: "Rất Tốt", comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
        { category: "Chủ động trong công việc", level: "Tốt", comment: "Rất chủ động và sáng tạo trong công việc." },
        { category: "Làm việc nhóm", level: "Tốt", comment: "Làm việc nhóm hiệu quả và tích cực." },
        { category: "Làm việc độc lập", level: "Tốt", comment: "Có khả năng làm việc độc lập tốt." },
        { category: "Trung thực", level: "Tốt", comment: "Luôn trung thực và đáng tin cậy." },
        { category: "Mối quan hệ với đồng nghiệp", level: "Tốt", comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
        { category: "Kỹ năng chuyên môn", level: "Tốt", comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
        { category: "Đi làm đúng giờ", level: "Tốt", comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
        { category: "Đi làm đầy đủ", level: "Tốt", comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
        { category: "Năng suất", level: "Tốt", comment: "Năng suất làm việc cao và hiệu quả." },
      ],
    },
    {
      month: "Tháng 1",
      reviews: [
        { category: "Chăm chỉ", level: "Tốt", comment: "Nhân viên làm việc rất chăm chỉ và có trách nhiệm." },
        { category: "Kỹ năng giao tiếp", level: "Hài lòng", comment: "Thái độ làm việc tốt nhưng cần cải thiện kỹ năng giao tiếp." },
        { category: "Sáng tạo", level: "Rất Tốt", comment: "Rất sáng tạo và có nhiều đóng góp tích cực cho dự án." },
        { category: "Chủ động trong công việc", level: "Tốt", comment: "Rất chủ động và sáng tạo trong công việc." },
        { category: "Làm việc nhóm", level: "Tốt", comment: "Làm việc nhóm hiệu quả và tích cực." },
        { category: "Làm việc độc lập", level: "Tốt", comment: "Có khả năng làm việc độc lập tốt." },
        { category: "Trung thực", level: "Tốt", comment: "Luôn trung thực và đáng tin cậy." },
        { category: "Mối quan hệ với đồng nghiệp", level: "Tốt", comment: "Mối quan hệ tốt với đồng nghiệp và xây dựng môi trường làm việc tích cực." },
        { category: "Kỹ năng chuyên môn", level: "Tốt", comment: "Kỹ năng chuyên môn vững vàng và đáng tin cậy." },
        { category: "Đi làm đúng giờ", level: "Tốt", comment: "Luôn đi làm đúng giờ và tuân thủ giờ làm việc." },
        { category: "Đi làm đầy đủ", level: "Tốt", comment: "Đi làm đầy đủ và không vắng mặt không lý do." },
        { category: "Năng suất", level: "Tốt", comment: "Năng suất làm việc cao và hiệu quả." },
      ],
    },
    // Thêm dữ liệu cho các tháng khác
  ];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "EvaluateScreen">;
};

const EvaluateScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeReviews);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  // Tải phông chữ tùy chỉnh
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
            {review.category} - Điểm: {review.level}
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
            {(review.comment)}
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
      <View style={[tw`flex-row items-center py-2.5 px-5`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} 
          style={[tw`p-2`, { borderRadius: 50 }]} 
          activeOpacity={0.7} 
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={[tw`text-xl flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(20) }]}>
          Danh sách đánh giá
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("OvertimeRequest")}
          style={[tw`p-2`, { borderRadius: 50 }]} 
          activeOpacity={0.7} 
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      
      <View style={[tw`p-2`, { backgroundColor: COLORS.colorMain }]}>
        
      </View>
      
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.month}-${index}`}
        contentContainerStyle={tw`p-4`}
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
