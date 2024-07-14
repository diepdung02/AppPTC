import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Product, Component } from '../../navigator/natigation'; // Ensure this path matches your actual project structure

type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = () => {
  const route = useRoute<OutputListRouteProp>();
  const { products = [] } = route.params || {}; // Provide default value

  const [completedComponents, setCompletedComponents] = useState<Component[]>([]);

  useEffect(() => {
    if (route.params?.completedComponents) {
      setCompletedComponents(route.params.completedComponents);
    }
  }, [route.params?.completedComponents]);

  const renderComponentItem = ({ item }: { item: Component }) => (
    <View style={styles.componentItem}>
      <Text style={styles.componentText}>{item.name}</Text>
    </View>
  );

  const renderProductItem = ({ item }: { item: Product }) => {
    const nonCompletedComponents = item.components.filter(
      (component) => !completedComponents.some((comp) => comp.id === component.id)
    );

    return (
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        {nonCompletedComponents.length > 0 ? (
          <FlatList
            data={nonCompletedComponents}
            renderItem={renderComponentItem}
            keyExtractor={(component) => component.id.toString()}
          />
        ) : (
          <Text style={styles.noDataText}>Không có bộ phận nào chưa hoàn thành.</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm và bộ phận</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(product) => product.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
    textAlign: 'center',
  },
  productContainer: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 10,
  },
  componentItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#dee2e6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentText: {
    fontSize: 18,
    color: '#495057',
  },
  noDataText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default OutputList;
