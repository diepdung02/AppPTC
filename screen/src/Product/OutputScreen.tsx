import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/';
import COLORS from '../../../constants/Color';
import { completeProducts } from '../../../redux/overtime/productSlice';

type OutputProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OutputScreen'>;
};

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  components: {
    name: string;
    isCompleted: boolean;
  }[];
}

const initialProducts: Product[] = [
  { id: 1, name: 'Bộ phận 1', image: 'https://via.placeholder.com/150', description: 'Mô tả bộ phận 1', components: [{ name: 'Component A', isCompleted: false }] },
  { id: 2, name: 'Bộ phận 2', image: 'https://via.placeholder.com/150', description: 'Mô tả bộ phận 2', components: [{ name: 'Component B', isCompleted: false }] },
  // Add more products with components as needed
];

const OutputScreen: React.FC<OutputProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState<{ id: number, componentIndex: number }[]>([]);
  const dispatch = useDispatch();

  const handleSelectProduct = (id: number, componentIndex: number) => {
    const index = selectedProducts.findIndex((product) => product.id === id && product.componentIndex === componentIndex);
    if (index >= 0) {
      setSelectedProducts((prevSelected) => prevSelected.filter((_, i) => i !== index));
    } else {
      setSelectedProducts((prevSelected) => [...prevSelected, { id, componentIndex }]);
    }
  };

  const handleComplete = () => {
    dispatch(completeProducts(selectedProducts));
    navigation.navigate('OutputList', { completedProducts: selectedProducts });
    setSelectedProducts([]);
    Alert.alert('Thông báo', 'Đã gửi báo cáo hoàn thành sản phẩm.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả yêu cầu</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            {item.components.map((component, index) => (
              <TouchableOpacity
                key={`${item.id}_${index}`}
                style={[
                  styles.productItem,
                  selectedProducts.some(
                    (selected) => selected.id === item.id && selected.componentIndex === index
                  ) && styles.selectedProductItem,
                ]}
                onPress={() => handleSelectProduct(item.id, index)}
              >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productDescription}>{component.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <TouchableOpacity onPress={handleComplete} disabled={selectedProducts.length === 0} style={styles.send}>
        <Text style={styles.txtSend}>Gửi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.colorMain,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  selectedProductItem: {
    backgroundColor: '#d1e7dd',
    borderWidth: 2,
    borderColor: '#0d6efd',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontSize: 18,
    color: '#495057',
  },
  productDescription: {
    fontSize: 14,
    color: '#6c757d',
  },
  send: {
    borderWidth: 2,
    height: 40,
    width: 200,
    backgroundColor: COLORS.blue,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  txtSend: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OutputScreen;
