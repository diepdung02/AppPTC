import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';
import useCustomFonts from '../../../hooks/useFont';

const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;
const { width, height } = Dimensions.get('window');
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => size * scale;

type MailDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MailDetail'
>;
type MailDetailScreenRouteProp = RouteProp<RootStackParamList, 'MailDetail'>;

type Props = {
  navigation: MailDetailScreenNavigationProp;
  route: MailDetailScreenRouteProp;
};

const MailDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { emailItem } = route.params;

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  const emailDetails = [
    { label: 'To:', value: emailItem.to },
    { label: 'Chủ đề:', value: emailItem.subject },
    { label: 'Nội dung:', value: emailItem.message },
    { label: 'Thời gian gửi mail:', value: emailItem.timestamp },
  ];

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={tw`mb-5`}>
      <Text
        style={[
          tw`text-base`,
          {
            fontWeight: 'bold',
            fontFamily: 'CustomFont-Italic',
            fontSize: getScaledSize(16),
          },
        ]}
      >
        {item.label}
      </Text>
      <Text
        style={[
          tw`text-base`,
          {
            color: '#333',
            fontFamily: 'CustomFont-Italic',
            fontSize: getScaledSize(16),
          },
        ]}
      >
        {item.value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[${COLORS.colorMain}]`}>
      <View style={tw`flex-row items-center bg-white p-4`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`h-10 w-10 items-center justify-center`}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-lg ml-2`,
            {
              fontWeight: 'bold',
              fontFamily: 'CustomFont-Italic',
              fontSize: getScaledSize(18),
            },
          ]}
        >
          Chi tiết Email
        </Text>
      </View>
      <FlatList
        data={emailDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        contentContainerStyle={tw`px-5 py-2`}
      />
    </SafeAreaView>
  );
};

export default MailDetailScreen;
