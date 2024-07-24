import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
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
import COLORS from "../../../../constants/Color";

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
  const [showPdf, setShowPdf] = React.useState(false);
  const [pdfUri, setPdfUri] = React.useState<string>("");
  const [selectedProductId, setSelectedProductId] = React.useState<number | null>(null);
  const [outputMenuVisible, setOutputMenuVisible] = React.useState<number | null>(null);

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");

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
      <View key={item.id} style={styles.itemContainer}>
        <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item)}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemText}>PTC Code: {item.PTCcode}</Text>
            <Text style={styles.itemText}>Client Code: {item.ClientCode}</Text>
          </View>
          <TouchableOpacity style={styles.menuButton} onPress={() => toggleOutputMenu(item.id)}>
            <FontAwesome name="bars" size={20} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
        {selectedProductId === item.id && (
          <Animated.View style={[styles.outputMenu, { transform: [{ translateY }] }]}>
            {/* <Text style={styles.outputMenuTitle}>Các bộ phận</Text>
            {item.components.map((component) => (
              <View key={component.id} style={styles.componentItem}>
                <Text style={styles.componentText}>{component.name}</Text>
              </View>
            ))} */}
            <TouchableOpacity style={styles.outputMenuItem} onPress={() => handleOutputPress(item)}>
              <Text style={styles.outputMenuItemText}>Báo Output</Text>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sản phẩm</Text>
      </View>
      {!showPdf ? (
        <>
          <SearchBar
            placeholder="Tìm kiếm"
            inputContainerStyle={{ backgroundColor: "white" }}
            containerStyle={{
              backgroundColor: "transparent",
              borderBottomWidth: 0,
              borderTopWidth: 0,
            }}
            onChangeText={handleSearch}
            value={searchKeyword}
          />
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </>
      ) : (
        <WebView source={{ uri: pdfUri }} style={{ flex: 1 }} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: COLORS.colorMain,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  goBack: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily:'CustomFont-Bold'
    textAlign: "center",
    flex: 1,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemContainer: {
    padding: 10,
    margin:2,
    borderWidth:1
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 14,
    color: "#555555",
  },
  menuButton: {
    padding: 10,
  },
  outputMenu: {
    backgroundColor: "white",
    // padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  outputMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  componentItem: {
    paddingVertical: 5,
  },
  componentText: {
    fontSize: 14,
  },
  outputMenuItem: {
    // marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  outputMenuItemText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProductScreen;