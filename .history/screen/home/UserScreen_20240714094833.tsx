import React, { useState, useEffect } from "react";
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
import COLORS from "../../constants/Color";
import { RootStackParamList } from "../navigator/navigation";

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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin nhân viên</Text>
      </View>
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
        <View>
          <Text style={styles.txtInfor}>Ngôn ngữ:</Text>
        </View>
        <TouchableOpacity onPress={() => selectLanguage("english")}>
          <View style={styles.infor}>
            <Text style={styles.txtInfor}>Tiếng Anh:</Text>
            {selectedLanguage === "english" && (
              <FontAwesome
                name="check"
                size={20}
                color="black"
                style={styles.tickIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectLanguage("vietnamese")}>
          <View style={styles.infor}>
            <Text style={styles.txtInfor}>Tiếng Việt</Text>
            {selectedLanguage === "vietnamese" && (
              <FontAwesome
                name="check"
                size={20}
                color="black"
                style={styles.tickIcon}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  goBack: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imgcontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
    borderBottomWidth: 2,
    borderBottomColor: "black",
    borderColor: "#ccc",
    fontSize: 20,
    padding: 5,
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
  },
  language: {
    fontSize: 18,
    marginLeft: 10,
  },
  tickIcon: {
    marginLeft: "auto",
    padding: 10,
  },
});

export default UserScreen;
