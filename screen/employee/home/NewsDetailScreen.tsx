import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Animated, Easing } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from '../../navigator/navigation';

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
  const [showWebView, setShowWebView] = useState(false);
  const [showImage, setShowImage] = useState(false);

  // Thay đổi scaleAnim thành heightAnim để điều chỉnh chiều cao
  const heightAnim = useRef(new Animated.Value(getScaledSize(200))).current; // Chiều cao mặc định của ảnh

  const handleImagePress = () => {
    if (showImage) {
      Animated.timing(heightAnim, {
        toValue: getScaledSize(200), // Trở về chiều cao ban đầu
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false, // Sử dụng false để có thể thay đổi layout
      }).start(() => setShowImage(false));
    } else {
      setShowImage(true);
      Animated.timing(heightAnim, {
        toValue: getScaledSize(300), // Tăng chiều cao khi phóng to
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const renderDetailItem = ({ item }: { item: { time: string; activities: string[] } }) => (
    <View style={[tw`mb-4 p-4 rounded-lg shadow-md`, { backgroundColor: COLORS.white }]}>
      <View style={[tw`flex-row items-center justify-between`]}>
        <Text style={[tw`text-lg`, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
          {item.time}
        </Text>
      </View>
      {item.activities.map((activity, idx) => (
        <Text key={idx} style={[tw`text-base mt-2`, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
          - {activity}
        </Text>
      ))}
      {newsItem.link && (
        <TouchableOpacity 
          onPress={() => setShowWebView(true)}
          style={[tw`ml-4`, { alignItems: 'center' }]}
        >
          <Image 
            source={{ uri: 'https://img.upanh.tv/2024/08/05/th239e4e70683b83b9.jpg' }} 
            style={tw`w-20 h-20 rounded-lg`}
          />
          <Text style={[tw`text-xs`, { color: COLORS.black }]}>Xem bằng Excel</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (showWebView) {
    return (
      <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
        <View style={[tw`flex-row items-center p-4 shadow-md`, { backgroundColor: COLORS.white }]}>
          <TouchableOpacity
            onPress={() => setShowWebView(false)}
            style={tw`w-10 h-10 items-center justify-center`}
          >
            <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
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
            File Excel
          </Text>
        </View>
        <WebView
          source={{ uri: newsItem.link }}
          style={{ flex: 1 }}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center p-4 shadow-md mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`w-10 h-10 items-center justify-center`}
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-xl ml-4`,
            {
              color: COLORS.black,
              fontFamily: 'CustomFont-Regular',
              fontSize: getScaledSize(18),
              textAlign: 'center',
              flex: 1
            },
          ]}
        >
          Chi tiết tin tức
        </Text>
      </View>
      <View style={tw`flex-1 p-4`}>
        <TouchableOpacity onPress={handleImagePress}>
          <Animated.Image
            source={{ uri: newsItem.image }}
            style={[tw`w-full rounded-lg mb-4`, { 
              height: heightAnim, // Thay đổi chiều cao theo trạng thái động
              resizeMode: 'cover' // Điều chỉnh chế độ resize nếu cần
            }]}
          />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-2xl font-bold mb-2 text-center`,
            { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) },
          ]}
        >
          {newsItem.title}
        </Text>
        <View style={[
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
