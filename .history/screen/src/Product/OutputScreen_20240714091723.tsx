import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Alert, Animated, Easing } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/natigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../../constants/Color';

type Component = {
  id: number;
  name: string;
  isCompleted: boolean;
};

type Product = {
  id: number;
  name: string;
  components: Component[];
};

type OutputScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OutputScreen'>;
  route: { params: { product: Product } };
};

const OutputScreen: React.FC<OutputScreenProps> = ({ navigation, route }) => {
  const { product } = route.params;
  const [selectedComponents, setSelectedComponents] = useState<Component[]>(product.components);

  const handleSelectComponent = (component: Component) => {
    const updatedComponents = selectedComponents.map((c) =>
      c.id === component.id ? { ...c, isCompleted: !c.isCompleted } : c
    );
    setSelectedComponents(updatedComponents);
  };

  const handleSubmit = async () => {
    if (selectedComponents.length === 0) {
      Alert.alert('Chưa chọn thành phần', 'Vui lòng chọn ít nhất một thành phần trước khi gửi.');
      return;
    }

    try {
      await AsyncStorage.setItem('completedComponents', JSON.stringify(selectedComponents));
      Alert.alert('Thông báo', 'Đã gửi thông tin thành công.');

      navigation.navigate('Product', {
        updatedComponents: selectedComponents,
      });
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại sau.');
    }
  };

  const renderComponentItem = ({ item }: { item: Component }) => (
    <TouchableOpacity
      style={[styles.componentItem, item.isCompleted && styles.completedComponent]}
      onPress={() => handleSelectComponent(item)}>
      <Text>{item.name}</Text>
      {item.isCompleted && <FontAwesome name="check-circle" size={20} color="green" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Báo Output</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <FlatList
          data={selectedComponents}
          renderItem={renderComponentItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Gửi báo cáo hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flexGrow: 1,
    width: '100%',
  },
  componentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  completedComponent: {
    backgroundColor: 'lightgreen',
  },
  submitButton: {
    backgroundColor: '#3CB371',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OutputScreen;
