import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as MediaLibrary from "expo-media-library";
import { WebView } from "react-native-webview";
import tw from "twrnc";
import COLORS from "../../../../constants/Color";
import useCustomFonts from "../../../../hooks/useFont";

type Component = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  image: string;
  name: string;
  pdfUri: string;
  PTCcode: string;
  ClientCode: string;
  components: Component[];
  remainingComponents: Component[];
};

const products: Product[] = [
  {
    id: 16,
    name: "Bàn",
    pdfUri: "https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf",
    image: "https://via.placeholder.com/150",
    PTCcode: "ABC090",
    ClientCode: "AN-868",
    components: [
      { id: 1, name: "Chân bàn" },
      { id: 2, name: "Mặt bàn" },
      { id: 3, name: "Ống bàn" },
      { id: 4, name: "Bánh xe" },
      { id: 5, name: "Vít" },
    ],
    remainingComponents: [],
  },
  {
    id: 14,
    name: "Ghế",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://via.placeholder.com/150",
    PTCcode: "HIJ890",
    ClientCode: "NH-789",
    components: [
      { id: 1, name: "Chân ghế" },
      { id: 2, name: "Lưng ghế" },
      { id: 3, name: "Tay ghế" },
      { id: 4, name: "Mút ghế" },
      { id: 5, name: "Ốc vít" },
    ],
    remainingComponents: [],
  },
  {
    id: 15,
    name: "Ghế",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://via.placeholder.com/150",
    PTCcode: "HIJ890",
    ClientCode: "NH-789",
    components: [
      { id: 1, name: "Chân ghế" },
      { id: 2, name: "Lưng ghế" },
      { id: 3, name: "Tay ghế" },
      { id: 4, name: "Mút ghế" },
      { id: 5, name: "Ốc vít" },
    ],
    remainingComponents: [],
  },
];
type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Product">;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUri, setPdfUri] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [outputMenuVisible, setOutputMenuVisible] = useState<number | null>(null);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useCustomFonts();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Media Library permission not granted");
      }
    })();
  }, []);

  const handleProductPress = (product: Product) => {
    setPdfUri(product.pdfUri);
    setShowPdf(true);
  };

  const toggleOutputMenu = (productId: number) => {
    if (outputMenuVisible === productId) {
      hideMenu();
    } else {
      showMenu(productId);
    }
  };

  const showMenu = (productId: number) => {
    setOutputMenuVisible(productId);
    setSelectedProductId(productId);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setOutputMenuVisible(null);
      setSelectedProductId(null);
    });
  };

  const handleOutputPress = (product: Product) => {
    const { id, name, components, ClientCode, image, pdfUri, PTCcode, remainingComponents } = product;

    navigation.navigate("OutputScreen", {
      product: {
        id,
        name,
        components,
        PTCcode,
        ClientCode,
        image,
        pdfUri,
        remainingComponents,
      },
      productId: id,
      productName: name,
      components,
      productClient: ClientCode,
      productImage: image,
      productPDF: pdfUri,
      productCode: PTCcode,
      remainingComponents: remainingComponents,
    });
  };

  const renderItem = ({ item }: { item: Product }) => {
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    return (
      <View key={item.id} style={tw`p-2 m-1 border border-gray-300`}>
        <TouchableOpacity style={tw`flex-row items-center`} onPress={() => handleProductPress(item)}>
          <Image source={{ uri: item.image }} style={tw`w-12 h-12 mr-2`} />
          <View style={tw`flex-1`}>
            <Text style={{ fontFamily: "CustomFont-Bold", fontSize: 18 }}>{item.name}</Text>
            <Text style={{ fontFamily: "CustomFont-Regular", fontSize: 14, color: COLORS.black }}>
              PTC Code: {item.PTCcode}
            </Text>
            <Text style={{ fontFamily: "CustomFont-Regular", fontSize: 14, color: COLORS.black }}>
              Client Code: {item.ClientCode}
            </Text>
          </View>
          <TouchableOpacity style={tw`p-2`} onPress={() => toggleOutputMenu(item.id)}>
            <FontAwesome name="bars" size={20} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
        {selectedProductId === item.id && (
          <Animated.View style={[tw`bg-white rounded mt-2`, { transform: [{ translateY }] }]}>
            <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={() => handleOutputPress(item)}>
              <Text style={{ fontFamily: "CustomFont-Regular", fontSize: 16, color: COLORS.black, textAlign: 'center' }}>
                Báo Output
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  };

  const handleSearch = (text: string) => {
    setSearchKeyword(text);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={tw`flex-row items-center bg-white p-2`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-2`}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "CustomFont-Bold", fontSize: 20, flex: 1, textAlign: 'center' }}>
          Sản phẩm
        </Text>
      </View>
      {!showPdf ? (
        <>
          <SearchBar
            placeholder="Tìm kiếm"
            inputContainerStyle={tw`bg-white`}
            containerStyle={tw`bg-transparent border-t-0`}
            onChangeText={handleSearch}
            value={searchKeyword}
          />
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={tw`p-2`}
          />
        </>
      ) : (
        <WebView source={{ uri: pdfUri }} style={tw`flex-1`} />
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;
