import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Component, Product } from '../../navigator/natigation';
import COLORS from '../../../constants/Color';

type OutputListNavigationProp = StackNavigationProp<RootStackParamList, 'OutputList'>;
type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = ({ navigation }: { navigation: OutputListNavigationProp }) => {
  const route = useRoute<OutputListRouteProp>();
  const { completedComponents, product }: { completedComponents?: Component[], product?: Product } = route.params;

  // Example: Display product and department information if available
  const productName = product ? product.name : 'Unknown Product';
  const department = product ? product.department : 'Unknown Department';

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.department}>{department}</Text>
      <FlatList
        data={completedComponents}
        renderItem={({ item }) => (
          <View style={styles.completedComponent}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.colorMain,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
  },
  department: {
    fontSize: 18,
    color: '#495057',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  completedComponent: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#dee2e6',
    borderRadius: 8,
  },
});

export default OutputList;
