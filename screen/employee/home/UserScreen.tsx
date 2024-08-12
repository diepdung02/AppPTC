import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CheckBox from "react-native-check-box";
import tw from "twrnc";
import COLORS from "../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import { useTranslation } from "react-i18next";
import i18n from "../../../language/i18n";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "BenefitScreen">;
};

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

const UserScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("vietnamese");

  const selectLanguage = (language: "english" | "vietnamese") => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language === "english" ? "en" : "vi");
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
          { label: t("employeeId"), value: "MN787899" },
          { label: t("workDate"), value: "16-06-2024" },
          { label: t("birthDate"), value: "20-07-2024" },
          { label: t("phoneNumber"), value: "0932499021" },
          { label: t("department"), value: "ERP" },
          { label: t("position"), value: "INTERN" },
        ].map((item, index) => (
          <View key={index} style={tw`border-b-2 border-black flex-row items-center`}>
            <Text style={[tw`p-${getScaledSize(1)} w-1/2`, { fontSize: getScaledSize(16) }]}>{item.label}</Text>
            <Text style={[tw`mt-${getScaledSize(1.5)} mx-${getScaledSize(10)} text-red-500`, { fontSize: getScaledSize(16) }]}>{item.value}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={() => navigation.navigate("BenefitScreen")}>
          <View style={tw`border-b-2 border-black flex-row items-center`}>
            <View style={tw`flex-row items-center`}>
              <Text style={[tw`p-${getScaledSize(1)} w-1/2`, { fontSize: getScaledSize(16) }]}>{t("benefit")}</Text>
              <View style={tw`ml-${getScaledSize(40)}`}>
                <FontAwesome name="arrow-right" size={getScaledSize(20)} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={tw`mt-${getScaledSize(2)} border-b-2 border-black`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`p-${getScaledSize(1)} w-1/4`, { fontSize: getScaledSize(16) }]}>{t("language")}</Text>
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
              <Text style={[tw`ml-${getScaledSize(1)}`, { fontSize: getScaledSize(16) }]}>{t("english")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectLanguage("vietnamese")}
              style={tw`flex-row items-center `}
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
              <Text style={[tw`ml-${getScaledSize(1)}`, { fontSize: getScaledSize(16) }]}>{t("vietnamese")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
