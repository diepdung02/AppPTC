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

type NewsDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewsDetail'
>;

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

type Props = {
  navigation: NewsDetailScreenNavigationProp;
  route: NewsDetailScreenRouteProp;
};

const NewsDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { newsItem } = route.params;

  const renderDetailItem = ({ item }: { item: { time: string; activities: string[] } }) => (
    <View style={[tw`mb-4 p-4 rounded-lg shadow-md`, { backgroundColor: COLORS.white }]}>
      <Text style={[tw`text-lg `, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
        {item.time}
      </Text>
      {item.activities.map((activity, idx) => (
        <Text key={idx} style={[tw`text-base mt-2`, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
          - {activity}
        </Text>
      ))}
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
          Chi tiết tin tức
        </Text>
      </View>
      <View style={tw`flex-1 p-4`}>
        <Image
          source={{ uri: newsItem.image }}
          style={tw`w-full h-48 rounded-lg mb-4`}
        />
        <Text
          style={[
            tw`text-2xl font-bold mb-2 text-center`,
            { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) },
          ]}
        >
          {newsItem.title}
        </Text>
        <View
         style={[
          tw`flex-row justify-between`,
          { marginTop: getScaledSize(4) },
        ]}>
        <Text
          style={[
            tw`text-base mb-4`,
            { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) },
          ]}
        >
          {newsItem.date}
        </Text>
        <Text
          style={[
            tw`text-base mb-4`,
            { color: COLORS.black, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(16) },
          ]}
        >
          By: {newsItem.sender}
        </Text>
        </View>
        <FlatList
          data={newsItem.details}
          renderItem={renderDetailItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`pb-4`}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
