import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/natigation'; // Ensure correct path to navigation
import COLORS from '../../../constants/Color'; // Ensure correct path to COLORS constant
import { completeProducts } from '../../../redux/overtime/productSlice';

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

type ComponentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OutputScreen'>;
  productId: number; // Ensure this is passed correctly from OutputScreen
};

const ComponentScreen: React.FC<ComponentScreenProps> = ({ navigation, productId }) => {
  const [selectedComponents, setSelectedComponents] = useState<number[]>([]);
  const dispatch = useDispatch();

  const handleSelectComponent = (componentIndex: number) => {
    const index = selectedComponents.indexOf(componentIndex);
    if (index !== -1) {
      setSelectedComponents((prevSelected) => prevSelected.filter((_, i) => i !== index));
    } else {
      setSelectedComponents((prevSelected) => [...prevSelected, componentIndex]);
    }
  };

  const handleComplete = () => {
    const selectedComponentsData = selectedComponents.map((index) => ({
      productId,
      componentIndex: index,
    }));
    dispatch(completeProducts(selectedComponentsData));
    navigation.navigate('OutputList', { completedComponents: selectedComponentsData });
    setSelectedComponents([]);
    Alert.alert('Thông báo', 'Đã gửi báo cáo hoàn thành bộ phận.');
  };

  // Find the product by productId and get its components
  const product = initialProducts.find((prod) => prod.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.noProductText}>Không tìm thấy sản phẩm.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={product.components}
        keyExtractor={(item, index) => `${item.name}_${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.productItem,
              selectedComponents.includes(index) && styles.selectedProductItem,
            ]}
            onPress={() => handleSelectComponent(index)}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productDescription}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={handleComplete} disabled={selectedComponents.length === 0} style={styles.send}>
        <Text style={styles.txtSend}>Gửi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.colorMain, // Ensure COLORS is imported correctly
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
    backgroundColor: COLORS.blue, // Ensure COLORS is imported correctly
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
  noProductText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ComponentScreen;
