import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Animated, Easing } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList, Component, Product } from '../../navigator/navigation'; // Adjust import path as per your project structure
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color'; // Adjust import path for your COLORS constant

type OutputListNavigationProp = StackNavigationProp<RootStackParamList, 'OutputList'>;
type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList: React.FC<{ navigation: OutputListNavigationProp; route: OutputListRouteProp }> = ({ navigation, route }) => {
  const { products } = route.params || { products: [] }; // Default to empty array if undefined

  const [completedComponents, setCompletedComponents] = useState<Component[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [outputMenuVisible, setOutputMenuVisible] = useState<number | null>(null);

  const animatedValue = React.useRef(new Animated.Value(0)).current;

  // Load completed components from AsyncStorage when the component mounts or re-focuses
  useFocusEffect(
    React.useCallback(() => {
      const loadCompletedComponents = async () => {
        try {
          const storedComponents = await AsyncStorage.getItem('completedComponents');
          if (storedComponents) {
            setCompletedComponents(JSON.parse(storedComponents));
          }
        } catch (error) {
          console.error('Error loading data:', error);
          // Handle error loading data
        }
      };
      loadCompletedComponents();
    }, [])
  );

  // Toggle output menu visibility
  const toggleOutputMenu = (productId: number) => {
    if (outputMenuVisible === productId) {
      hideMenu();
    } else {
      showMenu(productId);
    }
  };

  // Show output menu with animation
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

  // Hide output menu with animation
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

  // Render product item with components and completion status
  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    return (
      <View key={item.id} style={styles.itemContainer}>
        <TouchableOpacity style={styles.productContainer} onPress={() => toggleOutputMenu(item.id)}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemText}>PTC Code: {item.PTCcode}</Text>
          <Text style={styles.itemText}>Client Code: {item.ClientCode}</Text>
        </TouchableOpacity>

        {selectedProductId === item.id && (
          <Animated.View style={[styles.outputMenu, { transform: [{ translateY }] }]}>
            <Text style={styles.outputMenuTitle}>Các bộ phận</Text>
            {item.components.map((component) => (
              <View key={component.id} style={styles.componentItem}>
                <Text style={styles.componentText}>{component.name}</Text>
                <Text style={styles.componentText}>
                  Hoàn thành: {component.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                </Text>
              </View>
            ))}
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm và bộ phận đã hoàn thành</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  productContainer: {
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    color: '#666',
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
  componentItem: {
    paddingVertical: 5,
  },
  componentText: {
    fontSize: 16,
  },
});

export default OutputList;
