import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Modal, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [modalVisible, setModalVisible] = useState(false);

  // Hàm để hiển thị modal khi nhấn vào ảnh
  const handleImagePress = () => {
    setModalVisible(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderDetailItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={[tw`mb-${getScaledSize(4)} p-${getScaledSize(4)} rounded-lg shadow-md`, { backgroundColor: COLORS.white }]}>
      <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize:getScaledSize(16) }]}>
        {item.label}
      </Text>
      <Text style={[tw` mt-${getScaledSize(4)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize:getScaledSize(16) }]}>
        {item.value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center p-4 shadow-md mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-${getScaledSize(10)} h-${getScaledSize(10)} items-center justify-center`}>
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text
          style={[tw`ml-${getScaledSize(5)}`, { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(18), textAlign: 'center', flex: 1 }]}
        >
          Chi tiết Email
        </Text>
      </View>
      <View style={tw`flex-1 p-${getScaledSize(5)}`}>
        {/* Display the image with TouchableOpacity */}
        {emailItem.image ? (
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={{ uri: emailItem.image }} style={tw`w-full h-${getScaledSize(48)} rounded-lg mb-${getScaledSize(4)}`} />
          </TouchableOpacity>
        ) : null}
        <Text
          style={[tw`mb-${getScaledSize(5)} text-center`, { color: COLORS.primary, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(24) }]}
        >
          {emailItem.subject}
        </Text>
        <View style={tw`flex-row justify-between mb-${getScaledSize(5)}`}>
          <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Regular', fontSize: getScaledSize(16) }]}>
            {emailItem.timestamp}
          </Text>
          <Text style={[ { color: COLORS.black, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(16) }]}>
            By: {emailItem.to}
          </Text>
        </View>
        <FlatList
          data={[{ label: 'Nội dung:', value: emailItem.message }]}
          renderItem={renderDetailItem}
          keyExtractor={(item) => item.label}
          contentContainerStyle={tw`pb-${getScaledSize(4)}`}
        />
      </View>

      {/* Modal for displaying image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity style={[tw`flex-1 justify-center items-center`, { backgroundColor: 'rgba(0, 0, 0, 0.5 )' }]} onPress={handleCloseModal}>
          <Image source={{ uri: emailItem.image }} style={tw`w-${getScaledSize(80)}  h-${getScaledSize(80)} rounded-lg`} />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default MailDetailScreen;