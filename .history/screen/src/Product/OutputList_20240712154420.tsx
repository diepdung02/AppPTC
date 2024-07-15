import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color'; // Ensure the correct path to your color constants

type Component = {
  id: number;
  name: string;
  isCompleted: boolean; // Add isCompleted property
};

type Product = {
  id: number;
  name: string;
  components: Component[];
};

const products: Product[] = [
  {
    id: 1,
    name: 'Bàn',
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
    components: [
      { id: 1, name: 'Chân ghế', isCompleted: false },
      { id: 2, name: 'Lưng ghế', isCompleted: true },
      { id: 3, name: 'Tay ghế', isCompleted: false },
      { id: 4, name: 'Mút ghế', isCompleted: true },
      { id: 5, name: 'Ốc vít', isCompleted: false },
    ],
  },
  // Add more products as needed
];

type OutputListProps = {
  products: Product[];
};

const OutputList: React.FC<OutputListProps> = ({ products }) => {
  const completedComponents: Component[] = [];
  const incompleteComponents: Component[] = [];

  // Split components into completed and incomplete lists
  products.forEach((product) => {
    product.components.forEach((component) => {
      if (component.isCompleted) {
        completedComponents.push(component);
      } else {
        incompleteComponents.push(component);
      }
    });
  });

  const renderItem = (data: Component[], title: string) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((component) => (
        <View key={component.id} style={styles.componentItem}>
          <Text style={styles.componentText}>{component.name}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={20} color="black" />
        <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
      </View>
      <View style={styles.list}>
        {renderItem(completedComponents, 'Đã hoàn thành')}
        {renderItem(incompleteComponents, 'Chưa hoàn thành')}
      </View>
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
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
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
