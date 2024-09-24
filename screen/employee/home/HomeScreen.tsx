import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import tw from "twrnc";
import COLORS from "../../../constants/Color";
import useCustomFonts from "../../../hooks/useFont";
import { useTranslation } from "react-i18next";
import { BlurView } from 'expo-blur';

const { width: initialWidth, height: initialHeight } = Dimensions.get("window");

const scaleWidth = initialWidth / 375;
const scaleHeight = initialHeight / 667;

const getScaledSize = (size: number, isWidth = true) => {
  const minWidth = 320;
  const maxWidth = 1024;

  const width = Dimensions.get("window").width;

  if (width < minWidth) {
    return size * 0.5;
  } else if (width > maxWidth) {
    return size * 1.2;
  }

  return isWidth ? size * scaleWidth : size * scaleHeight;
};

type Props = {
  navigation: any; // Adjust the type based on your actual navigation prop type
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [refreshing, setRefreshing] = useState(false); 
  const { t } = useTranslation();

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      });
      const formattedTime = formatter.format(now);
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const routes = [
    {
      route: "QualityScreen",
      image: "https://img.upanh.tv/2024/09/16/quality-control.png",
      label: t("quality"),
    },
    {
      route: "Product",
      image: "https://img.upanh.tv/2024/07/09/product.png",
      label: t("product"),
    },
    {
      route: "Output",
      image: "https://img.upanh.tv/2024/07/09/output.png",
      label: t("output"),
    },
    {
      route: "RequestMain",
      image: "https://img.upanh.tv/2024/07/09/leave.png",
      label: t("requestLeave"),
    },
    {
      route: "Overtime",
      image: "https://img.upanh.tv/2024/07/09/overtime.png",
      label: t("requestOvertime"),
    },
    {
      route: "LeftDeptScreen",
      image: "https://img.upanh.tv/2024/07/09/left_dept.png",
      label: t("leftDept"),
    },
    {
      route: "EvaluateScreen",
      image: "https://img.upanh.tv/2024/07/09/evaluate.png",
      label: t("evaluate"),
    },
    {
      route: "Schedule",
      image: "https://img.upanh.tv/2024/07/09/calendar.png",
      label: t("schedule"),
    },
  ];

  const filteredRoutes = routes.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filteredRoutes.reduce((acc, item, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, [] as (typeof filteredRoutes)[]);

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={tw`p-${getScaledSize(4)}`}>
          <SearchBar
            placeholder="Tìm kiếm"
            inputContainerStyle={{backgroundColor:COLORS.white}}
            containerStyle={[
              tw`bg-transparent border-t-0 mt-${getScaledSize(5)}`,
              {
                borderBottomWidth: 1,
                borderBottomColor: COLORS.border,
              },
            ]}
            onChangeText={updateSearch}
            value={search}
            placeholderTextColor={COLORS.black}
          />
        </View>

        <View style={tw`flex-1 mt-${getScaledSize(10)} px-${getScaledSize(2)}`}>
          {rows.map((row, rowIndex) => (
            <View
              key={`row-${rowIndex}`}
              style={tw`flex-wrap flex-row justify-center`}
            >
              {row.map((item, index) => (
                <TouchableOpacity
                  key={`item-${rowIndex}-${index}`}
                  style={[
                    tw`items-center m-${getScaledSize(2)}`,
                    { width: getScaledSize(90) },
                  ]}
                  onPress={() =>
                    item.route === "QualityScreen"
                      ? setModalVisible(true)
                      : navigation.navigate(item.route)
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      tw`mb-${getScaledSize(2)}`,
                      { width: getScaledSize(70), height: getScaledSize(70) },
                      { aspectRatio: 1 },
                    ]}
                    onError={(e) => console.error(e.nativeEvent.error)}
                    defaultSource={require("../../../assets/favicon.png")}
                  />
                  <Text
                    style={[
                      tw`text-center`,
                      {
                        fontSize: getScaledSize(14),
                        fontFamily: "CustomFont-Regular",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableOpacity
    style={tw`w-full h-full`}
    activeOpacity={1}
    onPress={() => setModalVisible(false)} 
  >
    <View
  style={[tw`absolute w-full h-full`, { backgroundColor: 'rgba(255, 255, 255, 0.85)' }]}
>
    <BlurView
      style={[tw`w-full h-full justify-center items-center`]}
      intensity={100}
      tint="light"
    >
      <TouchableOpacity
  style={[
    tw`w-80 p-5 justify-center items-center rounded-lg`,
    { backgroundColor: "rgba(0, 0, 0, 0.12)" },
  ]}
  activeOpacity={1} 
  onPress={() => {}} 
>
  <View style={tw`flex-row justify-around w-full`}>
    <TouchableOpacity
      style={tw`items-center`}
      onPress={() => {
        setModalVisible(false);
        navigation.navigate("CheckGoodsScreen");
      }}
    >
      <Image
        source={{
          uri: "https://img.upanh.tv/2024/07/09/checklist.png",
        }}
        style={[
          tw`mb-${getScaledSize(2)}`,
          { width: getScaledSize(70), height: getScaledSize(70) },
          { aspectRatio: 1 },
        ]}
      />
      <Text style={tw`mt-2 text-lg`}>{t("check goods")}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={tw`items-center`}
      onPress={() => {
        setModalVisible(false);
        navigation.navigate("ErrorScreen");
      }}
    >
      <Image
        source={{ uri: "https://img.upanh.tv/2024/07/09/error.png" }}
        style={[
          tw`mb-${getScaledSize(2)}`,
          { width: getScaledSize(70), height: getScaledSize(70) },
          { aspectRatio: 1 },
        ]}
      />
      <Text style={tw`mt-2 text-lg`}>{t("error")}</Text>
    </TouchableOpacity>
  </View>

  <View style={tw`flex-row justify-around w-full mt-5`}>
    <TouchableOpacity
      style={tw`items-center`}
      onPress={() => {
        setModalVisible(false);
        navigation.navigate("UpLoadImageProduct");
      }}
    >
      <Image
        source={{ uri: "https://img.upanh.tv/2024/09/16/photo.png" }}
        style={[
          tw`mb-${getScaledSize(2)}`,
          { width: getScaledSize(70), height: getScaledSize(70) },
          { aspectRatio: 1 },
        ]}
      />
      <Text style={[tw`text-center mt-${getScaledSize(2)} w-${getScaledSize(30)} `, {fontSize:getScaledSize(16)}]}>{t("uploadImage")}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={tw`items-center`}
      onPress={() => {
        setModalVisible(false);
        navigation.navigate("ReportImageScreen");
      }}
    >
      <Image
        source={{ uri: "https://img.upanh.tv/2024/09/16/camera.png" }}
        style={[
          tw`mb-${getScaledSize(2)}`,
          { width: getScaledSize(70), height: getScaledSize(70) },
          { aspectRatio: 1 },
        ]}
      />
      <Text style={[tw`text-center mt-${getScaledSize(2)} w-${getScaledSize(30)} `, {fontSize:getScaledSize(16)}]}>{t("reportImage")}</Text>
    </TouchableOpacity>
  </View>
</TouchableOpacity>
    </BlurView>
</View>
  </TouchableOpacity>
</Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
