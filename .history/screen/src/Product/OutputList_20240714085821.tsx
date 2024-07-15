import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList, Component } from '../../navigator/natigation';
import COLORS from '../../../constants/Color';

type OutputListNavigationProp = StackNavigationProp<RootStackParamList, 'OutputList'>;
type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = ({ navigation, route }: { navigation: OutputListNavigationProp; route: OutputListRouteProp }) => {
  const { completedComponents } = route.params || { completedComponents: [] }; // Default to empty array if undefined
  const [storedComponents, setStoredComponents] = useState<Component[]>([]);

  // Load completed components from AsyncStorage when the component mounts or re-focuses
  useFocusEffect(
    React.useCallback(() => {
      const loadCompletedComponents = async () => {
        try {
          const storedComponents = await AsyncStorage.getItem('completedComponents');
          if (storedComponents) {
            setStoredComponents(JSON.parse(storedComponents));
          }
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
          Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
        }
      };
      loadCompletedComponents();
    }, [])
  );

  // Update stored components when completedComponents change
  useEffect(() => {
    if (completedComponents.length > 0) {
      setStoredComponents(completedComponents);
      AsyncStorage.setItem('completedComponents', JSON.stringify(completedComponents))
        .then(() => {
          console.log('Dữ liệu đã được lưu thành công');
        })
        .catch((error) => {
          console.error('Lỗi khi lưu dữ liệu:', error);
          Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại sau.');
        });
    }
  }, [completedComponents]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Các thành phần đã hoàn thành</Text>
      <FlatList
        data={storedComponents}
        renderItem={({ item }) => (
          <View style={styles.componentItem}>
            <Text style={styles.componentText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
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
});

export default OutputList;
