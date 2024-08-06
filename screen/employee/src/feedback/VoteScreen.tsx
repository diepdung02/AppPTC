import React from 'react';
import { View, Text, Button, FlatList, Linking, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../../constants/Color';

// Dữ liệu thông báo bình chọn
const vote = [
  {
    id: '1',
    title: 'Du lịch cùng công ty',
    date: '20/08/2024',
    description: 'Mời bạn bình chọn địa điểm du lịch để chúng ta có thể lên kế hoạch cho chuyến đi sắp tới.',
    formLink: 'https://forms.gle/SWVbMT95Sbwo3ni67',
  },
  {
    id: '2',
    title: 'Lễ hội Trung Thu 2024',
    date: '12/08/2024',
    description: 'Hãy chọn món quà Trung Thu yêu thích của bạn để chúng tôi chuẩn bị quà tặng cho lễ hội.',
    formLink: 'https://forms.gle/cdcKvUD3kPJu9vsa7',
  },
  {
    id: '3',
    title: 'Cuộc thi ẩm thực công ty',
    date: '07/08/2024',
    description: 'Tham gia bình chọn cho món ăn yêu thích nhất trong cuộc thi ẩm thực sắp tới của công ty.',
    formLink: 'https://forms.gle/KHyCKsGfUMrRt77w6',
  },
];

const VoteScreen:React.FC = () => {
  const navigation = useNavigation();

  const handlePress = (formLink: string) => {
    Linking.openURL(formLink).catch(() =>
      Alert.alert('Lỗi', 'Không thể mở liên kết.'),
    );
  };

  const renderItem = ({ item }: { item: typeof vote[0] }) => (
    <View style={tw`mb-4 p-4 bg-gray-100 rounded-lg shadow-md`}>
      <Text style={tw`text-lg font-bold`}>{item.title}</Text>
      <Text style={tw`text-sm text-gray-500 mt-1`}>{item.date}</Text>
      <Text style={tw`text-base mt-2`}>{item.description}</Text>
      <Button
        title="Tham gia bình chọn"
        onPress={() => handlePress(item.formLink)}
      />
    </View>
  );

  return (
    <SafeAreaView style={[tw`flex-1`, {backgroundColor:COLORS.colorMain}]}>
      {/* Tiêu đề và các biểu tượng điều hướng */}
      <View style={[tw`flex-row items-center py-2.5 px-5`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[tw`p-2`, { borderRadius: 50 }]}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={[tw`text-xl flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: 20 }]}>
          Danh sách bình chọn
        </Text>

        {/* <TouchableOpacity
        //   onPress={() => navigation.navigate("")}
          style={[tw`p-2`, { borderRadius: 50 }]}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#000000" />
        </TouchableOpacity> */}
      </View>

      {/* Danh sách bình chọn */}
      <FlatList
        data={vote}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={tw`p-4`}
      />
    </SafeAreaView>
  );
};

export default VoteScreen;