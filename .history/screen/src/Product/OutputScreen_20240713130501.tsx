import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Component } from '../../navigator/natigation'; // Đảm bảo đường dẫn phù hợp

type OutputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OutputList'>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, 'OutputScreen'>;

const OutputScreen = ({ navigation }: { navigation: OutputScreenNavigationProp }) => {
  const route = useRoute<OutputScreenRouteProp>();
  const { product, productName, components } = route.params;
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
    <View style={styles.container}>
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
