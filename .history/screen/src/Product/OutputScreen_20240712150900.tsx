import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/natigation'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Component = {
  id: number;
  name: string;
  isCompleted: boolean;
};

type OutputScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OutputScreen'>;
  route: { params: { productId: number; components: Component[] } };
};

const OutputScreen: React.FC<OutputScreenProps> = ({ navigation, route }) => {
  const { productId, components } = route.params;

  const renderComponentItem = ({ item }: { item: Component }) => {
    return (
      <View style={styles.componentItem}>
        <Text style={styles.componentText}>{item.name}</Text>
        <Text style={styles.componentStatus}>{item.isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'}</Text>
      </View>
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
        <Text style={styles.productName}>Sản phẩm: {productId}</Text>
        <FlatList
          data={components}
          renderItem={renderComponentItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.componentList}
        />
      </View>
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
  componentText: {
    fontSize: 16,
  },
  componentStatus: {
    fontSize: 16,
    color: '#666',
  },
});

export default OutputScreen;
