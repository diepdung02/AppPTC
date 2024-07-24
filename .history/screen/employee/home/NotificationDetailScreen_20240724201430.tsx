import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../navigator/navigation';

type NotificationDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NotificationDetail"
>;

type NotificationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "NotificationDetail"
>;

type Props = {
  navigation: NotificationDetailScreenNavigationProp;
  route: NotificationDetailScreenRouteProp;
};

const NotificationDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { notification } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết thông báo</Text>
      </View>
      <View style={styles.content}>
        <Image source={{ uri: notification.image }} style={styles.image} />
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.date}>{notification.summary}</Text>
        <Text style={styles.date}>{notification.date}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1', // Light Gray
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White
    padding: 10,
    elevation: 4, // Shadow for depth
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
    color: '#2c3e50', // Dark Gray
    fontFamily:'CustomFont-Regular',
  },
  content: {
    padding: 20,
    fontFamily:'CustomFont-Regular'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db', // Blue
    marginBottom: 10,
    fontFamily:'CustomFont-Regular'
  },
  date: {
    fontSize: 16,
    color: '#7f8c8d', // Gray
    marginBottom: 10,
    fontFamily:'CustomFont-Regular'
  },
});

export default NotificationDetailScreen;
