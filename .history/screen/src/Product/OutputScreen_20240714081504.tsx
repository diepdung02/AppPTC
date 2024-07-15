import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Component } from '../../navigator/natigation';

type OutputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OutputList'>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, 'OutputScreen'>;

const OutputScreen = ({ navigation }: { navigation: OutputScreenNavigationProp }) => {
  const route = useRoute<OutputScreenRouteProp>();
  const { productName, components } = route.params;
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);

  const handleSelectComponent = (component: Component) => {
    const index = selectedComponents.findIndex((c) => c.id === component.id);
    if (index !== -1) {
      setSelectedComponents(selectedComponents.filter((item) => item.id !== component.id));
    } else {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('OutputList', { completedComponents: selectedComponents });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.productName}>{productName}</Text>
      <FlatList
        data={components}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.componentButton,
              selectedComponents.some((c) => c.id === item.id) && styles.selectedComponentButton,
            ]}
            onPress={() => handleSelectComponent(item)}
          >
            <Text style={styles.componentText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colo,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  componentButton: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#dee2e6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedComponentButton: {
    backgroundColor: '#a5d6a7',
  },
  componentText: {
    fontSize: 18,
    color: '#495057',
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OutputScreen;
