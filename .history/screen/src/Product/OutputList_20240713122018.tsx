import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/natigation';

type Component = {
  id: number;
  name: string;
  isCompleted: boolean;
};

type CompletedComponent = {
  id: number;
  componentIndex: number;
};

type OutputListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OutputList'>;
  route: { params: { completedComponents: CompletedComponent[], components: Component[] } };
};

const OutputList: React.FC<OutputListProps> = ({ navigation, route }) => {
  const { completedComponents, components } = route.params;

  const renderCompletedItem = ({ item }: { item: CompletedComponent }) => {
    const component = components[item.componentIndex];
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{component.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={completedComponents}
        renderItem={renderCompletedItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Quay lại</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default OutputList;
