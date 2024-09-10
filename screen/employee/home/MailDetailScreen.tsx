import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/navigation';
import tw from 'twrnc';
import COLORS from '../../../constants/Color';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const getScaledSize = (size: number) => {
  const minWidth = 320;  
  const maxWidth = 1024; 

  const width = Dimensions.get('window').width;


  const scaleWidth = initialWidth / 375; 
  const scaleHeight = initialHeight / 667; 

  const scale = Math.min(scaleWidth, scaleHeight);

  if (width < minWidth) {
    return size * 0.5; 
  } else if (width > maxWidth) {
    return size * 1.2; 
  } else {
    return size * scale;
  }
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
              textAlign: 'center', flex:1
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
