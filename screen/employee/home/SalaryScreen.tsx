import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { RootStackParamList } from '../../navigator/navigation';
import COLORS from '../../../constants/Color';
import useCustomFonts from '../../../hooks/useFont';

// Type for the navigation prop
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SendMail'>;
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

const SalaryScreen: React.FC<Props> = ({ navigation }) => {
  const fontsLoaded = useCustomFonts();

  // Salary data
  const basicSalary = 5000000; // Lương cơ bản
  const allowances = 1000000; // Phụ cấp
  const bonus = 2000000; // Thưởng
  const insurance = 800000; // Tiền đóng bảo hiểm hằng tháng
  const deductions = 500000; // Các khoản khấu trừ
  const workingDays = 22; // Số ngày công đã chấm công
  const overtimeHours = 15; // Số giờ tăng ca
  const overtimeRate = 100000; // Đơn giá mỗi giờ tăng ca

  const dailySalary = basicSalary / 26; // Lương cơ bản chia cho 26 ngày công
  const totalWorkingSalary = dailySalary * workingDays; // Lương từ ngày công đã chấm công
  const overtimePay = overtimeHours * overtimeRate; // Tiền tăng ca

  const totalSalary = totalWorkingSalary + allowances + bonus + overtimePay - deductions - insurance;

  // Salary details
  const salaryDetails = [
    { id: '1', icon: 'cash', label: 'Lương Cơ Bản', value: basicSalary.toLocaleString('vi-VN') + ' VND' },
    { id: '2', icon: 'cash-plus', label: 'Phụ Cấp', value: allowances.toLocaleString('vi-VN') + ' VND' },
    { id: '3', icon: 'gift', label: 'Thưởng', value: bonus.toLocaleString('vi-VN') + ' VND' },
    { id: '4', icon: 'clock-outline', label: 'Tiền Tăng Ca', value: overtimePay.toLocaleString('vi-VN') + ' VND' },
    { id: '5', icon: 'minus-circle-outline', label: 'Các Khoản Khấu Trừ', value: deductions.toLocaleString('vi-VN') + ' VND' },
    { id: '6', icon: 'shield-account', label: 'Tiền Đóng Bảo Hiểm', value: insurance.toLocaleString('vi-VN') + ' VND' },
    { id: '7', icon: 'calendar-check', label: 'Ngày Công Đã Chấm Công', value: `${workingDays} ngày` },
  ];
  

  const renderItem = ({ item }: { item: typeof salaryDetails[0] }) => (
    <View style={tw`m-${getScaledSize(2)} p-${getScaledSize(2)} bg-white rounded-lg shadow w-full flex-row items-center`}>
      <MaterialCommunityIcons name={item.icon} size={getScaledSize(20)} color={COLORS.primary} style={tw`mr-${getScaledSize(4)}`} />
      <View>
        <Text style={[tw`text-xl`, { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(14) }]}>
          {item.label}
        </Text>
        <Text style={[tw` text-gray-700`, { fontSize: getScaledSize(14) }]}>
          {item.value}
        </Text>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
    <View
      style={[
        tw`flex-row items-center py-2.5 px-5 mt-${getScaledSize(5)}`,
        { backgroundColor: COLORS.white },
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`p-2`}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={COLORS.black}
        />
      </TouchableOpacity>
      <Text
        style={[
          tw` flex-1 text-center`,
          { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize: getScaledSize(18), },
        ]}
      >
        Chế độ phúc lợi
      </Text>
    </View>

      <FlatList
        data={salaryDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={tw`mb-${getScaledSize(5)}`}
      />

      <View style={[tw`p-${getScaledSize(4)} rounded-lg w-full`, { backgroundColor: COLORS.green }]}>
        <View style={tw`flex-row items-center`}>
          <MaterialCommunityIcons name="currency-usd" size={getScaledSize(20)} color={COLORS.white} style={tw`mr-${getScaledSize(4)}`} />
          <Text style={[tw``, { color: COLORS.white, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(16) }]}>
            Tổng Lương:
          </Text>
        </View>
        <Text style={[tw`text-center`, { color: COLORS.white, fontSize: getScaledSize(16) }]}>
          {totalSalary.toLocaleString('vi-VN')} VND
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SalaryScreen;
