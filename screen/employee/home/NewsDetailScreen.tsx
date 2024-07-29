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
    <View style={tw`mb-4 p-4 bg-white rounded-lg shadow-md`}>
      <Text style={[tw`text-lg font-bold`, { color: '#2c3e50', fontFamily: 'CustomFont-Regular' }]}>
        {item.time}
      </Text>
      {item.activities.map((activity, idx) => (
        <Text key={idx} style={[tw`text-base mt-2`, { color: '#7f8c8d', fontFamily: 'CustomFont-Regular' }]}>
          - {activity}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-${COLORS.colorMain}`}>
      <View style={tw`flex-row items-center bg-white p-4 shadow-md`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`w-10 h-10 items-center justify-center`}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-xl ml-4`,
            {
              color: '#2c3e50',
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
            { color: '#3498db', fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) },
          ]}
        >
          {newsItem.title}
        </Text>
        <Text
          style={[
            tw`text-base mb-4`,
            { color: '#7f8c8d', fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) },
          ]}
        >
          {newsItem.date}
        </Text>
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
