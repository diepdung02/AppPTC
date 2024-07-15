import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color'; // Make sure to use your correct path

type Component = {
  id: number;
  name: string;
  isCompleted: boolean; // Include isCompleted property
};

type Product = {
  id: number;
  name: string;
  image: string;
  components: Component[];
};

type OutputListProps = {
  navigation: any; // Adjust type according to your navigation setup
  route: any; // Adjust type according to your navigation setup
};

const OutputList: React.FC<OutputListProps> = ({ navigation, route }) => {
  const { components }: { components: Component[] } = route.params;

  const renderComponents = (isCompleted: boolean) => {
    return components
      .filter((component) => component.isCompleted === isCompleted)
      .map((component) => (
        <View key={component.id} style={styles.componentItem}>
          <Text style={[styles.componentText, isCompleted ? styles.completedText : styles.incompleteText]}>
            {component.name}
          </Text>
        </View>
      ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách hoàn thành</Text>
      </View>
      <View style={styles.list}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đã hoàn thành</Text>
          {renderComponents(true)}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chưa hoàn thành</Text>
          {renderComponents(false)}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: COLORS.colorMain, // Ensure this color exists in your Color constants
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  componentItem: {
    paddingVertical: 5,
  },
  componentText: {
    fontSize: 16,
  },
  completedText: {
    color: 'green',
  },
  incompleteText: {
    color: 'red',
  },
});

export default OutputList;
