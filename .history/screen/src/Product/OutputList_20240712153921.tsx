import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/navigation';
import COLORS from '../../../constants/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type OutputListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OutputList'>;
  route: RouteProp<RootStackParamList, 'OutputList'>;
};

interface Product {
  id: number;
  name: string;
  pdfUri: string;
  image: string;
  PTCcode: string;
  ClientCode: string;
  isCompleted: boolean;
  components: {
    name: string;
    isCompleted: boolean;
  }[];
}

const OutputList: React.FC<OutputListProps> = ({ navigation, route }) => {
  const { completedComponents } = route.params;

  // This is just a placeholder for products, you might load this from a service or props in a real scenario
  const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Bàn',
      pdfUri: 'https://file-examples.com/wp-content/uploads/2017/10/file-example_PDF_1MB.pdf',
      image: 'https://via.placeholder.com/150',
      PTCcode: 'ABC090',
      ClientCode: 'AN-868',
      isCompleted: false,
      components: [
        { name: 'Component 1', isCompleted: false },
        { name: 'Component 2', isCompleted: false },
        { name: 'Component 3', isCompleted: false },
        { name: 'Component 4', isCompleted: false },
        { name: 'Component 5', isCompleted: false },
      ],
    },
    {
      id: 2,
      name: 'Ghế',
      pdfUri: 'https://heyzine.com/flip-book/48eaf42380.html',
      image: 'https://via.placeholder.com/150',
      PTCcode: 'HIJ890',
      ClientCode: 'NH-789',
      isCompleted: false,
      components: [
        { name: 'Component A', isCompleted: false },
        { name: 'Component B', isCompleted: false },
        { name: 'Component C', isCompleted: false },
        { name: 'Component D', isCompleted: false },
        { name: 'Component E', isCompleted: false },
      ],
    },
  ];

  // State to hold the list of completed component indices
  const [completedComponentIndices, setCompletedComponentIndices] = React.useState<{ id: number, componentIndex: number }[]>([]);

  useEffect(() => {
    if (completedComponents) {
      setCompletedComponentIndices(completedComponents);
    }
  }, [completedComponents]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách sản phẩm đã hoàn thành</Text>
      </View>
      <FlatList
        data={completedComponentIndices}
        keyExtractor={(item, index) => `${item.id}_${item.componentIndex}`}
        renderItem={({ item }) => {
          // Find the product by id
          const product = initialProducts.find(p => p.id === item.id);
          if (!product) return null;

          // Find the component by index
          const component = product.components[item.componentIndex];
          if (!component) return null;

          return (
            <View style={styles.productItem}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{component.name}</Text>
                <Text style={styles.productDescription}>{component.isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'}</Text>
              </View>
            </View>
          );
        }}
      />
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
});

export default OutputList;
