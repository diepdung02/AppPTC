import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
  route: { params: { completedComponents?: CompletedComponent[], components: Component[] } };
};

const OutputList: React.FC<OutputListProps> = ({ navigation, route }) => {
  const { completedComponents = [], components } = route.params;

  const renderCompletedComponents = () => {
    return completedComponents.map((completedComponent) => {
      const { id, componentIndex } = completedComponent;
      const { name, isCompleted } = components[componentIndex];

      return (
        <View key={id} style={styles.completedComponent}>
          <Text style={styles.completedComponentName}>{name}</Text>
          <Text style={styles.completedComponentStatus}>{isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách hoàn thành</Text>
      </View>
      <View style={styles.completedList}>
        {renderCompletedComponents()}
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
  completedList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  completedComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  completedComponentName: {
    fontSize: 16,
  },
  completedComponentStatus: {
    fontSize: 16,
    color: '#666',
  },
});

export default OutputList;
