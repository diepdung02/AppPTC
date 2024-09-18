import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";

type DetailRequestScreenRouteProp = RouteProp<
  RootStackParamList,
  'DetailRequest'
>;

type Props = {
  route: DetailRequestScreenRouteProp;
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

const DetailRequest: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  let statusColor, textColor;
  switch (item.status) {
    case 'Đã được duyệt':
      statusColor = COLORS.green;
      textColor = COLORS.black;
      break;
    case 'Đã bị từ chối':
      statusColor = COLORS.red;
      textColor = COLORS.white;
      break;
    case 'Đang chờ duyệt':
      statusColor = COLORS.yellow;
      textColor = COLORS.black;
      break;
    default:
      statusColor = COLORS.darkGray;
      textColor = COLORS.black;
      break;
  }

  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, {backgroundColor: COLORS.colorMain}]}>
      <View  style={[
          tw`flex-row items-center mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white, padding: getScaledSize(10) },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`h-[${getScaledSize(40)}px] w-[${getScaledSize(40)}px] items-center justify-center`}
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[tw`ml-2`, {fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(18), textAlign: 'center', flex:1}]}>Chi tiết yêu cầu nghỉ</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Mã code:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.code}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Ngày bắt đầu nghỉ:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.startDate}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Ngày kết thúc nghỉ:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.endDate}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Số ngày nghỉ:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.dayOffs}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Số ngày phép còn lại:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.remainingDaysOff}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Số ngày phép đã sử dụng:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.usedDaysOff}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Lí do:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.reason}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(200)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Trạng thái:</Text>
        <Text
          style={[tw`px-[${getScaledSize(8)}px] py-[${getScaledSize(4)}px] rounded`, { backgroundColor: statusColor, color: textColor, fontFamily: 'CustomFont-Bold' }]}
        >
          {item.status}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailRequest;
