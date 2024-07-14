import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Component } from '../../navigator/navigation'; // Đảm bảo đúng đường dẫn đến navigation
import COLORS from '../../../constants/'; // Đảm bảo đúng đường dẫn đến Colors

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

  const handleSubmit = async () => {
    if (selectedComponents.length === 0) {
      Alert.alert('Chưa chọn thành phần', 'Vui lòng chọn ít nhất một thành phần trước khi gửi.');
      return;
    }

    try {
      // Lưu dữ liệu vào AsyncStorage
      await AsyncStorage.setItem('completedOutput', JSON.stringify({
        id: route.params.productId,
        productName: productName,
        completedComponents: selectedComponents,
      }));

      // Thông báo đã gửi thành công
      Alert.alert('Thông báo', 'Đã gửi thông tin thành công.');

      // Xóa các thành phần đã chọn sau khi gửi
      setSelectedComponents([]);

      // Chuyển hướng đến màn hình OutputList
      navigation.navigate('OutputList', { productName });
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại sau.');
    }
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
    backgroundColor: COLORS.colorMain, // Đảm bảo COLORS.colorMain được định nghĩa trong tệp Colors
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
