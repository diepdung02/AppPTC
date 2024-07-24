import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../navigator/navigation';
import COLORS from '../../../constants/Color';

type NewsDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NewsDetail"
>;

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, "NewsDetail">;

type Props = {
  navigation: NewsDetailScreenNavigationProp;
  route: NewsDetailScreenRouteProp;
};

const NewsDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { newsItem } = route.params;

  const renderDetailItem = ({ item }: { item: { time: string, activities: string[] } }) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailTime}>{item.time}</Text>
      {item.activities.map((activity, idx) => (
        <Text key={idx} style={styles.detailActivity}>- {activity}</Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tin tức</Text>
      </View>
      <View style={styles.content}>
        <Image source={{ uri: newsItem.image }} style={styles.image} />
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.date}>{newsItem.date}</Text>
        <FlatList
          data={newsItem.details}
          renderItem={renderDetailItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.detailsContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    padding: 10,
    elevation: 4, 
  },
  goBack: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#2c3e50', 
    fontFamily:'CustomFont-Regular'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontFamily:'CustomFont-Regular'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db', 
    marginBottom: 10,
    fontFamily:'CustomFont-Regular'
  },
  date: {
    fontSize: 16,
    color: '#7f8c8d', 
    marginBottom: 15,
    fontFamily:'CustomFont-Regular'
  },
  detailsContainer: {
    flex: 1,
    fontFamily:'CustomFont-Regular'
  },
  detailItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff', 
    borderRadius: 8,
    elevation: 2, 
    fontFamily:'CustomFont-Regular'
  },
  detailTime: {
    fontWeight: 'bold',
    color: '#2c3e50', 
    marginBottom: 5,
    fontFamily:'CustomFont-Regular'
  },
  detailActivity: {
    fontSize: 16,
    color: '#7f8c8d', 
    marginLeft: 5,
    fontFamily:'CustomFont-Regular'
  },
});

export default NewsDetailScreen;
