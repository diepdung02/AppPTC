import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from '../../constants/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/natigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type EmailItem = {
  id: string;
  sender: string;
  subject: string;
  date: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Mail'>;
};

const emailData: EmailItem[] = [
  {
    id: "1",
    sender: "nguyenvana@example.com",
    subject: "Thông báo báo cáo tháng 6",
    date: "04-05-2024",
  },
  {
    id: "2",
    sender: "tranthib@example.com",
    subject: "Kế hoạch tổ chức sự kiện",
    date: "03-07-2024",
  },
  {
    id: "3",
    sender: "levanc@example.com",
    subject: "Lịch họp tuần sau",
    date: "02-07-2024",
  },
];

const MailScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(emailData);

  const handleItemPress = (item: EmailItem) => {
    navigation.navigate('MailDetail', { emailItem: item });
  };

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mail</Text>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>

            <View style={styles.itemTextContainer}>
              <Text style={styles.itemSender}>{item.sender}</Text>
              <Text style={styles.itemSubject}>{item.subject}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
       <TouchableOpacity
        onPress={() => navigation.navigate("SendMail")}
        style={styles.addButton}
      >
        <MaterialCommunityIcons name="plus-circle" size={50} color="white" />
      </TouchableOpacity>
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
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 1,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemSender: {
    fontWeight: 'bold',
  },
  itemSubject: {
    color: '#666',
  },
  itemDate: {
    color: '#888',
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#29D6D6",
    borderRadius: 30,
    padding: 10,
    elevation: 8,
  },
});

export default MailScreen;
