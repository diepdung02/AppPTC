import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { RootStackParamList } from '../../navigator/navigation';
import COLORS from '../../../constants/Color';
import useCustomFonts from '../../../hooks/useFont';

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

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SendMail'>;
};

const BenefitScreen: React.FC<Props> = ({ navigation }) => {
  const fontsLoaded = useCustomFonts();

  // Data for the benefits
  const benefits = [
    { id: '1', icon: 'calendar-month', label: 'Ngày Nghỉ Phép Đã Nghỉ', value: '5 ngày' },
    { id: '2', icon: 'calendar-check', label: 'Ngày Nghỉ Phép Còn Lại', value: '7 ngày' },
    { id: '3', icon: 'clock-outline', label: 'Số Giờ Tăng Ca Trong Tháng', value: '15 giờ' },
    { id: '4', icon: 'checkbox-outline', label: 'Số Ngày Công Đã Chấm', value: '22 ngày' },
    { id: '5', icon: 'shield-half-full', label: 'Số Năm Đã Đóng Bảo Hiểm', value: '3 năm' },
    { id: '6', icon: 'cash', label: 'Số Tiền Đã Đóng Bảo Hiểm', value: '28.800.000 VND' },
  ];

  const handleViewSalary = () => {
    Alert.alert('Thông báo', 'Đi đến màn hình bảng lương.');
    navigation.navigate('SalaryScreen');
  };

  if (!fontsLoaded) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: typeof benefits[0] }) => (
    <View style={tw`mb-${getScaledSize(2)} p-${getScaledSize(2)} bg-white rounded-lg shadow w-full flex-row items-center`}>
      <MaterialCommunityIcons name={item.icon} size={getScaledSize(20)} color={COLORS.primary} style={tw`mr-${getScaledSize(4)}`} />
      <View>
        <Text style={[tw`text-xl`, { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(14) }]}>
          {item.label}
        </Text>
        <Text style={[tw`text-lg text-gray-700`, { fontSize: getScaledSize(14) }]}>
          {item.value}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[tw`flex-1 p-${getScaledSize(6)} mt-${getScaledSize(15)}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={tw`flex-row items-center mb-${getScaledSize(6)}`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`w-${getScaledSize(10)} h-${getScaledSize(10)} items-center justify-center`}
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <View style={tw`flex-1 items-center`}>
          <Text style={[tw`text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(20) }]}>
            Chế Độ Phúc Lợi
          </Text>
        </View>
      </View>

      <FlatList
        data={benefits}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={[tw`p-${getScaledSize(4)} rounded-lg w-full`, { backgroundColor: COLORS.primary }]}
        onPress={handleViewSalary}
      >
        <Text style={[tw`text-center`, { fontSize: getScaledSize(16), fontFamily: 'CustomFont-Bold', color: COLORS.white }]}>
          Xem Bảng Lương
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BenefitScreen;
