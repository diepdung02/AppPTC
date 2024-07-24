import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearDataScreen = () => {
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully');
      Alert.alert('Success', 'AsyncStorage cleared successfully');
    } catch (error: any) {
      console.error('Error clearing AsyncStorage:', error.message);
      Alert.alert('Error', 'Failed to clear AsyncStorage');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Clear Data" onPress={clearAsyncStorage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClearDataScreen;
