import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CheckBox from "react-native-check-box";
import tw from "twrnc";
import COLORS from "../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";


type Props = {
  navigation: StackNavigationProp<RootStackParamList, "BenefitScreen">;
};
// Lấy kích thước màn hình
const { width, height } = Dimensions.get('window');

// Kích thước cơ sở để tính toán tỷ lệ
const BASE_WIDTH = 375; // Kích thước màn hình cơ sở
const BASE_HEIGHT = 667; // Kích thước màn hình cơ sở

// Tính tỷ lệ scale
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

const UserScreen: React.FC<Props> = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("vietnamese");

  const selectLanguage = (language: "english" | "vietnamese") => {
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={tw`items-center justify-center my-${getScaledSize(10)}`}>
        <Image
          source={{ uri: "https://img.upanh.tv/2024/07/09/avatar.jpg" }}
          style={tw`w-${getScaledSize(50)} h-${getScaledSize(50)} rounded-full`}
        />
      </View>
      <View style={tw`m-${getScaledSize(2)}`}>
        {[
          { label: "Mã nhân viên:", value: "MN787899" },
          { label: "Ngày làm việc:", value: "16-06-2024" },
          { label: "Ngày sinh:", value: "20-07-2024" },
          { label: "Số điện thoại:", value: "0932499021" },
          { label: "Bộ phận làm việc:", value: "ERP" },
          { label: "Chức vụ:", value: "INTERN" },
        ].map((item, index) => (
          <View key={index} style={tw`border-b-2 border-black flex-row items-center`}>
            <Text style={[tw`p-${getScaledSize(1)} w-1/2`, { fontSize: getScaledSize(16) }]}>{item.label}</Text>
            <Text style={[tw`mt-${getScaledSize(1.5)} mx-${getScaledSize(10)} text-red-500`, { fontSize: getScaledSize(16) }]}>{item.value}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={() => navigation.navigate("BenefitScreen")}>
          <View style={tw`border-b-2 border-black flex-row items-center`}>
            <View style={tw`flex-row items-center`}>
              <Text style={[tw`p-${getScaledSize(1)} w-1/2`, { fontSize: getScaledSize(16) }]}>Chế độ phúc lợi: </Text>
              <View style={tw`ml-${getScaledSize(40)}`}>
                <FontAwesome name="arrow-right" size={getScaledSize(20)} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={tw`mt-${getScaledSize(2)} border-b-2 border-black`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`p-${getScaledSize(1)} w-1/4`, { fontSize: getScaledSize(16) }]}>Ngôn ngữ:</Text>
            <TouchableOpacity
              onPress={() => selectLanguage("english")}
              style={tw`flex-row items-center ml-${getScaledSize(40)}`}
            >
              <View style={{ transform: [{ scale: getScaledSize(1) }] }}>
                <CheckBox
                  isChecked={selectedLanguage === "english"}
                  onClick={() => selectLanguage("english")}
                  checkBoxColor="lightgray"
                  checkedCheckBoxColor={COLORS.red}
                  uncheckedCheckBoxColor="black"
                />
              </View>
              <Text style={[tw`ml-${getScaledSize(1)}`, { fontSize: getScaledSize(16) }]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectLanguage("vietnamese")}
              style={tw`flex-row items-center ml-${getScaledSize(0)}`}
            >
              <View style={{ transform: [{ scale: getScaledSize(1) }] }}>
                <CheckBox
                  isChecked={selectedLanguage === "vietnamese"}
                  onClick={() => selectLanguage("vietnamese")}
                  checkBoxColor={COLORS.lightGray}
                  checkedCheckBoxColor={COLORS.red}
                  uncheckedCheckBoxColor={COLORS.black}
                />
              </View>
              <Text style={[tw`ml-${getScaledSize(1)}`, { fontSize: getScaledSize(16) }]}>VN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
