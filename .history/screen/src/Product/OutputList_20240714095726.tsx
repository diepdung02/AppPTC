import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  RootStackParamList,
  Product,
  Component,
} from "../../navigator/navigation";
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

  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: 1,
    name: productName,
    components: completedComponents,
  });

  const [completedProducts, setCompletedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCompletedProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("completedOutput");
        if (storedProducts) {
          const parsedProducts: Product[] = JSON.parse(storedProducts);
          setCompletedProducts(parsedProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert(
          "Error",
          "An error occurred while fetching data. Please try again later."
        );
      }
    };

    fetchCompletedProducts();
  }, []);

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const clearSelectedProduct = () => {
    setSelectedProduct({
      id: 1,
      name: productName,
      components: completedComponents,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Danh sách sản phẩm đã hoàn thành</Text>
      {selectedProduct ? (
        <View style={styles.productDetailContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={clearSelectedProduct}
          >
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.productName}>{selectedProduct.name}</Text>
          <FlatList
            data={selectedProduct.components}
            renderItem={({ item }) => (
              <View style={styles.componentItem}>
                <Text style={styles.componentName}>{item.name}</Text>
                <Text style={styles.componentStatus}>
                  {item.isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <Text style={styles.noDataText}>Không có dữ liệu hoàn thành.</Text>
      )}
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
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  componentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  componentName: {
    fontSize: 16,
    color: "#212529",
  },
  componentStatus: {
    fontSize: 14,
    color: "#6c757d",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  productDetailContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 8,
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default OutputList;
