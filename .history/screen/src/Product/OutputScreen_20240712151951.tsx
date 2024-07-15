import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/natigation'; // Corrected import path
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Component = {
  id: number;
  name: string;
  isCompleted: boolean;
};

type OutputScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OutputScreen'>;
  route: { params: { productId: number; components: Component[]; name:string; productName:string } };
};

const OutputScreen: React.FC<OutputScreenProps> = ({ navigation, route }) => {
  const { productName, components } = route.params;
  const [selectedComponents, setSelectedComponents] = useState<number[]>([]);

  const toggleSelectComponent = (componentId: number) => {
    const isSelected = selectedComponents.includes(componentId);
    if (isSelected) {
      setSelectedComponents((prevSelected) => prevSelected.filter((id) => id !== componentId));
    } else {
      setSelectedComponents((prevSelected) => [...prevSelected, componentId]);
    }
  };

  const handleComplete = () => {
    if (selectedComponents.length === 0) {
      Alert.alert('Thông báo', 'Bạn chưa chọn bất kỳ bộ phận nào để gửi hoàn thành.');
      return;
    }

    // Here you can handle the completion logic, such as sending the completed components
    // For demonstration, let's just alert the selected components
    Alert.alert('Thông báo', `Đã gửi hoàn thành các bộ phận: ${}`);

    // Clear selected components after completion
    setSelectedComponents([]);
  };

  const renderComponentItem = ({ item }: { item: Component }) => {
    const isSelected = selectedComponents.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.componentItem, isSelected && styles.selectedComponentItem]}
        onPress={() => toggleSelectComponent(item.id)}
      >
        <Text style={styles.componentText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Báo Output</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Sản phẩm: {productName}</Text>
        <FlatList
          data={components}
          renderItem={renderComponentItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.componentList}
        />
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={handleComplete} disabled={selectedComponents.length === 0}>
        <Text style={styles.sendButtonText}>Gửi hoàn thành</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ffffff',
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
  productInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  componentList: {
    marginTop: 10,
  },
  componentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedComponentItem: {
    backgroundColor: '#d1e7dd',
  },
  componentText: {
    fontSize: 16,
  },
  componentStatus: {
    fontSize: 16,
    color: '#666',
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  sendButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default OutputScreen;
