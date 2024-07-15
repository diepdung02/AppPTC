import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Component } from '../../navigator/natigation'; // Ensure this path matches your actual project structure

type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = () => {
  const route = useRoute<OutputListRouteProp>();
  const { completedComponents } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Các bộ phận đã hoàn thành</Text>
      <FlatList
        data={completedComponents}
        renderItem={({ item }) => (
          <View style={styles.componentItem}>
            <Text style={styles.componentText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

    alignItems:'center',
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
