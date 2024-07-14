import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Component } from '../../navigator/natigation'; // Ensure this path matches your actual project structure

type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = () => {
  const route = useRoute<OutputListRouteProp>();
  const { completedComponents = [] } = route.params || {}; // Provide default value

  const initialComponents: Component[] = [
    { id: 1, name: 'Bộ phận A' },
    { id: 2, name: 'Bộ phận B' },
    { id: 3, name: 'Bộ phận C' },
  ];

  const [components, setComponents] = useState<Component[]>(initialComponents);
  const [completed, setCompleted] = useState<Component[]>([]);

  useEffect(() => {
    if (completedComponents.length > 0) {
      setCompleted((prevCompleted) => [
        ...prevCompleted,
        ...completedComponents.filter(
          (comp) => !prevCompleted.some((c) => c.id === comp.id)
        ),
      ]);
    }
  }, [completedComponents]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Các bộ phận đã hoàn thành</Text>
      {completed.length > 0 ? (
        <FlatList
          data={completed}
          renderItem={({ item }) => (
            <View style={styles.componentItem}>
              <Text style={styles.componentText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noDataText}>Không có bộ phận nào đã hoàn thành.</Text>
      )}
      <Text style={styles.title}>Các bộ phận chưa hoàn thành</Text>
      <FlatList
        data={components.filter(
          (comp) => !completed.some((c) => c.id === comp.id)
        )}
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
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
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
    marginTop: 20,
  },
});

export default OutputList;
