import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Product } from '../../navigator/natigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color';

type OutputScreenRouteProp = RouteProp<RootStackParamList, 'OutputScreen'>;

const OutputScreen = () => {
  const route = useRoute<OutputScreenRouteProp>();
  const navigation = useNavigation();
  const { product } = route.params;

  const [completedComponents, setCompletedComponents] = useState<number[]>([]);

  const toggleComponentCompletion = (componentId: number) => {
    if (completedComponents.includes(componentId)) {
      setCompletedComponents(completedComponents.filter(id => id !== componentId));
    } else {
      setCompletedComponents([...completedComponents, componentId]);
    }
  };

  const handleSendReport = () => {
    navigation.navigate('OutputList', {
      completedComponents: completedComponents.map(id => {
        const component = product.components.find(comp => comp.id === id);
        return component ? { ...component, isCompleted: true } : null;
      }).filter(Boolean),
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleComponentCompletion(item.id)} style={styles.componentItem}>
      <FontAwesome name={completedComponents.includes(item.id) ? "check-square-o" : "square-o"} size={24} color="black" />
      <Text style={styles.componentText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name} - Báo cáo hoàn thành</Text>
      </View>
      <FlatList
        data={product.components}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendReport}>
        <Text style={styles.sendButtonText}>Gửi báo cáo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: COLORS.colorMain,
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
  list: {
    paddingHorizontal: 10,
  },
  componentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  componentText: {
    fontSize: 16,
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: COLORS.colorSecondary,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OutputScreen;
