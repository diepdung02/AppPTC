import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
import { Component, Product } from "../../../navigator/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import COLORS from "../../../../constants/Color";

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Calculate scale
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

// Function to get scaled size
const getScaledSize = (size: number) => size * scale;

interface OutputListProps {
  navigation: any; 
}

const OutputList: React.FC<OutputListProps> = ({ navigation }) => {
  const [completedProducts, setCompletedProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("completedOutput");
        if (storedProducts) {
          let parsedProducts: Product[] = JSON.parse(storedProducts);
          if (!Array.isArray(parsedProducts)) {
            parsedProducts = [];
          }
          setCompletedProducts(parsedProducts);
          setFilteredData(parsedProducts); 
        } else {
          console.log("Không tìm thấy sản phẩm đã lưu.");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        Alert.alert(
          "Lỗi",
          "Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau."
        );
      } finally {
        setIsLoading(false); 
      }
    };

    fetchCompletedProducts();
  }, []);

  const toggleProductDetails = (id: number) => {
    setSelectedProductId(selectedProductId === id ? null : id);
  };

  const handleDeleteProduct = async (productId: number, productName: string) => {
    try {
      const confirmed = await confirmDelete(productName);
      if (!confirmed) return;

      const updatedProducts = completedProducts.filter((product) => product.id !== productId);
      await AsyncStorage.setItem("completedOutput", JSON.stringify(updatedProducts));
      setCompletedProducts(updatedProducts);
      setFilteredData(updatedProducts); 
      setSelectedProductId(null);
      Alert.alert("Thành công", `Đã xóa sản phẩm "${productName}".`);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại sau.");
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = completedProducts.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.ClientCode.toLowerCase().includes(text.toLowerCase()) ||
      item.PTCcode.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const confirmDelete = (productName: string): Promise<boolean> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Xác nhận",
        `Bạn có chắc chắn muốn xóa sản phẩm "${productName}"?`,
        [
          {
            text: "Hủy bỏ",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "Xóa",
            onPress: () => resolve(true),
            style: "destructive",
          },
        ]
      );
    });
  };

  const renderComponent = ({ item }: { item: Component }) => (
    <View style={[tw`p-2 rounded-md mb-2`, { backgroundColor: COLORS.lightGray }]}>
      <Text style={[tw`font-CustomFont-Italic`, { color: COLORS.text, fontSize: getScaledSize(18) }]}>
        {item.name}
      </Text>
    </View>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={tw`mb-2`}>
      <TouchableOpacity
        style={[tw`flex-row items-center p-2 mb-2 rounded-md border`, { backgroundColor: COLORS.white, borderColor: COLORS.border }]}
        onPress={() => toggleProductDetails(item.id)}
      >
        <Image source={{ uri: item.image }} style={tw`w-20 h-20 rounded-md mr-2`} />
        <View style={tw`flex-1`}>
          <Text style={[tw`font-bold mb-1`, { color: COLORS.text, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(18) }]}>
            Tên sản phẩm: {item.name}
          </Text>
          <Text style={[tw`mb-1`, { color: COLORS.text, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(14) }]}>
            PTC Code: {item.PTCcode}
          </Text>
          <Text style={[{ color: COLORS.text, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(14) }]}>
            Client Code: {item.ClientCode}
          </Text>
        </View>
      </TouchableOpacity>
      {selectedProductId === item.id && (
        <View style={[tw`p-2 rounded-md border`, { backgroundColor: COLORS.white, borderColor: COLORS.border }]}>
          <Text style={[tw`font-bold mb-2`, { color: COLORS.text, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(20) }]}>
            Bộ phận đã hoàn thành
          </Text>
          <FlatList
            data={item.components}
            renderItem={renderComponent}
            keyExtractor={(component) => component.id.toString()}
          />
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[tw`flex-1 px-4 pt-4`, { backgroundColor: COLORS.colorMain }]}>
        <Text style={[tw`text-lg`, { color: COLORS.text, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(18) }]}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1 px-4 pt-4`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center py-3 px-2 border-b`, { backgroundColor: COLORS.white, borderColor: COLORS.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`h-10 w-10 items-center justify-center`}
        >
          <FontAwesome name="arrow-left" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={[tw`font-bold ml-2`, { color: COLORS.text, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(18) }]}>
          Output
        </Text>
      </View>
      <SearchBar
        placeholder="Tìm kiếm"
        onChangeText={handleSearch}
        value={search}
        inputContainerStyle={{ backgroundColor: COLORS.white }}
        containerStyle={tw`bg-transparent border-b-0 border-t-0`}
      />
      <FlatList
        data={filteredData}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={[tw`text-lg`, { color: COLORS.text, fontFamily: 'CustomFont-Italic', fontSize: getScaledSize(18) }]}>
              Không có dữ liệu sản phẩm hoàn thành.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default OutputList;
