import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Product, Component } from '../../navigator/';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as MediaLibrary from 'expo-media-library';
import { WebView } from 'react-native-webview';
import COLORS from '../../../constants/Color';

type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [showPdf, setShowPdf] = React.useState(false);
  const [pdfUri, setPdfUri] = React.useState<string>('');
  const [selectedProductId, setSelectedProductId] = React.useState<number | null>(null);
  const [outputMenuVisible, setOutputMenuVisible] = React.useState<number | null>(null);

  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        // Handle permission not granted
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
    navigation.navigate('OutputScreen', {
      product: product,
      productId: product.id,
      components: product.components,
      productName: product.name,
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
    position: 'relative',
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
  menuButton: {
    marginLeft: 'auto',
    padding: 10,
  },
  outputMenu: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  outputMenuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  outputMenuItem: {
    paddingVertical: 5,
  },
  outputMenuItemText: {
    fontSize: 16,
  },
  componentItem: {
    paddingVertical: 5,
  },
  componentText: {
    fontSize: 16,
  },
});

export default ProductScreen;
