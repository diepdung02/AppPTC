import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons,FontAwesome } from "@expo/vector-icons";
import COLORS from "../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigator/natigation";
import { SearchBar } from '@rneui/themed';

type DataItem = {
  id: number;
  imageUrl: string;
  title: string;
  detail: { key: string; info: string }[];
};

type RequestMainProps = {
  data: DataItem[];
  navigation: StackNavigationProp<RootStackParamList, 'Overtime'>;
};

const OvertimeScreen: React.FC<RequestMainProps> = ({ data, navigation }) => {

  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <TouchableOpacity onPress={() => navigation.navigate('DetailOvertime', {item})}>
        <Text>{item.title}</Text>
        {item.detail.map((detailItem) => (
          <Text key={detailItem.key}>{detailItem.info}</Text>
        ))}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tăng ca</Text>
      </View>
      <SearchBar
        placeholder='Tìm kiếm'
        inputContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0 }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  centerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  leaveItem: {
    width: 120,
    height: 100,
    margin: 20,
    borderRadius: 3,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  status: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#29D6D6",
  },
  statusText: {
    textAlign: "center",
    color: "black",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default OvertimeScreen;
