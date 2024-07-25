import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Slice/store'; // Adjust the path as necessary
import { SearchBar } from "@rneui/themed";
import COLORS from '../../constants/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/navigation';

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Mail">;
  };

const ManagerMailScreen: React.FC<Props> = ({navigation}) => {
    const emails = useSelector((state: RootState) => state.email.emails);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(emails);
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleItemPress = (item: any) => {
    navigation.navigate("ManagerMailDetail", { emailItem: item });
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = emails.filter(
      (email) =>
        email.subject.toLowerCase().includes(text.toLowerCase()) ||
        email.message.toLowerCase().includes(text.toLowerCase()) ||
        email.timestamp.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm"
        inputContainerStyle={{ backgroundColor: "white" }}
        value={search}
        onChangeText={handleSearch}
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      <FlatList
        data={search ? filteredData : emails.filter(email => email.to === 'manager@example.com')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <View style={styles.emailItem}>
              <Text style={styles.emailSubject}>Chủ đề: {item.subject}</Text>
              <Text style={styles.emailMessage}>Nội dung: {truncateText(item.message, 100)}</Text>
              <View style={styles.infor}>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
                <Text style={styles.sender}>By: Diệp Minh Dũng(ERP)</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  emailItem: {
    padding: 10,
  },
  emailSubject: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontFamily:'CustomFont-Bold',
    alignSelf:'center'
  },
  department: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontFamily:'CustomFont-Regular'
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.date,
    fontFamily:'CustomFont-Regular'
  },
  sender: {
    fontSize: 12,
    color: COLORS.date,
    fontFamily:'CustomFont-Italic'
  },
  infor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emailMessage:{
    fontFamily:'CustomFont-Regular',
    fontSize:14,
  }
});

export default ManagerMailScreen;
