import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SearchBar } from "@rneui/themed";
import { RootStackParamList, Component, Product } from "../../../navigator/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import COLORS from "../../../../constants/Color";

// Function to scale font sizes
const getScaledSize = (size: number) => {
  // Example scaling based on a ratio. Adjust as needed.
  const scale = 1; // Replace with actual scaling logic if needed
  return size * scale;
};

type OutputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OutputScreen"
>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, "OutputScreen">;

type OutputScreenProps = {
  navigation: OutputScreenNavigationProp;
};

const OutputScreen: React.FC<OutputScreenProps> = ({ navigation }) => {
  const route = useRoute<OutputScreenRouteProp>();
  const {
    productName,
    components,
    productId,
    productClient,
    productImage,
    productPDF,
    productCode,
  } = route.params;
  const [search, setSearch] = useState("");
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);
  const [remainingComponents, setRemainingComponents] = useState<Component[]>(
    []
  );
  const [completedComponents, setCompletedComponents] = useState<Component[]>(
    []
  );

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const storedRemainingComponents = await AsyncStorage.getItem(
          `remainingComponents_${productId}`
        );
        const storedCompletedComponents = await AsyncStorage.getItem(
          `completedComponents_${productId}`
        );

        if (storedRemainingComponents) {
          setRemainingComponents(JSON.parse(storedRemainingComponents));
        } else {
          setRemainingComponents(components);
        }

        if (storedCompletedComponents) {
          setCompletedComponents(JSON.parse(storedCompletedComponents));
        } else {
          setCompletedComponents([]); 
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadComponents();

    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedComponents([]);
    });

    return unsubscribe;
  }, [navigation, productId, components]);

  useEffect(() => {
    setFilteredComponents(
      remainingComponents.filter((component) =>
        component.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, remainingComponents]);

  const handleSelectComponent = (component: Component) => {
    const index = selectedComponents.findIndex((c) => c.id === component.id);
    if (index !== -1) {
      setSelectedComponents(
        selectedComponents.filter((item) => item.id !== component.id)
      );
    } else {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const handleSubmit = async () => {
    if (selectedComponents.length === 0) {
      Alert.alert(
        "Không có bộ phận nào được chọn",
        "Vui lòng chọn ít nhất một bộ phận trước khi gửi."
      );
      return;
    }

    try {
      // Update remaining and completed components
      const updatedRemainingComponents = remainingComponents.filter(
        (comp) => !selectedComponents.some((selComp) => selComp.id === comp.id)
      );
      const updatedCompletedComponents = [
        ...completedComponents,
        ...selectedComponents,
      ];

      // Save updated components to AsyncStorage
      await AsyncStorage.setItem(
        `remainingComponents_${productId}`,
        JSON.stringify(updatedRemainingComponents)
      );
      await AsyncStorage.setItem(
        `completedComponents_${productId}`,
        JSON.stringify(updatedCompletedComponents)
      );

      // Save updated completed products to AsyncStorage
      const storedProducts = await AsyncStorage.getItem("completedOutput");
      let parsedProducts: Product[] = storedProducts
        ? JSON.parse(storedProducts)
        : [];
      const existingProductIndex = parsedProducts.findIndex(
        (prod) => prod.id === productId
      );

      if (existingProductIndex !== -1) {
        parsedProducts[existingProductIndex].components =
          updatedCompletedComponents;
      } else {
        parsedProducts.push({
          id: productId,
          name: productName,
          components: updatedCompletedComponents,
          ClientCode: productClient,
          image: productImage,
          pdfUri: productPDF,
          PTCcode: productCode,
          remainingComponents,
        });
      }

      await AsyncStorage.setItem(
        "completedOutput",
        JSON.stringify(parsedProducts)
      );

      // Update state with updated components
      setRemainingComponents(updatedRemainingComponents);
      setCompletedComponents(updatedCompletedComponents);
      setSelectedComponents([]);

      Alert.alert("Thành công", "Đã gửi báo cáo hoàn thành.");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4`} >
      <View style={[tw`flex-row items-center`, { backgroundColor: COLORS.colorMain }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`mr-2`}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={[tw`text-xl flex-1 text-center font-bold`, { fontFamily: "CustomFont-Italic", fontSize: getScaledSize(20) }]}>
          Sản phẩm
        </Text>
      </View>
      <SearchBar
        placeholder="Tìm kiếm bộ phận..."
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
        containerStyle={tw`bg-transparent border-b border-gray-300 border-t-0`}
        inputContainerStyle={{ backgroundColor: COLORS.white, borderRadius: 8 }}
      />
      <Image source={{ uri: productImage }} style={tw`w-24 h-24 self-center mb-4`} />
      <Text style={[tw`text-xl  text-center`, { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16), color:COLORS.black }]}>
        Tên sản phẩm: {productName}
      </Text>
      <Text style={[tw`text-xl  text-center`, { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16), color:COLORS.black }]}>
        PTC Code: {productCode}
      </Text>
      <Text style={[tw`text-xl  text-center`, { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16), color:COLORS.black }]}>
        Client Code: {productClient}
      </Text>
      <Text style={[tw`text-lg `, { fontFamily: "CustomFont-Italic", fontSize: getScaledSize(18),color:COLORS.black }]}>
        Bộ phận chưa hoàn thành
      </Text>
      <FlatList
        data={filteredComponents}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              tw`p-4 rounded mb-2 border`,
              { borderColor: COLORS.border, backgroundColor: COLORS.white },
              selectedComponents.some((c) => c.id === item.id) && { backgroundColor: COLORS.primaryLight },
            ]}
            onPress={() => handleSelectComponent(item)}
          >
            <Text style={[tw`text-lg`, { color: COLORS.text, fontFamily: "CustomFont-Regular", fontSize: getScaledSize(18) }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`pb-4`}
      />
      <Text style={[tw`text-lg `, { fontFamily: "CustomFont-Italic", fontSize: getScaledSize(18) }]}>
        Bộ phận đã hoàn thành
      </Text>
      <FlatList
        data={completedComponents}
        renderItem={({ item }) => (
          <View
            style={[tw`p-4 rounded mb-2`, { backgroundColor: COLORS.successLight }]}
          >
            <Text style={[tw`text-lg`, { color: COLORS.text, fontFamily: "CustomFont-Italic", fontSize: getScaledSize(18) }]}>
              {item.name}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`pb-4`}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={[
          tw` p-4 rounded`,
          { backgroundColor: COLORS.blue },
        ]}
      >
        <Text style={[tw`text-center text-white`, { fontFamily: "CustomFont-Italic", fontSize: getScaledSize(16) }]}>
          Gửi báo cáo hoàn thành
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OutputScreen;