import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigator/navigation"; 
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/overtime/store";
import { SearchBar } from '@rneui/themed';
import {
  OvertimeRequest,
} from "../../../redux/overtime/overtimeSlice";

type OvertimeItemProps = {
  item: OvertimeRequest;
  navigation: StackNavigationProp<RootStackParamList, "Overtime">;
};

const OvertimeItem: React.FC<OvertimeItemProps> = ({ item, navigation }) => {

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailOvertime", { item })}
      >
        <View style={styles.detail}>
          <Text style={styles.detailText}>Ngày tăng ca:</Text>
          <Text style={styles.itemText}>{item.startDate.toString()}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Giờ bắt đầu:</Text>
          <Text style={styles.itemText}>{item.startTime}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Giờ kết thúc:</Text>
          <Text style={styles.itemText}>{item.endTime}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Lí do:</Text>
          <Text style={styles.itemText}>{item.reason}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>Trạng thái:</Text>
          <Text style={styles.itemText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const OvertimeScreen: React.FC<{ navigation: StackNavigationProp<RootStackParamList, "Overtime">;
}> = ({ navigation }) => {
  const overtimeRequests = useSelector(
    (state: RootState) => state.overtime.requests
  );
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<OvertimeRequest[]>(overtimeRequests || []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!overtimeRequests) {
      setFilteredData([]);
      return;
    }
    const filtered = overtimeRequests.filter(item => {
      const dateMatch = item.startDate.toLowerCase().includes(text.toLowerCase());
      const TimeMatch = item.startTime.toLowerCase().includes(text.toLowerCase());
      const ReasonMatch = item.reason.toLowerCase().includes(text.toLowerCase());
      const StatusMatch = item.status.toLowerCase().includes(text.toLowerCase());
      return dateMatch || TimeMatch || ReasonMatch || StatusMatch;
    });
    setFilteredData(filtered);
  };



  const renderItem = ({ item }: { item: OvertimeRequest }) => (
    <OvertimeItem item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tăng ca</Text>
      </View>
      <SearchBar
        placeholder="Tìm kiếm"
        inputContainerStyle={{ backgroundColor: 'white' }}
        value={search}
        onChangeText={handleSearch}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("OvertimeRequest")}
        style={styles.addButton}
      >
        <FontAwesome name="plus-circle" size={50} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight:'600'
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
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  goBack: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: 80,
    height: 30,
    marginLeft: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  statusText: {
    textAlign: "center",
    fontSize: 12,
  },
  itemText:{
    fontSize:18,
    paddingLeft:10,
    fontStyle: "italic",
  },
  detail:{
    flexDirection:'row'
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default OvertimeScreen;
