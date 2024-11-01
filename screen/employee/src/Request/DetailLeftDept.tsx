import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";

type DetailLeftDeptScreenRouteProp = RouteProp<
  RootStackParamList,
  'DetailLeftDept'
>;

type Props = {
  route: DetailLeftDeptScreenRouteProp;
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

const DetailLeftDept: React.FC<Props> = ({ route }) => {
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
          { backgroundColor: COLORS.white, padding: getScaledSize(10), },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`h-[${getScaledSize(40)}px] w-[${getScaledSize(40)}px] items-center justify-center`}
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[tw`ml-${getScaledSize(2)} text-center`, {fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(18),  textAlign: 'center', flex:1}]}>Chi tiết ra vào cổng</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(150)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Mã code:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.code}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(150)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Ngày :</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.startDate}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(150)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Giờ bắt đầu:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.startTime}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(150)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Giờ kết thúc:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.endTime}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(150)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Lí do:</Text>
        <Text style={[tw`flex-1`, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16)}]}>{item.reason}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-${getScaledSize(5)} border-b border-black pb-${getScaledSize(2)}`}>
        <Text style={[tw`w-[${getScaledSize(150)}px]`, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16)}]}>Trạng thái:</Text>
        <Text
          style={[tw`px-[${getScaledSize(8)}px] py-[${getScaledSize(4)}px] rounded`, { backgroundColor: statusColor, color: textColor, fontFamily: 'CustomFont-Bold' }]}
        >
          {item.status}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailLeftDept;
