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
import { RootStackParamList, Product } from "../../navigator/navigation";
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

  useEffect(() => {
    const fetchCompletedProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("completedOutput");
        if (storedProducts) {
          const parsedProducts: Product[] = JSON.parse(storedProducts);
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Danh sách sản phẩm đã hoàn thành</Text>
      <FlatList
        data={completedProducts}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.productItem}
          onPress={() =>
            navigation.navigate("OutputScreen", {
              product: {
                id: item.id,
                name: item.name,
                components: item.components,
                PTCcode: "", // Provide defaults or mock values as needed
                ClientCode: "", // Provide defaults or mock values as needed
                image: "", // Provide defaults or mock values as needed
                pdfUri: "", // Provide defaults or mock values as needed
              },
              productId: item.id,
              productName: item.name,
              components: item.components,
              productClient: "", // Provide defaults or mock values as needed
              productCode: "", // Provide defaults or mock values as needed
              productImage: "", // Provide defaults or mock values as needed
              productPDF: "", // Provide defaults or mock values as needed
            })
          }
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
