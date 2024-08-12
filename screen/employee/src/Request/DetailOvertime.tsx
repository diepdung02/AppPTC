import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";

type DetailOvertimeScreenRouteProp = RouteProp<
  RootStackParamList,
  'DetailOvertime'
>;

type Props = {
  route: DetailOvertimeScreenRouteProp;
};

const { width, height } = Dimensions.get('window');

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Calculate scale based on the smaller ratio
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

const DetailOvertime: React.FC<Props> = ({ route }) => {
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
    <SafeAreaView style={[tw`flex-1`, {backgroundColor:COLORS.colorMain}]}>
      <View style={[tw`flex-row items-center p-[${getScaledSize(12)}px]`, {backgroundColor:COLORS.white}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`h-[${getScaledSize(40)}px] w-[${getScaledSize(40)}px] items-center justify-center`}
        >
        <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[tw`  ml-2`, {fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(18)}]}>Chi tiết tăng ca</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-5 border-b border-black pb-2`}>
        <Text style={[tw`w-[${getScaledSize(150)}px] `, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16) }]}>Mã code:</Text>
        <Text style={[tw`flex-1  `, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.code}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-5 border-b border-black pb-2`}>
        <Text style={[tw`w-[${getScaledSize(150)}px] `, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16) }]}>Ngày tăng ca:</Text>
        <Text style={[tw`flex-1  `, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.startDate}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-5 border-b border-black pb-2`}>
        <Text style={[tw`w-[${getScaledSize(150)}px] `, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16) }]}>Thời gian bắt đầu:</Text>
        <Text style={[tw`flex-1  `, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.startTime}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-5 border-b border-black pb-2`}>
        <Text style={[tw`w-[${getScaledSize(150)}px] `, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16) }]}>Thời gian kết thúc:</Text>
        <Text style={[tw`flex-1  `, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.endTime}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-5 border-b border-black pb-2`}>
        <Text style={[tw`w-[${getScaledSize(150)}px] `, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16) }]}>Lí do:</Text>
        <Text style={[tw`flex-1  `, {fontFamily: 'CustomFont-Regular', color: COLORS.black, fontSize: getScaledSize(16) }]}>{item.reason}</Text>
      </View>
      <View style={tw`flex-row items-center my-[${getScaledSize(8)}px] mx-5 border-b border-black pb-2`}>
        <Text style={[tw`w-[${getScaledSize(150)}px] `, {fontFamily: 'CustomFont-Bold', color: COLORS.black, fontSize: getScaledSize(16) }]}>Trạng thái:</Text>
        <Text
          style={[tw`px-[${getScaledSize(8)}px] py-[${getScaledSize(4)}px] rounded`, { backgroundColor: statusColor, color: textColor, fontFamily: 'CustomFont-Bold' }]}
        >
          {item.status}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailOvertime;
