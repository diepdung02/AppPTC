import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation";
import tw from "twrnc";
import COLORS from "../../../constants/Color";
import useCustomFonts from "../../../hooks/useFont";
import { useTranslation } from "react-i18next";

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const scaleWidth = initialWidth / 375; 
const scaleHeight = initialHeight / 667; 


const getScaledSize = (size: number, isWidth = true) => {
  const minWidth = 320;  
  const maxWidth = 1024;

  const width = Dimensions.get('window').width; 


  if (width < minWidth) {
    return size * 0.5; 
  } 
  else if (width > maxWidth) {
    return size * 1.2; 
  }

  
  return isWidth ? size * scaleWidth : size * scaleHeight;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false, 
      });      
      const formattedTime = formatter.format(now);
      setCurrentTime(formattedTime);
    };
  
    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000); 
  
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
    };

    const subscription = Dimensions.addEventListener('change', handleResize);
    
    return () => subscription?.remove(); 
  }, []);

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

  const routes: {
    route:
      | "Product"
      | "OutputList"
      | "RequestMain"
      | "Overtime"
      | "Schedule"
      | "LeftDeptScreen"
      | "EvaluateScreen"
      | "VoteScreen"
      | "ErrorScreen"
      | "Output"
      | "CheckGoodsScreen";
    image: string;
    label: string;
  }[] = [
    {
      route: "CheckGoodsScreen",
      image: "https://img.upanh.tv/2024/07/09/checklist.png",
      label: t("check goods"),
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
      route: "ErrorScreen",
      image: "https://img.upanh.tv/2024/07/09/error.png",
      label: t("error"),
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
      label: t("evalute"),
    },
    {
      route: "Schedule",
      image: "https://img.upanh.tv/2024/07/09/calendar.png",
      label: t("schedule"),
    },
    // { route: 'VoteScreen', image: 'https://img.upanh.tv/2024/07/09/vote.png', label: t("vote") },
    // { route: 'Product', image: 'https://img.upanh.tv/2024/07/09/transfer_dept.png', label: t("transferDept") }
  ];


  const filteredRoutes = routes.filter(item =>
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
      <View style={tw`p-${getScaledSize(4)} `}>
        <SearchBar
          placeholder="Tìm kiếm"
          inputContainerStyle={tw`bg-white`}
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
                onPress={() => navigation.navigate(item.route)}
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

      <View style={tw`absolute bottom-${getScaledSize(2)} w-full items-center`}>
        <Text
          style={[
            tw``,
            { fontSize: getScaledSize(14), fontFamily: "CustomFont-Bold" },
            { color: COLORS.red },
          ]}
        >
          {currentTime}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
