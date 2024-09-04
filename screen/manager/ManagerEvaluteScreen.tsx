import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigator/navigation";
import StarRating from "./StarRating"; // Đảm bảo đã tạo component StarRating
import RNPickerSelect from 'react-native-picker-select'; // Import RNPickerSelect

const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

const { width, height } = Dimensions.get("window");

const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => size * scale;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "ApproveLeaveScreen">;
};

const ManagerEvaluateScreen: React.FC<Props> = ({ navigation }) => {
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [reviewCategory, setReviewCategory] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [rating, setRating] = useState<number>(0);

  const employeeOptions = [
    { label: "Diệp Minh Dũng", value: "Diệp Minh Dũng" },
    { label: "Nhân viên B", value: "employeeB" },
    // Thêm các tùy chọn khác ở đây
  ];

  const categoryOptions = [
    { label: "Chăm chỉ", value: "diligence" },
    { label: "Kỹ năng giao tiếp", value: "communication" },
    { label: "Sáng tạo", value: "creativity" },
    { label: "Chủ động trong công việc", value: "proactivity" },
    { label: "Làm việc nhóm", value: "teamwork" },
    { label: "Làm việc độc lập", value: "independence" },
    { label: "Trung thực", value: "honesty" },
    { label: "Mối quan hệ với đồng nghiệp", value: "colleague_relation" },
    { label: "Kỹ năng chuyên môn", value: "professional_skill" },
    { label: "Đi làm đúng giờ", value: "punctuality" },
    { label: "Đi làm đầy đủ", value: "attendance" },
    { label: "Năng suất", value: "productivity" },
  ];

  const handleSubmit = () => {
    if (!employeeName || !reviewCategory) {
      Alert.alert("Thông báo", "Vui lòng chọn tên nhân viên và danh mục đánh giá.");
      return;
    }
    // Xử lý gửi đánh giá (có thể gửi đến API hoặc lưu trữ cục bộ)
    Alert.alert("Đánh giá đã được gửi", `Tên nhân viên: ${employeeName}\nDanh mục: ${reviewCategory}\nNhận xét: ${reviewComment}\nĐánh giá: ${rating} sao`);
    // Reset form
    setEmployeeName(null);
    setReviewCategory(null);
    setReviewComment("");
    setRating(0);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
              tw`text-xl flex-1 text-center`,
              { color: COLORS.black, fontFamily: "CustomFont-Bold" },
            ]}
          >
            Đánh giá nhân viên
          </Text>
        </View>
        <View style={[tw`p-5`, { backgroundColor: COLORS.colorMain, flex: 1 }]}>
          <RNPickerSelect
            placeholder={{ label: "Chọn tên nhân viên", value: null }}
            value={employeeName}
            onValueChange={(value) => setEmployeeName(value)}
            items={employeeOptions}
            style={{
              inputIOS: {
                padding: getScaledSize(14),
                borderColor: COLORS.darkGray,
                borderWidth: 1,
                borderRadius: getScaledSize(8),
                fontSize: getScaledSize(16),
                marginBottom: getScaledSize(16),
              },
              inputAndroid: {
                padding: getScaledSize(14),
                borderColor: COLORS.darkGray,
                borderWidth: 1,
                borderRadius: getScaledSize(8),
                fontSize: getScaledSize(16),
                marginBottom: getScaledSize(16),
              },
            }}
          />

          <RNPickerSelect
            placeholder={{ label: "Chọn danh mục đánh giá", value: null }}
            value={reviewCategory}
            onValueChange={(value) => setReviewCategory(value)}
            items={categoryOptions}
            style={{
              inputIOS: {
                padding: getScaledSize(14),
                borderColor: COLORS.darkGray,
                borderWidth: 1,
                borderRadius: getScaledSize(8),
                fontSize: getScaledSize(16),
                marginBottom: getScaledSize(16),
              },
              inputAndroid: {
                padding: getScaledSize(14),
                borderColor: COLORS.darkGray,
                borderWidth: 1,
                borderRadius: getScaledSize(8),
                fontSize: getScaledSize(16),
                marginBottom: getScaledSize(16),
              },
            }}
          />

          <TextInput
            placeholder="Nhận xét"
            value={reviewComment}
            onChangeText={setReviewComment}
            multiline
            numberOfLines={4}
            style={[tw`p-3 mb-6 border rounded`, { borderColor: COLORS.darkGray, fontSize: getScaledSize(16) }]}
          />

          <Text style={[tw`text-xl mb-4`, { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize: getScaledSize(18) }]}>
            Đánh giá sao
          </Text>
          <StarRating
            rating={rating}
            maxRating={5}
            starSize={getScaledSize(30)}
            starColor="#FFD700"
            onRatingChange={setRating}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              tw`mt-6 p-4 bg-blue-600 rounded`,
              { backgroundColor: COLORS.blue, alignItems: 'center' }
            ]}
          >
            <Text style={[tw`text-white text-lg`, { fontFamily: "CustomFont-Bold" }]}>
              Gửi Đánh Giá
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ManagerEvaluateScreen;
