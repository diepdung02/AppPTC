import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { Product } from '../types';

type ProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OutputScreen'>;

const products: Product[] = [
  { id: '1', name: 'Sản phẩm 1', components: ['Bộ phận 1', 'Bộ phận 2'] },
  { id: '2', name: 'Sản phẩm 2', components: ['Bộ phận 3', 'Bộ phận 4'] },
];

const ProductScreen = () => {
  const navigation = useNavigation<ProductScreenNavigationProp>();

  const handlePress = (product: Product) => {
    navigation.navigate('OutputScreen', { product });
  };

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <TouchableOpacity key={product.id} style={styles.productButton} onPress={() => handlePress(product)}>
          <Text style={styles.productText}>{product.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productButton: {
    padding: 10,
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  productText: {
    fontSize: 18,
  },
});

export default ProductScreen;
