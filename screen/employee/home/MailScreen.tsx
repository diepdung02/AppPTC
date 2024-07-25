import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from '../../../constants/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/navigation';
import { SearchBar } from "@rneui/themed";

// Fake data for testing
const fakeEmails = [
  {
    id: '1',
    subject: 'Lời nhắc họp',
    message: 'Đừng quên cuộc họp của chúng ta vào lúc 10 giờ sáng ngày mai.',
    to: 'Nguyễn Văn A',
    timestamp: '2024-07-24 09:00 AM',
  },
  {
    id: '2',
    subject: 'Cập nhật dự án',
    message: 'Dự án đang tiến triển tốt và đúng tiến độ.',
    to: 'Trần Thị B',
    timestamp: '2024-07-23 02:00 PM',
  },
  {
    id: '3',
    subject: 'Báo cáo hàng tuần',
    message: 'Vui lòng gửi báo cáo hàng tuần vào cuối ngày hôm nay.',
    to: 'Phạm Văn C',
    timestamp: '2024-07-22 05:00 PM',
  },
  // Add more fake emails as needed
];

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Mail">;
};

const MailScreen: React.FC<Props> = ({ navigation }) => {
  const [emails, setEmails] = useState(fakeEmails);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(fakeEmails);

  useEffect(() => {
    setFilteredData(emails);
  }, [emails]);

  const handleItemPress = (item: typeof fakeEmails[0]) => {
    navigation.navigate("MailDetail", { emailItem: item });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = emails.filter(
      (item) =>
        item.message.toLowerCase().includes(text.toLowerCase()) ||
        item.subject.toLowerCase().includes(text.toLowerCase()) ||
        item.to.toLowerCase().includes(text.toLowerCase())
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
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item)}
          >
            <View style={styles.emailItem}>
              <Text style={styles.emailSubject}>Chủ đề: {item.subject}</Text>
              <Text style={styles.emailMessage}>Nội dung: {truncateText(item.message, 40)}</Text>
              <View style={styles.infor}>
                <Text style={styles.sender}>To: {item.to}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
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
    backgroundColor: COLORS.colorMain,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 5,
  },
  goBack: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 10,
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
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#29D6D6",
    borderRadius: 30,
    padding: 10,
    elevation: 8,
  },
  emailMessage:{
    fontFamily:'CustomFont-Regular',
    fontSize:14,
  }
});

export default MailScreen;
