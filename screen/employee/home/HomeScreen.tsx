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
const adjustScale = (size: number) => getScaledSize(size) * 0.5;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [search, setSearch] = useState('');

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
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  // List of items
  const items = [
    { route: '', image: 'https://img.upanh.tv/2024/07/09/checklist.png', label: 'Kiểm hàng' },
    { route: 'Product', image: 'https://img.upanh.tv/2024/07/09/product.png', label: 'Sản Phẩm' },
    { route: 'OutputList', image: 'https://img.upanh.tv/2024/07/09/output.png', label: 'Output' },
    { route: 'RequestMain', image: 'https://img.upanh.tv/2024/07/09/leave.png', label: 'Nghỉ phép' },
    { route: 'Overtime', image: 'https://img.upanh.tv/2024/07/09/overtime.png', label: 'Tăng ca' },
    { route: 'Schedule', image: 'https://img.upanh.tv/2024/07/09/calendar.png', label: 'Lịch' },
    { route: '', image: 'https://img.upanh.tv/2024/07/09/error.png', label: 'Báo lỗi' },
    { route: '', image: 'https://img.upanh.tv/2024/07/09/evaluate.png', label: 'Đánh giá' },
    { route: '', image: 'https://img.upanh.tv/2024/07/09/vote.png', label: 'Bầu chọn' },
    { route: 'LeftDeptScreen', image: 'https://img.upanh.tv/2024/07/09/left_dept.png', label: 'Giấy ra cổng' },
    { route: '', image: 'https://img.upanh.tv/2024/07/09/transfer_dept.png', label: 'Rời khỏi' }
  ];

  // Split items into rows of 4 items each
  const rows = items.reduce((acc, item, index) => {
    const rowIndex = Math.floor(index / 4);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, [] as typeof items[]);

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={tw`p-${adjustScale(4)}`}>
        <SearchBar
          placeholder="Tìm kiếm"
          inputContainerStyle={tw`bg-white`}
          containerStyle={tw`bg-transparent border-b border-gray-300 border-t-0`}
          onChangeText={updateSearch}
          value={search}
          placeholderTextColor={COLORS.black}
        />
      </View>

      <View style={tw`flex-1 mt-${adjustScale(20)} px-${adjustScale(2)}`}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={tw`flex-row justify-around mb-${adjustScale(2)}`}>
            {row.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[tw`items-center`, { width: adjustScale(80) }]} // Adjust width based on scaling
                onPress={() => item.route && navigation.navigate(item.route)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[tw`mb-${adjustScale(15)}`, { width: adjustScale(150), height: adjustScale(150) }]} // Maintain aspect ratio
                />
                <Text style={[tw`text-center w-32 mb-${adjustScale(15)}`, { fontSize: getScaledSize(16), fontFamily: 'CustomFont-Regular' }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={tw`absolute bottom-${adjustScale(2)} w-full items-center`}>
        <Text style={[tw``, { fontSize: getScaledSize(16), fontFamily: 'CustomFont-Bold' }, { color: COLORS.red }]}>{currentTime}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
