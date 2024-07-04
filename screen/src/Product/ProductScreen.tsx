import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Alert, Image } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/natigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as MediaLibrary from 'expo-media-library';
import { WebView } from 'react-native-webview';
import COLORS from '../../../constants/Color';

type Product = {
  id: number;
  image: string;
  name: string;
  pdfUri: string;
  PTCcode: string;
  ClientCode: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Bàn',
    pdfUri: 'https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf',
    image: 'https://via.placeholder.com/150',
    PTCcode: 'ABC090',
    ClientCode: 'AN-868'
  },
  {
    id: 2,
    name: 'Ghế',
    pdfUri: 'https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf',
    image: 'https://via.placeholder.com/150',
    PTCcode: 'HIJ890',
    ClientCode: 'NH-789'
  },
];

type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [showPdf, setShowPdf] = React.useState(false);
  const [pdfUri, setPdfUri] = React.useState<string>('');

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
      }
    })();
  }, []);

  const handleProductPress = (product: Product) => {
    setPdfUri(product.pdfUri);
    setShowPdf(true);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemText}>PTC Code: {item.PTCcode}</Text>
        <Text style={styles.itemText}>Client Code: {item.ClientCode}</Text>
      </View>
    </TouchableOpacity>
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
      />
          <FlatList
            data={products}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  goBack: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default ProductScreen;
