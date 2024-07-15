import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Product } from '../../navigator/natigation'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color'; 

type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = () => {
  const route = useRoute<OutputListRouteProp>();
  const navigation = useNavigation();
  const { products } = route.params;

  const [completedComponents, setCompletedComponents] = useState([]);

  useEffect(() => {
    if (route.params?.completedComponents) {
      setCompletedComponents(route.params.completedComponents);
    }
  }, [route.params?.completedComponents]);

  const renderComponentItem = ({ item }) => (
    <View style={styles.componentItem}>
      <Text style={styles.componentText}>{item.name}</Text>
    </View>
  );

  const renderProductItem = ({ item }) => {
    const nonCompletedComponents = item.components.filter(
      (component) => !completedComponents.some((comp) => comp.id === component.id)
    );

    return (
      <View style={styles.productContainer}>
        <TouchableOpacity onPress={() => handleProductPress(item)}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemText}>PTC Code: {item.PTCcode}</Text>
            <Text style={styles.itemText}>Client Code: {item.ClientCode}</Text>
          </View>
        </TouchableOpacity>
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

  const handleProductPress = (product) => {
    navigation.navigate('OutputScreen', {
      product: product,
      productId: product.id,
      components: product.components,
      productName: product.name,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách sản phẩm và bộ phận</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
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
  productContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    padding: 5,
    position: 'relative',
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
  componentItem: {
    paddingVertical: 5,
  },
  componentText: {
    fontSize: 16,
  },
  noDataText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default OutputList;
