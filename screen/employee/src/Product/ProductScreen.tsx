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
  Dimensions,
  Button
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";
import tw from "twrnc";
import COLORS from "../../../../constants/Color";
import useCustomFonts from "../../../../hooks/useFont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';

// Lấy kích thước màn hình
const { width, height } = Dimensions.get('window');

// Kích thước cơ sở để tính toán tỷ lệ
const BASE_WIDTH = 375; // Kích thước màn hình cơ sở
const BASE_HEIGHT = 667; // Kích thước màn hình cơ sở

// Tính tỷ lệ scale
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

type Component = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  image: string;
  collectionName: string;
  pdfUri: string;
  PTCcode: string;
  ClientCode: string;
  Dimensions: string[];
  components: Component[];
  remainingComponents: Component[];

};

const products: Product[] = [
  // Example products data (same as before)
  {
    id: 16,
    collectionName: "Durrant",
    pdfUri: "https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/MB/MB618507.SWO.00.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "MB618507.SWO.00",
    ClientCode: "DURR.CHST.ARML.SWO.BR.FRAME",
    Dimensions: ["120x60x75 cm"],
    components: [
      { id: 1, name: "Chân ghế" },
      { id: 2, name: "Mặt ghế" },
      { id: 3, name: "Ống ghế" },
      { id: 4, name: "Tấm đệm" },
      { id: 5, name: "Vít" },
    ],
    remainingComponents: [],
  },
  {
    id: 14,
    collectionName: "Durrant",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/MB/MB618508.DWN.00.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "MB618508.DWN.00",
    ClientCode: "DURR.CHST.ARML.DWN.BR.FRAME",
    Dimensions: ["120x60x75 cm"],
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
    collectionName: "Dorothy",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/JC/202406211241272014_JC630505.RGL.02.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "JC630505.RGL.02",
    ClientCode: "6344.RGL.000",
    Dimensions: ["120x60x75 cm"],
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
    id: 6,
    collectionName: "Dorothy",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/JC/202104191128294439_JC630501.BGL.01.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "JC630501.BGL.01",
    ClientCode: "6197.BGL.000",
    Dimensions: ["120x60x75 cm"],
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
    id: 3,
    collectionName: "Durrant",
    pdfUri: "https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/MB/MB618507.SWO.00.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "MB618507.SWO.00",
    ClientCode: "DURR.CHST.ARML.SWO.BR.FRAME",
    Dimensions: ["120x60x75 cm"],
    components: [
      { id: 1, name: "Chân ghế" },
      { id: 2, name: "Mặt ghế" },
      { id: 3, name: "Ống ghế" },
      { id: 4, name: "Tấm đệm" },
      { id: 5, name: "Vít" },
    ],
    remainingComponents: [],
  },
  {
    id: 2,
    collectionName: "Durrant",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/MB/MB618508.DWN.00.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "MB618508.DWN.00",
    ClientCode: "DURR.CHST.ARML.DWN.BR.FRAME",
    Dimensions: ["120x60x75 cm"],
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
    id: 1,
    collectionName: "	Anthropologie",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/AN/202104141009273551_AN742117.BLC.00.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "AN742117.BLC.00",
    ClientCode: "0054062328",
    Dimensions: ["120x60x75 cm"],
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
    id: 5,
    collectionName: "	Anthropologie",
    pdfUri: "https://heyzine.com/flip-book/48eaf42380.html",
    image: "https://phucthang.file.core.windows.net/pictureproductfile/PICTUREDATA/AN/202105191445441798_AN742117.GRC.00.gif?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-31T16:41:13Z&st=2023-12-31T08:41:13Z&spr=https,http&sig=Tps5ZmaA%2FumvNMqx0Z2efhZCtKwlNnqhzuMhlRCQboI%3D",
    PTCcode: "AN742117.GRC.00",
    ClientCode: "0060651197",
    Dimensions: ["120x60x75 cm"],
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
  const [selectedCollectionName, setSelectedCollectionName] = useState<string>("");
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

  const handleCategoryChange = (collectionName: string | null) => {
    setSelectedCollectionName(collectionName || "");
  };

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

  // const handleOutputPress = (product: Product) => {
  //   const { id, collectionName, components, ClientCode, image, pdfUri, PTCcode, remainingComponents } = product;

  //   navigation.navigate("OutputScreen", {
  //     product: {
  //       id,
  //       collectionName,
  //       components,
  //       PTCcode,
  //       ClientCode,
  //       image,
  //       pdfUri,
  //       remainingComponents,
  //     },
  //   });
  // };

  const handleSearch = (text: string) => {
    setSearchKeyword(text);
  };

  const filteredProducts = products.filter((product) =>
    (product.collectionName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
     product.PTCcode.toLowerCase().includes(searchKeyword.toLowerCase())) &&
    (selectedCollectionName === "" || product.collectionName === selectedCollectionName)
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View key={item.id} style={tw`p-2 m-1 border border-gray-300 rounded-lg`}>
      <TouchableOpacity onPress={() => handleProductPress(item)}>
        <View style={tw`items-center`}>
          <Image
            source={{ uri: item.image }}
            style={[
              {
                width: getScaledSize(150),
                height: getScaledSize(120),
                borderRadius: getScaledSize(8),
              },
              { resizeMode: "contain" },
            ]}
          />
        </View>
        <View style={tw`mt-5`}>
          <View style={tw`flex-row`}>
            <Text style={[tw`ml-5`, { fontFamily: "CustomFont-Regular", fontSize: 14, color: COLORS.red }]}>
              Collection Name: 
            </Text>
            <Text style={[tw`ml-2`, { fontFamily: "CustomFont-Regular", fontSize: 16 }]}>{item.collectionName}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`ml-5`, { fontFamily: "CustomFont-Regular", fontSize: 14, color: COLORS.red }]}>
              PTC Code: 
            </Text>
            <Text style={[tw`ml-2`, { fontFamily: "CustomFont-Regular", fontSize: 16, color: COLORS.black }]}>{item.PTCcode}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`ml-5`, { fontFamily: "CustomFont-Regular", fontSize: 14, color: COLORS.red }]}>
              Client Code: 
            </Text>
            <Text style={[tw`ml-2`, { fontFamily: "CustomFont-Regular", fontSize: 16, color: COLORS.black }]}>{item.ClientCode}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`ml-5`, { fontFamily: "CustomFont-Regular", fontSize: 14, color: COLORS.red }]}>
              Dimension: 
            </Text>
            <Text style={[tw`ml-2`, { fontFamily: "CustomFont-Regular", fontSize: 16, color: COLORS.black }]}>
              {item.Dimensions.join(", ")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={tw`p-2 absolute top-2 right-2`} onPress={() => toggleOutputMenu(item.id)}>
        <FontAwesome name="bars" size={20} color="black" />
      </TouchableOpacity>

      {selectedProductId === item.id && (
        <Animated.View style={[tw`bg-white rounded mt-2`, { transform: [{ translateY: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
          <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={() => handleOutputPress(item)}>
            <Text style={{ fontFamily: "CustomFont-Regular", fontSize: 16, color: COLORS.black, textAlign: 'center' }}>
              Báo Output
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );


  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View style={[tw`flex-row items-center py-2.5 px-5 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} 
          style={[tw`p-2`, { borderRadius: 50 }]} 
          activeOpacity={0.7} 
        >
          <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={{ fontFamily: "CustomFont-Bold", fontSize: 20, flex: 1, textAlign: 'center' }}>
          Sản phẩm
        </Text>
      </View>
      {!showPdf ? (
        <>
          <SearchBar
            placeholder="Tìm kiếm"
            onChangeText={handleSearch}
            value={searchKeyword}
            lightTheme
            round
            containerStyle={tw`bg-transparent border-b border-gray-300 border-t-0`}
            inputContainerStyle={{ height: getScaledSize(40), backgroundColor: COLORS.white }}
            inputStyle={{ fontSize: getScaledSize(16) }}
          />
          <View style={tw`flex-row mb-4`}>
          <Button title="All" onPress={() => handleCategoryChange(null)} />
          <Button title="Dorothy" onPress={() => handleCategoryChange("Dorothy")} />
          <Button title="Durrant" onPress={() => handleCategoryChange("Durrant")} />
          <Button title="Anthropologie" onPress={() => handleCategoryChange("	Anthropologie")} />
        </View>
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={tw`p-5`}
          />
        </>
      ) : (
        <WebView source={{ uri: pdfUri }} style={tw`flex-1`} />
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;
