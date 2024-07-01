import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/natigation';

type DataItem = {
  id: number;
  imageUrl: string;
  title: string;
  detail: { key: string; info: string }[];
};

type ProductScreenProps = {
  data: DataItem[];
  navigation: StackNavigationProp<RootStackParamList, 'Product'>;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ data, navigation }) => {
  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item })}>
        <Text>{item.title}</Text>
        {item.detail.map((detailItem) => (
          <Text key={detailItem.key}>{detailItem.info}</Text>
        ))}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder='Tìm kiếm'
        inputContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0 }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
  },
});

export default ProductScreen;
