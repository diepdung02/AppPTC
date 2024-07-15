import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Component, Product } from '../../navigator/natigation'; // Đảm bảo đường dẫn phù hợp

type OutputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OutputList'>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, 'OutputScreen'>;

const OutputScreen = ({ navigation }: { navigation: OutputScreenNavigationProp }) => {
  const route = useRoute<OutputScreenRouteProp>();
  const { product, productId, components, productName } = route.params; // Thêm cả productId và productName nếu cần
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const handleSelectComponent = (component: string) => {
    if (selectedComponents.includes(component)) {
      setSelectedComponents(selectedComponents.filter((item) => item !== component));
    } else {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const handleSubmit = () => {
    const completedComponents = components
      .filter((component) => selectedComponents.includes(component.name))
      .map((component) => component.name);
    navigation.navigate('OutputList', { completedComponents });
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
              selectedComponents.includes(item.name) && styles.selectedComponentButton,
            ]}
            onPress={() => handleSelectComponent(item.name)}
          >
            <Text style={styles.componentText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi hoàn thành</Text>
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
