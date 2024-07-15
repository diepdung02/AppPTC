import React, { useState } from "react";
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
import { RootStackParamList, Component, Product } from "../../navigator/navigation";
import COLORS from "../../../constants/Color";

type OutputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OutputScreen"
>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, "OutputScreen">;

const OutputScreen = ({
  navigation,
}: {
  navigation: OutputScreenNavigationProp;
}) => {
  const route = useRoute<OutputScreenRouteProp>();
  const { productName, components, productId } = route.params;
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);
  const [completedProducts, setCompletedProducts] = useState<Product[]>([]);

  const handleSelectComponent = (component: Component) => {
    const index = selectedComponents.findIndex((c) => c.id === component.id);
    if (index !== -1) {
      setSelectedComponents(
        selectedComponents.filter((item) => item.id !== component.id)
      );
    } else {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const handleSubmit = async () => {
    if (selectedComponents.length === 0) {
      Alert.alert(
        "Chưa chọn thành phần",
        "Vui lòng chọn ít nhất một thành phần trước khi gửi."
      );
      return;
    }

    try {
      // Lưu dữ liệu vào AsyncStorage
      const storedProducts = await AsyncStorage.getItem("completedOutput");
      let parsedProducts: Product[] = [];
      if (storedProducts) {
        parsedProducts = JSON.parse(storedProducts);
      }

      parsedProducts.push({
        id: productId,
        name: productName,
        components: selectedComponents,
        ClientCode: productCode,
        image: productImage,
        pdfUri: productPDF
      });

      await AsyncStorage.setItem("completedOutput", JSON.stringify(parsedProducts));

      // Cập nhật danh sách sản phẩm đã hoàn thành trong state để hiển thị ngay lập tức
      setCompletedProducts(parsedProducts);

      // Thông báo đã gửi thành công
      Alert.alert("Thông báo", "Đã gửi thông tin thành công.");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.productName}>{productName}</Text>
      <FlatList
        data={components}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.componentButton,
              selectedComponents.some((c) => c.id === item.id) &&
                styles.selectedComponentButton,
            ]}
            onPress={() => handleSelectComponent(item)}
          >
            <Text style={styles.componentText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi</Text>
      </TouchableOpacity>

      {/* Hiển thị danh sách sản phẩm đã hoàn thành */}
      {completedProducts.length > 0 && (
        <View style={styles.completedProductsContainer}>
          <Text style={styles.completedProductsTitle}>Sản phẩm đã hoàn thành:</Text>
          {completedProducts.map((product) => (
            <View key={product.id} style={styles.completedProductItem}>
              <Text style={styles.completedProductName}>{product.name}</Text>
              <Text style={styles.completedProductComponents}>
                {product.components.length} thành phần đã hoàn thành
              </Text>
            </View>
          ))}
        </View>
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
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  componentButton: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#dee2e6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedComponentButton: {
    backgroundColor: "#a5d6a7",
  },
  componentText: {
    fontSize: 18,
    color: "#495057",
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  completedProductsContainer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#ced4da",
    paddingTop: 16,
  },
  completedProductsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
    textAlign: "center",
  },
  completedProductItem: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  completedProductName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  completedProductComponents: {
    fontSize: 14,
    color: "#6c757d",
  },
});

export default OutputScreen;
