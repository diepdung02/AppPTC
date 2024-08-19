import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import { RootStackParamList } from '../../../navigator/navigation';
import COLORS from "../../../../constants/Color";
import { SearchBar } from '@rneui/themed';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

type Props = {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
};

const { width, height } = Dimensions.get("window");
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

const getButtonStyle = (tabName: string, selectedTab: string) => {
  return selectedTab === tabName
    ? { backgroundColor: COLORS.primary, color: COLORS.white }
    : { backgroundColor: COLORS.white, color: COLORS.primary };
};

const DetailProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;

  const [selectedTab, setSelectedTab] = useState('Detail');
  const [searchText, setSearchText] = useState('');

  const quantityData = [
    { docNumber: 'DRA-24535', docDescription: 'Update May 24, 2024 by Thanh Hai as per ECR-2308 & ECR-2325 - Increase the length of the bolt and insert nut & Color code. (Thay đổi chiều dài bu lông và tán cấy). From : HW09-417, HW09-890 To: HW09-1211, HW09-1212, - Add 4 PCS HW09-222 & Remove 4 PCS HW09-635. (Thêm 4 con HW09-222 và xóa 4 con HW09-635). /' },
    { docNumber: 'DRA-16644', docDescription: 'Cập nhật theo ECR -1882 /' },
    { docNumber: 'DRA-16512', docDescription: 'Đổi code HW99-366 sang code HW08-366 /' },
    // Thêm nhiều dữ liệu khác nếu cần
  ];

  const filteredData = quantityData.filter(item =>
    item.docNumber.includes(searchText) || item.docDescription.includes(searchText)
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Detail':
        return (
          <View key={item.id} style={tw`p-2 border border-gray-300 rounded-lg`}>
            <View style={tw`flex-row`}>
              <Image
                source={{ uri: item.image }}
                style={[
                  {
                    width: getScaledSize(100),
                    height: getScaledSize(100),
                    borderRadius: getScaledSize(10),
                  },
                  { resizeMode: "contain" },
                ]}
              />
              <View style={tw`flex-1 my-1 ml-3`}>
                {[
                  { label: 'PTC Code:', value: item.PTCcode },
                  { label: 'Description:', value: item.description },
                  { label: 'Collection:', value: item.collectionName },
                  { label: 'Group:', value: item.productGroup },
                  { label: 'Color Code:', value: item.colorCode },
                  { label: 'Dimension:', value: item.Dimensions.join(", ") },
                  { label: 'CBM:', value: item.cbm },
                  { label: 'Client Code:', value: item.ClientCode },
                ].map((info, index) => (
                  <View key={index} style={tw`bg-transparent border-b border-gray-300`}>
                    <View style={tw`flex-row`}>
                      <View style={tw`flex-1`}>
                        <Text
                          style={[
                            tw``,
                            {
                              fontFamily: "CustomFont-Regular",
                              fontSize: getScaledSize(14),
                              color: COLORS.red,
                              marginBottom: 4,
                            },
                          ]}
                        >
                          {info.label}
                        </Text>
                      </View>
                      <Text
                        style={[
                          tw`flex-1`,
                          {
                            fontFamily: "CustomFont-Regular",
                            fontSize: getScaledSize(14),
                            color: COLORS.black,
                          },
                        ]}
                      >
                        {info.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      case 'Quantity':
        return (
          <View style={tw``}>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.docNumber}
              renderItem={({ item }) => (
                <View style={tw`p-3 border border-gray-300 rounded-lg mb-2`}>
                  <Text style={{ fontSize: getScaledSize(14), fontFamily: "CustomFont-Bold" }}>Doc Number: {item.docNumber}</Text>
                  <Text style={{ fontSize: getScaledSize(14), fontFamily: "CustomFont-Regular" }}>Doc Description: {item.docDescription}</Text>
                </View>
              )}
            />
            <Text style={{ fontSize: getScaledSize(14), marginTop: getScaledSize(8), fontFamily: "CustomFont-Regular" }}>
              Total: {filteredData.length} items
            </Text>
          </View>
        );
      case 'Drawing':
        return (
          <View style={tw`p-5`}>
            <Text style={{ fontSize: getScaledSize(18), fontFamily: "CustomFont-Bold" }}>Drawing Information</Text>
            {/* Thêm thông tin Drawing ở đây */}
          </View>
        );
      case 'Panel':
        return (
          <View style={tw`p-5`}>
            <Text style={{ fontSize: getScaledSize(18), fontFamily: "CustomFont-Bold" }}>Panel Information</Text>
            {/* Thêm thông tin Panel ở đây */}
          </View>
        );
      case 'Testing':
        return (
          <View style={tw`p-5`}>
            <Text style={{ fontSize: getScaledSize(18), fontFamily: "CustomFont-Bold" }}>Testing Information</Text>
            {/* Thêm thông tin Testing ở đây */}
          </View>
        );
      case 'Others':
        return (
          <View style={tw`p-5`}>
            <Text style={{ fontSize: getScaledSize(18), fontFamily: "CustomFont-Bold" }}>Other Information</Text>
            {/* Thêm thông tin Others ở đây */}
          </View>
        );
      case 'Instruction':
        return (
          <View style={tw`p-5`}>
            <Text style={{ fontSize: getScaledSize(18), fontFamily: "CustomFont-Bold" }}>Instruction Information</Text>
            {/* Thêm thông tin Instruction ở đây */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 px-5 bg-gray-100`}>
      <View style={tw`flex-row items-center bg-white`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`h-15 w-15 items-center justify-center`}
        >
          <FontAwesome name="arrow-left" size={getScaledSize(20)} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: getScaledSize(18), marginLeft: getScaledSize(8), fontFamily: "CustomFont-Bold" }}>
          Chi tiết sản phẩm
        </Text>
      </View>
      <View style={tw`mt-4`}>
        <SearchBar
          placeholder="Tìm kiếm"
          onChangeText={setSearchText}
          value={searchText}
          lightTheme
          round
          containerStyle={tw`bg-transparent border-b border-gray-300 border-t-0`}
          inputContainerStyle={{
            height: getScaledSize(40),
            backgroundColor: COLORS.white,
          }}
          inputStyle={{ fontSize: getScaledSize(16) }}
        />
      </View>
      <View style={tw`flex-row mb-2`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={tw`flex-row `}>
            {['Detail', 'Quantity', 'Drawing', 'Panel', 'Testing', 'Others', 'Instruction'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[tw`p-3 m-2 rounded-full`, getButtonStyle(tab, selectedTab)]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={{ color: getButtonStyle(tab, selectedTab).color, textAlign: 'center', fontSize: getScaledSize(14) }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      {renderTabContent()}
    </SafeAreaView>
  );
};

export default DetailProductScreen;
