import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, OutputScreenRouteProp } from '../../navigator/natigation';

const OutputScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList, 'OutputList'> }) => {
  const route = useRoute<OutputScreenRouteProp>();
  const { product } = route.params;
  const [selectedComponents, setSelectedComponents] = useState<Component[]>(product.components.map(comp => ({
    ...comp,
    isCompleted: false,
  })));

  const handleSelectComponent = (index: number) => {
    const updatedComponents = [...selectedComponents];
    updatedComponents[index] = {
      ...updatedComponents[index],
      isCompleted: !updatedComponents[index].isCompleted,
    };
    setSelectedComponents(updatedComponents);
  };

  const handleSubmit = () => {
    const completedComponents = selectedComponents.filter(comp => comp.isCompleted).map(comp => comp.name);
    navigation.navigate('OutputList', { completedComponents });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      <FlatList
        data={selectedComponents}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.componentButton,
              item.isCompleted && styles.selectedComponentButton,
            ]}
            onPress={() => handleSelectComponent(index)}
          >
            <Text style={styles.componentText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  componentButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  selectedComponentButton: {
    backgroundColor: 'lightgreen',
  },
  componentText: {
    fontSize: 18,
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default OutputScreen;
