import React from 'react';
import { View, Text, Image, StyleSheet, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/natigation';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailRequest'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailRequest'>;

type Props = {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
};

const DetailRequest: React.FC<Props> = ({ route,navigation }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả yêu cầu</Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <FlatList
        data={item.detail}
        renderItem={({ item }) => <Text style={styles.detail}>{`${item.key}: ${item.info}`}</Text>}
        keyExtractor={(detail, index) => index.toString()}
        contentContainerStyle={styles.detailList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.colorMain,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  detailList: {
    paddingVertical: 10,
  },
});

export default DetailRequest;
