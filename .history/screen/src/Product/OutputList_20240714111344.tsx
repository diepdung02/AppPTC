import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Component } from "../../navigator/navigation";
import COLORS from "../../../constants/Color";

type OutputListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OutputList"
>;
type OutputListRouteProp = RouteProp<RootStackParamList, "OutputList">;

const OutputList = ({
  navigation,
}: {
  navigation: OutputListNavigationProp;
}) => {
  const route = useRoute<OutputListRouteProp>();
  const { productName, completedComponents } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Danh sách sản phẩm đã hoàn thành</Text>
      <FlatList
        data={completedComponents}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.componentCount}>
              {item.components.length} thành phần đã hoàn thành
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.noDataText}>Không có dữ liệu hoàn thành.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.colorMain,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  productItem: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  componentCount: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 8,
  },
  noDataText: {
    fontSize: 16,
    color: "#495057",
    textAlign: "center",
  },
});

export default OutputList;
