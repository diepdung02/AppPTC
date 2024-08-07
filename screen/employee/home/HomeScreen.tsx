import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';
import useCustomFonts from '../../../hooks/useFont';
import { useTranslation } from 'react-i18next';
import i18n from "../../../language/i18n";


// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Calculate scale
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => size * scale;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString();
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
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

  // Define valid routes
  const routes: {
    route: 'Product' | 'OutputList' | 'RequestMain' | 'Overtime' | 'Schedule' | 'LeftDeptScreen' | 'EvaluateScreen' | 'VoteScreen';
    image: string;
    label: string;
  }[] = [
    { route: 'Product', image: 'https://img.upanh.tv/2024/07/09/checklist.png', label: t("check goods") },
    { route: 'Product', image: 'https://img.upanh.tv/2024/07/09/product.png', label: t("product") },
    { route: 'OutputList', image: 'https://img.upanh.tv/2024/07/09/output.png', label: t("output") },
    { route: 'RequestMain', image: 'https://img.upanh.tv/2024/07/09/leave.png', label: t("requestLeave") },
    { route: 'Overtime', image: 'https://img.upanh.tv/2024/07/09/overtime.png', label: t("requestOvertime") },
    { route: 'Schedule', image: 'https://img.upanh.tv/2024/07/09/calendar.png', label: t("schedule") },
    { route: 'Product', image: 'https://img.upanh.tv/2024/07/09/error.png', label: t("error") },
    { route: 'EvaluateScreen', image: 'https://img.upanh.tv/2024/07/09/evaluate.png', label: t("evalute") },
    { route: 'VoteScreen', image: 'https://img.upanh.tv/2024/07/09/vote.png', label: t("vote") },
    { route: 'LeftDeptScreen', image: 'https://img.upanh.tv/2024/07/09/left_dept.png', label: t("leftDept") },
    { route: 'Product', image: 'https://img.upanh.tv/2024/07/09/transfer_dept.png', label: t("transferDept") }
  ];

  // Split items into rows of 4 items each
  const rows = routes.reduce((acc, item, index) => {
    const rowIndex = Math.floor(index / 4);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, [] as typeof routes[]);

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={tw`p-${getScaledSize(4)}`}>
        <SearchBar
          placeholder="Tìm kiếm"
          inputContainerStyle={tw`bg-white`}
          containerStyle={tw`bg-transparent border-b border-gray-300 border-t-0`}
          onChangeText={updateSearch}
          value={search}
          placeholderTextColor={COLORS.black}
        />
      </View>

      <View style={tw`flex-1 mt-${getScaledSize(10)} px-${getScaledSize(2)}`}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={tw`flex-row justify-around mb-${getScaledSize(2)}`}>
            {row.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[tw`items-center`, { width: getScaledSize(50) }]} // Adjust width based on scaling
                onPress={() => navigation.navigate(item.route)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[tw`mb-${getScaledSize(7)}`, { width: getScaledSize(70), height: getScaledSize(70) }]} // Maintain aspect ratio
                />
                <Text style={[tw`text-center w-32 mb-${getScaledSize(3)}`, { fontSize: getScaledSize(16), fontFamily: 'CustomFont-Regular' }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={tw`absolute bottom-${getScaledSize(2)} w-full items-center`}>
        <Text style={[tw``, { fontSize: getScaledSize(16), fontFamily: 'CustomFont-Bold' }, { color: COLORS.red }]}>{currentTime}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
