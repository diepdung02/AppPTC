import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Animated, Modal } from 'react-native';
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

type NotificationDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NotificationDetail'>;
type NotificationDetailScreenRouteProp = RouteProp<RootStackParamList, 'NotificationDetail'>;

type Props = {
  navigation: NotificationDetailScreenNavigationProp;
  route: NotificationDetailScreenRouteProp;
};

const NotificationDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { notification } = route.params;
  const [showWebView, setShowWebView] = useState(false);
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
  const renderDetailItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={[tw`mb-${getScaledSize(4)} p-${getScaledSize(4)} rounded-lg shadow-md`, { backgroundColor: COLORS.white }]}>
      <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize:getScaledSize(16) }]}>{item.label}</Text>
      <Text style={[tw` mt-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize:getScaledSize(16) }]}>{item.value}</Text>
    </View>
  );
  if (showWebView) {
    return (
      <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
        <View style={[tw`flex-row items-center p-${getScaledSize(4)} shadow-md`, { backgroundColor: COLORS.white }]}>
          <TouchableOpacity onPress={() => setShowWebView(false)} style={tw`w-${getScaledSize(10)} h-${getScaledSize(10)} items-center justify-center`}>
            <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={[tw` ml-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(18) }]}>
            File Excel
          </Text>
        </View>
        <WebView source={{ uri: notification.link }} style={{ flex: 1 }} scalesPageToFit={true} javaScriptEnabled={true} domStorageEnabled={true} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center p-${getScaledSize(4)} shadow-md mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-${getScaledSize(10)} h-${getScaledSize(10)} items-center justify-center`}>
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[tw` ml-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(18), textAlign: 'center', flex: 1 }]}>
          Chi tiết thông báo
        </Text>
      </View>
      <View style={tw`flex-1 p-${getScaledSize(4)}`}>
        <TouchableOpacity onPress={() => handleImagePress(notification.image)}>
          <Animated.Image
            source={{ uri: notification.image }}
            style={[tw`w-full rounded-lg mb-${getScaledSize(4)}`, { height: heightAnim, resizeMode: 'cover' }]}
          />
        </TouchableOpacity>
        <Text style={[tw`mb-${getScaledSize(2)} text-center`, { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) }]}>
          {notification.title}
        </Text>
        <View style={[tw`flex-row justify-between`, { marginTop: getScaledSize(4) }]}>
          <Text style={[tw`mb-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>
            {notification.date}
          </Text>
          <Text style={[tw`mb-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(16) }]}>
            By: {notification.sender}
          </Text>
        </View>
        <FlatList
          data={[
            { label: 'Nội dung:', value: notification.summary },
          ]}
          renderItem={renderDetailItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`pb-${getScaledSize(4)}`}
        />
      </View>
      {/* Modal hiển thị ảnh */}
      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={handleCloseModal}>
      <TouchableOpacity style={[tw`flex-1 justify-center items-center`, { backgroundColor: 'rgba(0, 0, 0, 0.5 )' }]} activeOpacity={1} onPress={handleCloseModal}>
    <View style={tw`p-${getScaledSize(4)} rounded`}>
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

export default NotificationDetailScreen;
