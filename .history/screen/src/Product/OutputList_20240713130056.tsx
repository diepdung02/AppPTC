import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/natigation';

type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = () => {
  const route = useRoute<OutputListRouteProp>();
  const { completedProducts } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Các bộ phận đã hoàn thành</Text>
      <FlatList
        data={completedProducts}
        renderItem={({ item }) => (
          <View style={styles.componentItem}>
            <Text style={styles.componentText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  componentItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  componentText: {
    fontSize: 18,
  },
});

export default OutputList;
