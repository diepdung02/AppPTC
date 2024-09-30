import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  RefreshControl
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CheckBox from "react-native-check-box";
import tw from "twrnc";
import COLORS from "../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import { useTranslation } from "react-i18next";
import i18n from "../../../language/i18n";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "BenefitScreen">;
};

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

const UserScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "vietnamese">("vietnamese");
  const [refreshing, setRefreshing] = useState(false); 

  const selectLanguage = (language: "english" | "vietnamese") => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language === "english" ? "en" : "vi");
  };


  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={tw`items-center justify-center my-${getScaledSize(15)}`}>
        <Image
          source={{ uri: "https://img.upanh.tv/2024/07/09/avatar.jpg" }}
          style={{
            width: getScaledSize(100),
            height: getScaledSize(100),
            borderRadius: getScaledSize(50),
          }}
          resizeMode="cover"
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
            <Text style={[tw`p-${getScaledSize(2)} w-1/2`, { fontSize: getScaledSize(16) }]}>{item.label}</Text>
            <Text style={[tw`mt-${getScaledSize(1.5)} mx-${getScaledSize(10)} text-red-500`, { fontSize: getScaledSize(16) }]}>{item.value}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={() => navigation.navigate("BenefitScreen")}>
          <View style={tw`border-b-2 border-black flex-row items-center`}>
            <Text style={[tw`p-${getScaledSize(2)} w-1/2`, { fontSize: getScaledSize(16) }]}>{t("benefit")}</Text>
            <FontAwesome name="arrow-right" size={getScaledSize(20)} color="black" style={tw`ml-${getScaledSize(40)}`} />
          </View>
        </TouchableOpacity>

        <View style={tw`mt-${getScaledSize(2)} border-b-2 border-black `}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={[tw`p-${getScaledSize(2)} w-1/2 `, { fontSize: getScaledSize(16) }]}>{t("language")}</Text>
            <TouchableOpacity
              onPress={() => selectLanguage("english")}
              style={tw`flex-row items-center ml-${getScaledSize(20)}`}
            >
              <CheckBox
                isChecked={selectedLanguage === "english"}
                onClick={() => selectLanguage("english")}
                checkBoxColor="lightgray"
                checkedCheckBoxColor={COLORS.red}
                uncheckedCheckBoxColor="black"
                style={{ transform: [{ scale: getScaledSize(1) }] }} 
              />
              <Text style={[tw`ml-${getScaledSize(1)}`, { fontSize: getScaledSize(16) }]}>{t("english")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectLanguage("vietnamese")}
              style={tw`flex-row items-center`}
            >
              <CheckBox
                isChecked={selectedLanguage === "vietnamese"}
                onClick={() => selectLanguage("vietnamese")}
                checkBoxColor={COLORS.lightGray}
                checkedCheckBoxColor={COLORS.red}
                uncheckedCheckBoxColor={COLORS.black}
                style={{ transform: [{ scale: getScaledSize(1) }] }} 
              />
              <Text style={[tw`ml-${getScaledSize(1)}`, { fontSize: getScaledSize(16) }]}>{t("vietnamese")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;