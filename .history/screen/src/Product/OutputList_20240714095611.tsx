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
  const { productName } = route.params;
  const [completedProducts, setCompletedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchCompletedProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("completedOutput");
        if (storedProducts) {
          const parsedProducts: Product[] = JSON.parse(storedProducts);
          console.log("Parsed Products:", parsedProducts);
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
    setSelectedProduct(null);
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
          <Text style={styles.componentCount}>
            {selectedProduct.components.length} thành phần đã hoàn thành
          </Text>
          {/* Hiển thị chi tiết các thành phần hoàn thành ở đây nếu cần */}
        </View>
      ) : (
        <FlatList
          data={completedProducts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productItem}
              onPress={() => selectProduct(item)}
            >
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.componentCount}>
                {item.components.length} thành phần đã hoàn thành
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
      {completedProducts.length === 0 && (
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
  componentCount: {
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
