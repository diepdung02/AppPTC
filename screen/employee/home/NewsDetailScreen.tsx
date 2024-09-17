import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Animated, Easing, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from '../../navigator/navigation';


const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const scaleWidth = initialWidth / 375; 
const scaleHeight = initialHeight / 667; 


const getScaledSize = (size: number, isWidth = true) => {
  const minWidth = 320;  
  const maxWidth = 1024;

  const width = Dimensions.get('window').width; 


  if (width < minWidth) {
    return size * 0.5; 
  } 
  else if (width > maxWidth) {
    return size * 1.2; 
  }

  
  return isWidth ? size * scaleWidth : size * scaleHeight;
};

type NewsDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewsDetail'>;
type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

type Props = {
  navigation: NewsDetailScreenNavigationProp;
  route: NewsDetailScreenRouteProp;
};

const NewsDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { newsItem } = route.params;
  const [showWebView, setShowWebView] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState({ type: '', uri: '' });

  const heightAnim = useRef(new Animated.Value(getScaledSize(200))).current;

  const handleImagePress = (imageUri: string) => {
    setSelectedAttachment({ type: 'image', uri: imageUri });
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAttachment({ type: '', uri: '' });
  };

  const renderDetailItem = ({ item }: { item: { time: string; activities: string[] } }) => (
    <View style={[tw`mb-${getScaledSize(4)} p-${getScaledSize(4)} rounded-lg shadow-md`, { backgroundColor: COLORS.white }]}>
      <View style={[tw`flex-row items-center justify-between`]}>
        <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize:getScaledSize(16) }]}>
          {item.time}
        </Text>
      </View>
      {item.activities.map((activity, idx) => (
        <Text key={idx} style={[tw` mt-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize:getScaledSize(16) }]}>
          - {activity}
        </Text>
      ))}
      {newsItem.link && (
        <TouchableOpacity onPress={() => setShowWebView(true)} style={[tw`ml-${getScaledSize(4)}`, { alignItems: 'center' }]}>
          <Image
            source={{ uri: 'https://img.upanh.tv/2024/08/05/th239e4e70683b83b9.jpg' }}
            style={tw`w-20 h-20 rounded-lg`}
          />
          <Text style={[ { color: COLORS.black, fontSize:getScaledSize(16) }]}>Xem bằng Excel</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (showWebView) {
    return (
      <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
        <View style={[tw`flex-row items-center p-${getScaledSize(4)} shadow-md `, { backgroundColor: COLORS.white }]}>
          <TouchableOpacity onPress={() => setShowWebView(false)} style={tw`w-${getScaledSize(10)} h-${getScaledSize(10)} items-center justify-center`}>
            <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={[tw`ml-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(18) }]}>
            File Excel
          </Text>
        </View>
        <WebView source={{ uri: newsItem.link }} style={{ flex: 1 }} scalesPageToFit={true} javaScriptEnabled={true} domStorageEnabled={true} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center p-${getScaledSize(4)} shadow-md mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-${getScaledSize(10)} h-${getScaledSize(10)} items-center justify-center`}>
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[tw`ml-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(18), textAlign: 'center', flex: 1 }]}>
          Chi tiết tin tức
        </Text>
      </View>
      <View style={tw`flex-1 p-${getScaledSize(4)}`}>
        <TouchableOpacity onPress={() => handleImagePress(newsItem.image)}>
          <Animated.Image
            source={{ uri: newsItem.image }}
            style={[tw`w-full rounded-lg mb-${getScaledSize(4)}`, { height: heightAnim, resizeMode: 'cover' }]}
          />
        </TouchableOpacity>
        <Text style={[tw`mb-${getScaledSize(4)} text-center`, { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) }]}>
          {newsItem.title}
        </Text>
        <View style={[tw`flex-row justify-between`, { marginTop: getScaledSize(4) }]}>
          <Text style={[tw`mb-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>
            {newsItem.date}
          </Text>
          <Text style={[tw`mb-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(16) }]}>
            By: {newsItem.sender}
          </Text>
        </View>
        <FlatList data={newsItem.details} renderItem={renderDetailItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={tw`pb-4`} />
      </View>

      {/* Modal hiển thị ảnh */}
      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={handleCloseModal}>
  <TouchableOpacity style={[tw`flex-1 justify-center items-center`, { backgroundColor: 'rgba(0, 0, 0, 0.5 )' }]} activeOpacity={1} onPress={handleCloseModal}>
    <View style={tw` p-${getScaledSize(4)} rounded`}>

      {/* Check if the attachment is an image */}
      {selectedAttachment.type === 'image' && (
        <TouchableOpacity activeOpacity={1}>
          <Image source={{ uri: selectedAttachment.uri }} style={tw` w-${getScaledSize(80)}  h-${getScaledSize(80)} rounded-lg`} />
        </TouchableOpacity>
      )}

    </View>
  </TouchableOpacity>
</Modal>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
