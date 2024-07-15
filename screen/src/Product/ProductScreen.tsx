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
import { RootStackParamList } from "../../navigator/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as MediaLibrary from "expo-media-library";
import { WebView } from "react-native-webview";
import COLORS from "../../../constants/Color";

type Component = {
  id: number;
  name: string;
<<<<<<< HEAD
=======
  isCompleted: boolean;
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
};

type Product = {
  id: number;
  image: string;
  name: string;
  pdfUri: string;
  PTCcode: string;
  ClientCode: string;
  components: Component[];
<<<<<<< HEAD
  remainingComponents: Component[];
=======
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
};

const products: Product[] = [
  {
    id: 1,
    name: "Bàn",
<<<<<<< HEAD
    pdfUri: "https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf",
=======
    pdfUri:
      "https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf",
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
    image: "https://via.placeholder.com/150",
    PTCcode: "ABC090",
    ClientCode: "AN-868",
    components: [
<<<<<<< HEAD
      { id: 1, name: "Chân bàn" },
      { id: 2, name: "Mặt bàn" },
      { id: 3, name: "Ống bàn" },
      { id: 4, name: "Bánh xe" },
      { id: 5, name: "Vít" },
    ],
    remainingComponents: [],
=======
      { id: 1, name: "Chân bàn", isCompleted: false },
      { id: 2, name: "Mặt bàn", isCompleted: true },
      { id: 3, name: "Ống bàn", isCompleted: false },
      { id: 4, name: "Bánh xe", isCompleted: true },
      { id: 5, name: "Vít", isCompleted: false },
    ],
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  },
  {
    id: 2,
    name: "Ghế",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://via.placeholder.com/150",
    PTCcode: "HIJ890",
    ClientCode: "NH-789",
    components: [
<<<<<<< HEAD
      { id: 1, name: "Chân ghế" },
      { id: 2, name: "Lưng ghế" },
      { id: 3, name: "Tay ghế" },
      { id: 4, name: "Mút ghế" },
      { id: 5, name: "Ốc vít" },
    ],
    remainingComponents: [],
  },
  {
    id: 3,
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
=======
      { id: 1, name: "Chân ghế", isCompleted: false },
      { id: 2, name: "Lưng ghế", isCompleted: true },
      { id: 3, name: "Tay ghế", isCompleted: false },
      { id: 4, name: "Mút ghế", isCompleted: true },
      { id: 5, name: "Ốc vít", isCompleted: false },
    ],
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  },
];

type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Product">;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [showPdf, setShowPdf] = React.useState(false);
  const [pdfUri, setPdfUri] = React.useState<string>("");
<<<<<<< HEAD
  const [selectedProductId, setSelectedProductId] = React.useState<number | null>(null);
  const [outputMenuVisible, setOutputMenuVisible] = React.useState<number | null>(null);
=======
  const [selectedProductId, setSelectedProductId] = React.useState<
    number | null
  >(null);
  const [outputMenuVisible, setOutputMenuVisible] = React.useState<
    number | null
  >(null);
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
<<<<<<< HEAD
        console.log("Media Library permission not granted");
=======
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
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
<<<<<<< HEAD
    const { id, name, components, ClientCode, image, pdfUri, PTCcode, remainingComponents } = product;

=======
    const { id, name, components, ClientCode, image, pdfUri, PTCcode } = product;
    
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
    navigation.navigate("OutputScreen", {
      product: {
        id,
        name,
<<<<<<< HEAD
        components,
=======
        components, // Ensure components are included here
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
        PTCcode,
        ClientCode,
        image,
        pdfUri,
<<<<<<< HEAD
        remainingComponents,
      },
      productId: id,
      productName: name,
      components,
=======
      },
      productId: id,
      productName: name,
      components, 
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
      productClient: ClientCode,
      productImage: image,
      productPDF: pdfUri,
      productCode: PTCcode,
    });
<<<<<<< HEAD
  };

  const renderItem = ({ item }: { item: Product }) => {
=======
  };  
  
  

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    return (
<<<<<<< HEAD
      <View key={item.id} style={styles.itemContainer}>
        <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item)}>
=======
      <View key={item.id} style={[styles.itemContainer]}>
        <TouchableOpacity
          style={styles.productContainer}
          onPress={() => handleProductPress(item)}
        >
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemText}>PTC Code: {item.PTCcode}</Text>
            <Text style={styles.itemText}>Client Code: {item.ClientCode}</Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => toggleOutputMenu(item.id)}
          >
            <FontAwesome name="bars" size={20} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
        {selectedProductId === item.id && (
<<<<<<< HEAD
          <Animated.View style={[styles.outputMenu, { transform: [{ translateY }] }]}>
            {/* <Text style={styles.outputMenuTitle}>Các bộ phận</Text>
=======
          <Animated.View
            style={[styles.outputMenu, { transform: [{ translateY }] }]}
          >
            <Text style={styles.outputMenuTitle}>Các bộ phận</Text>
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
            {item.components.map((component) => (
              <View key={component.id} style={styles.componentItem}>
                <Text style={styles.componentText}>{component.name}</Text>
              </View>
<<<<<<< HEAD
            ))} */}
            <TouchableOpacity style={styles.outputMenuItem} onPress={() => handleOutputPress(item)}>
=======
            ))}
            <TouchableOpacity
              style={styles.outputMenuItem}
              onPress={() => handleOutputPress(item)}
            >
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
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
<<<<<<< HEAD
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  goBack: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
=======
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  goBack: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemContainer: {
<<<<<<< HEAD
    padding: 10,
    margin:2,
    borderWidth:1
=======
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
<<<<<<< HEAD
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
=======
    padding: 5,
    position: "relative",
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
<<<<<<< HEAD
    fontSize: 16,
=======
    fontSize: 18,
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 14,
<<<<<<< HEAD
    color: "#555555",
  },
  menuButton: {
=======
    color: "#666",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  menuButton: {
    marginLeft: "auto",
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
    padding: 10,
  },
  outputMenu: {
    backgroundColor: "white",
<<<<<<< HEAD
    // padding: 10,
    borderRadius: 5,
    marginTop: 10,
=======
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  outputMenuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
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
<<<<<<< HEAD
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
=======
    fontSize: 16,
    alignSelf: "center",
    borderWidth: 1,
    backgroundColor: COLORS.blue,
    color: "white",
    padding: 10,
  },
  componentItem: {
    paddingVertical: 5,
  },
  componentText: {
    fontSize: 16,
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  },
});

export default ProductScreen;
