import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Component } from '../../navigator/natigation';
import COLORS from '../../../constants/Color';

type OutputListNavigationProp = StackNavigationProp<RootStackParamList, 'OutputList'>;
type OutputListRouteProp = RouteProp<RootStackParamList, 'OutputList'>;

const OutputList = ({ navigation }: { navigation: OutputListNavigationProp }) => {
  const route = useRoute<OutputListRouteProp>();
  const { completedComponents } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Các thành phần đã hoàn thành</Text>
      <FlatList
        data={completedComponents}
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
