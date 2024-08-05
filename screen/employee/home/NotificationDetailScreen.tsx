import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Get screen dimensions for scaling
const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => size * scale;

type NotificationDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NotificationDetail'
>;

type NotificationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NotificationDetail'
>;

type Props = {
  navigation: NotificationDetailScreenNavigationProp;
  route: NotificationDetailScreenRouteProp;
};

const NotificationDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { notification } = route.params;
  const [showWebView, setShowWebView] = useState(false);

  const renderDetailItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={[tw`mb-4 p-4 rounded-lg shadow-md`, { backgroundColor: COLORS.white }]}>
      <Text style={[tw`text-lg`, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
        {item.label}
      </Text>
      
      <Text style={[tw`text-base mt-2`, { color: COLORS.black, fontFamily: 'CustomFont-Regular' }]}>
        {item.value}
      </Text>
      {notification.link && (
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
          source={{ uri: notification.link }}
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
          Chi tiết thông báo
        </Text>
      </View>
      <View style={tw`flex-1 p-4`}>
        <Image
          source={{ uri: notification.image }}
          style={tw`w-full h-48 rounded-lg mb-4`}
        />
        <Text
          style={[
            tw`text-2xl font-bold mb-2 text-center`,
            { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) },
          ]}
        >
          {notification.title}
        </Text>
        <View
          style={[
            tw`flex-row justify-between`,
            { marginTop: getScaledSize(4) },
          ]}>
          <Text
            style={[
              tw`text-base mb-4`,
              { color: COLORS.black, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(16) },
            ]}
          >
            {notification.date}
          </Text>
          <Text
            style={[
              tw`text-base mb-4`,
              { color: COLORS.black, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(16) },
            ]}
          >
            {notification.sender}
          </Text>
        </View>
        <FlatList
          data={[
            { label: 'Nội dung:', value: notification.summary },
          ]}
          renderItem={renderDetailItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`pb-4`}
        />

      </View>
    </SafeAreaView>
  );
};

export default NotificationDetailScreen;
