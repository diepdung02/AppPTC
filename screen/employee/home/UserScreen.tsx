import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CheckBox from "react-native-check-box";
import COLORS from "../../../constants/Color";
import { RootStackParamList } from "../../navigator/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Notifications">;
};

const UserScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("vietnamese");

  const selectLanguage = (language: "english" | "vietnamese") => {
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgcontainer}>
        <Image
          source={{ uri: "https://img.upanh.tv/2024/07/09/avatar.jpg" }}
          style={styles.image}
        />
      </View>
      <View style={styles.inforContainer}>
        <View style={styles.infor}>
          <Text style={styles.txtInfor}>Mã nhân viên: </Text>
          <Text style={styles.txtDetail}>MN787899</Text>
        </View>

        <View style={styles.infor}>
          <Text style={styles.txtInfor}>Ngày làm việc: </Text>
          <Text style={styles.txtDetail}>16-06-2024</Text>
        </View>

        <View style={styles.infor}>
          <Text style={styles.txtInfor}>Ngày sinh: </Text>
          <Text style={styles.txtDetail}>20-07-2024</Text>
        </View>

        <View style={styles.infor}>
          <Text style={styles.txtInfor}>Số điện thoại: </Text>
          <Text style={styles.txtDetail}>0932499021</Text>
        </View>

        <View style={styles.infor}>
          <Text style={styles.txtInfor}>Bộ phận làm việc: </Text>
          <Text style={styles.txtDetail}>ERP</Text>
        </View>

        <View style={styles.infor}>
          <Text style={styles.txtInfor}>Chức vụ: </Text>
          <Text style={styles.txtDetail}>INTERN</Text>
        </View>

        <TouchableOpacity>
          <View style={styles.infor}>
            <View style={styles.iconContainer}>
              <Text style={styles.txtInfor}>Chế độ phúc lợi: </Text>
              <View style={styles.icon}>
                <FontAwesome name="arrow-right" size={20} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.languageContainer}>
          <View style={styles.languageOptions}>
            <Text style={styles.txtInfor}>Ngôn ngữ:</Text>
            <TouchableOpacity
              onPress={() => selectLanguage("english")}
              style={styles.languageOption}
            >
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  isChecked={selectedLanguage === "english"}
                  onClick={() => selectLanguage("english")}
                  checkBoxColor={COLORS.lightGray}
                  checkedCheckBoxColor={COLORS.red}
                  uncheckedCheckBoxColor={COLORS.black}
                />
              </View>
              <Text style={styles.languageText}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectLanguage("vietnamese")}
              style={styles.languageOption}
            >
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  isChecked={selectedLanguage === "vietnamese"}
                  onClick={() => selectLanguage("vietnamese")}
                  checkBoxColor={COLORS.lightGray}
                  checkedCheckBoxColor={COLORS.red}
                  uncheckedCheckBoxColor={COLORS.black}
                />
              </View>
              <Text style={styles.languageText}>VN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  imgcontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  inforContainer: {
    margin: 10,
  },
  infor: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    flexDirection: "row",
  },
  txtInfor: {
    fontSize: 20,
    padding: 5,
    width: 200,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    justifyContent: "center",
    marginLeft: 170,
  },
  txtDetail: {
    fontSize: 18,
    marginTop: 7,
    marginHorizontal: 75,
    color: COLORS.red,
  },
  languageContainer: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  languageOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  languageOption: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft:40,
  },
  checkBoxContainer: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  languageText: {
    fontSize: 18,
    marginLeft: 5,
    textDecorationLine: "none",
  },
});

export default UserScreen;
