import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../../constants/Color';
import { Component, Product } from '../../../types'; // Assuming Component and Product types are defined in a separate file

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Bàn',
    pdfUri: 'https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf',
    image: 'https://via.placeholder.com/150',
    PTCcode: 'ABC090',
    ClientCode: 'AN-868',
    components: [
      { id: 1, name: 'Chân bàn', isCompleted: false },
      { id: 2, name: 'Mặt bàn', isCompleted: true },
      { id: 3, name: 'Ống bàn', isCompleted: false },
      { id: 4, name: 'Bánh xe', isCompleted: true },
      { id: 5, name: 'Vít', isCompleted: false },
    ],
  },
  {
    id: 2,
    name: 'Ghế',
    pdfUri: 'https://heyzine.com/flip-book/48eaf42380.html',
    image: 'https://via.placeholder.com/150',
    PTCcode: 'HIJ890',
    ClientCode: 'NH-789',
    components: [
      { id: 1, name: 'Chân ghế', isCompleted: false },
      { id: 2, name: 'Lưng ghế', isCompleted: true },
      { id: 3, name: 'Tay ghế', isCompleted: false },
      { id: 4, name: 'Mút ghế', isCompleted: true },
      { id: 5, name: 'Ốc vít', isCompleted: false },
    ],
  },
];

type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUri, setPdfUri] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);

  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (selectedProductId !== null && selectedComponents.length > 0) {
        const updatedProducts = products.map((product) => {
          if (product.id === selectedProductId) {
            const updatedComponents = product.components.map((component) => {
              const isSelected = selectedComponents.some((c: Component) => c.id === component.id);
              if (isSelected) {
                return { ...component, isCompleted: true };
              }
              return component;
            });
            return { ...product, components: updatedComponents };
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    });

    return unsubscribe;
  }, [navigation, products, selectedProductId, selectedComponents]);

  const handleProductPress = (product: Product) => {
    setPdfUri(product.pdfUri);
    setShowPdf(true);
  };

  const toggleOutputMenu = (productId: number) => {
    if (selectedProductId === productId) {
      setSelectedProductId(null);
      setSelectedComponents([]);
    } else {
      setSelectedProductId(productId);
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedComponents(product.components.filter((c: Component) => c.isCompleted));
      } else {
        setSelectedComponents([]);
      }
    }
  };

  const handleOutputPress = (product: Product) => {
    navigation.navigate('OutputScreen', {
      product: product,
      components: selectedComponents,
    });
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    return (
      <View key={item.id} style={[styles.itemContainer]}>
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
            <Text style={styles.outputMenuTitle}>Các bộ phận</Text>
            {item.components.map((component) => (
              <View key={component.id} style={styles.componentItem}>
                <Text style={styles.componentText}>{component.name}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.outputMenuItem}
              onPress={() => handleOutputPress(item)}>
              <Text style={styles.outputMenuItemText}>Báo Output</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  };

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
            inputContainerStyle={{ backgroundColor: 'white' }}
            containerStyle={{
              backgroundColor: 'transparent',
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
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    color: 'gray',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  outputMenu: {
    position: 'absolute',
    top: 80,
    right: 10,
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 5,
    zIndex: 100,
  },
  outputMenuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  componentItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  componentText: {
    fontSize: 14,
  },
  outputMenuItem: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  outputMenuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
