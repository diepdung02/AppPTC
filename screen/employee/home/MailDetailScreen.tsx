import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';

// Get screen dimensions for scaling
const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

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

  const renderDetailItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={[tw`mb-4 p-4 rounded-lg shadow-md`, { backgroundColor: COLORS.white }]}>
      <Text style={[tw`text-lg`, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
        {item.label}
      </Text>
      <Text style={[tw`text-base mt-2`, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
        {item.value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center p-4 shadow-md`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`w-10 h-10 items-center justify-center`}
        >
          <FontAwesome name="arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-xl ml-4`,
            {
              color: COLORS.black,
              fontFamily: 'CustomFont-Regular',
              fontSize: getScaledSize(18),
            },
          ]}
        >
          Chi tiết Email
        </Text>
      </View>
      <View style={tw`flex-1 p-4`}>
        {/* Display the image */}
        {emailItem.image ? (
          <Image
            source={{ uri: emailItem.image }}
            style={tw`w-full h-48 rounded-lg mb-4`}
          />
        ) : null}
        {/* Display the email title */}
        <Text
          style={[
            tw`text-2xl font-bold mb-2 text-center`,
            { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) },
          ]}
        >
          {emailItem.subject}
        </Text>
        {/* Display the email sender and date */}
        <View style={tw`flex-row justify-between mb-4`}>
          <Text
            style={[
              tw`text-base`,
              { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) },
            ]}
          >
            {emailItem.timestamp}
          </Text>
          <Text
            style={[
              tw`text-base`,
              { color: COLORS.black, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(16) },
            ]}
          >
            By: {emailItem.to}
          </Text>
        </View>
        {/* Display email details */}
        <FlatList
          data={[
            { label: 'Nội dung:', value: emailItem.message },
          ]}
          renderItem={renderDetailItem}
          keyExtractor={(item) => item.label}
          contentContainerStyle={tw`pb-4`}
        />
      </View>
    </SafeAreaView>
  );
};

export default MailDetailScreen;
