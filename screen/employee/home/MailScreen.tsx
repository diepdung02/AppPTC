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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Slice/store";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Mail">;
};

const MailScreen: React.FC<Props> = ({ navigation }) => {
  const emails = useSelector((state: RootState) => state.email.emails);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(emails);

  useEffect(() => {
    setFilteredData(emails);
  }, [emails]);

  const handleItemPress = (item: any) => {
    navigation.navigate("MailDetail", { emailItem: item });
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
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemSubject}>{item.subject}</Text>
              <Text style={styles.itemSender}>{item.message}</Text>
              <Text style={styles.itemDate}>{item.to}</Text>
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
    marginBottom: 1,
    alignItems: "center",
  },
  itemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemSender: {
    fontWeight: "bold",
  },
  itemSubject: {
    color: "#666",
  },
  itemDate: {
    color: "#888",
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
