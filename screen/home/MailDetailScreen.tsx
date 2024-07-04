import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/natigation';

type EmailItem = {
  id: string;
  sender: string;
  subject: string;
  date: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'MailDetail'>;
  route: RouteProp<RootStackParamList, 'MailDetail'>;
};

const MailDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { emailItem } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết email</Text>
      </View>
      <View style={styles.detailContainer}>
        {/* <Image source={require('../../assets/email-icon.png')} style={styles.image} /> */}
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailSender}>{emailItem.sender}</Text>
          <Text style={styles.detailSubject}>{emailItem.subject}</Text>
          <Text style={styles.detailDate}>{emailItem.date}</Text>
        </View>
      </View>
      {/* Hiển thị nội dung email hoặc các phần khác */}
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
    marginVertical:5,
  },
  goBack:{
    height:60,
    width:60,
    alignItems:'center',
    justifyContent:'center',
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  detailSender: {
    fontWeight: 'bold',
  },
  detailSubject: {
    color: '#666',
  },
  detailDate: {
    color: '#888',
  },
});

export default MailDetailScreen;
