import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Component } from '../../navigator/navigation'; // Đảm bảo đúng đường dẫn đến navigation

type CompletedOutput = {
  id: number;
  productName: string;
  completedComponents: Component[];
};

type OutputDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OutputDetail'>;
type OutputDetailScreenRouteProp = RouteProp<RootStackParamList, 'OutputDetail'>;

const OutputDetailScreen = ({ navigation }: { navigation: OutputDetailScreenNavigationProp }) => {
  const route = useRoute<OutputDetailScreenRouteProp>();
  const { productName } = route.params;
  const [completedOutput, setCompletedOutput] = useState<CompletedOutput | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const storedOutput = await AsyncStorage.getItem('completedOutput');
        if (storedOutput) {
          const parsedOutput: CompletedOutput = JSON.parse(storedOutput);
          setCompletedOutput(parsedOutput);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy dữ liệu. Vui lòng thử lại sau.');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.productName}>{productName}</Text>
      {completedOutput ? (
        <FlatList
          data={completedOutput.completedComponents}
          renderItem={({ item }) => (
            <View style={styles.componentItem}>
              <Text style={styles.componentText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>Không có dữ liệu hoàn thành.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  componentItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#dee2e6',
    borderRadius: 8,
  },
  componentText: {
    fontSize: 18,
    color: '#495057',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OutputDetailScreen;
