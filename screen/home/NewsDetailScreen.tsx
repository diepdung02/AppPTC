import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../constants/Color';
import { RootStackParamList } from '../navigator/natigation';




type NewsDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewsDetail'>;

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

type Props = {
  navigation: NewsDetailScreenNavigationProp;
  route: NewsDetailScreenRouteProp;
};

const NewsDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { newsItem } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tin tức</Text>
      </View>
      <View style={styles.content}>
        <Image source={{ uri: newsItem.image }} style={styles.image} />
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.date}>{newsItem.summary}</Text>
        <Text style={styles.price}>{newsItem.date}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  goBack:{
    height:60,
    width:60,
    alignItems:'center',
    justifyContent:'center',
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default NewsDetailScreen;
