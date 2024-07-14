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
import { Product } from "../../navigator/navigation"; // Đảm bảo đúng đường dẫn đến navigation
import COLORS from "../../../constants/Color"; // Đảm bảo đúng đường dẫn đến Colors

const OutputList = () => {
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
        } else {
          console.log("No stored products found.");
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
          <Text style={styles.productName}>{selectedProduct.name}</Text>
          <Text style={styles.productInfo}>
            PTC Code: {selectedProduct.PTCcode}
          </Text>
          <Text style={styles.productInfo}>
            Client Code: {selectedProduct.ClientCode}
          </Text>
          <Text style={styles.productInfo}>Components:</Text>
          {selectedProduct.components.map((component, index) => (
            <Text key={index} style={styles.componentName}>
              {component.name} - {component.isCompleted ? "Completed" : "Pending"}
            </Text>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={clearSelectedProduct}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
          ListEmptyComponent={
            <Text style={styles.noDataText}>Không có dữ liệu hoàn thành.</Text>
          }
        />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: "#495057",
  },
  componentName: {
    fontSize: 14,
    color: "#495057",
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#6c757d",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OutputList;
