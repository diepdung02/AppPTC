import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
<<<<<<< HEAD
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  Component,
  Product,
} from "../../navigator/navigation";


type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Product">;
};

const OutputList: React.FC<ProductScreenProps> = ({ navigation }) => {
  const [completedProducts, setCompletedProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

=======
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

>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  useEffect(() => {
    const fetchCompletedProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("completedOutput");
        if (storedProducts) {
          let parsedProducts: Product[] = JSON.parse(storedProducts);
<<<<<<< HEAD
          if (!Array.isArray(parsedProducts)) {
            parsedProducts = [];
          }
          setCompletedProducts(parsedProducts);
          setFilteredData(parsedProducts); // Set filtered data initially
        } else {
          console.log("Không tìm thấy sản phẩm đã lưu.");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        Alert.alert(
          "Lỗi",
          "Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau."
        );
      } finally {
        setIsLoading(false); // Set loading state to false when done fetching
=======
          // Ensure parsedProducts is an array
          if (!Array.isArray(parsedProducts)) {
            parsedProducts = []; // If it's not an array, initialize as an empty array
          }
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
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
      }
    };

    fetchCompletedProducts();
  }, []);

<<<<<<< HEAD
  const toggleProductDetails = (id: number) => {
    setSelectedProductId(selectedProductId === id ? null : id);
  };

  const handleDeleteProduct = async (productId: number, productName: string) => {
    try {
      const confirmed = await confirmDelete(productName);
      if (!confirmed) return;

      const updatedProducts = completedProducts.filter((product) => product.id !== productId);
      await AsyncStorage.setItem("completedOutput", JSON.stringify(updatedProducts));
      setCompletedProducts(updatedProducts);
      setFilteredData(updatedProducts); // Update filtered data after delete
      setSelectedProductId(null);
      Alert.alert("Thành công", `Đã xóa sản phẩm "${productName}".`);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại sau.");
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = completedProducts.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.ClientCode.toLowerCase().includes(text.toLowerCase()) ||
      item.PTCcode.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const confirmDelete = (productName: string): Promise<boolean> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Xác nhận",
        `Bạn có chắc chắn muốn xóa sản phẩm "${productName}"?`,
        [
          {
            text: "Hủy bỏ",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "Xóa",
            onPress: () => resolve(true),
            style: "destructive",
          },
        ]
      );
    });
  };

  const renderComponent = ({ item }: { item: Component }) => (
    <View style={styles.componentContainer}>
      <Text style={styles.componentName}>{item.name}</Text>
    </View>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => toggleProductDetails(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>Tên sản phẩm: {item.name}</Text>
          <Text style={styles.itemText}>Client Code: {item.ClientCode}</Text>
          <Text style={styles.itemText}>PTC Code: {item.PTCcode}</Text>
        </View>
      </TouchableOpacity>
      {selectedProductId === item.id && (
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Bộ phận đã hoàn thành</Text>
          <FlatList
            data={item.components}
            renderItem={renderComponent}
            keyExtractor={(component) => component.id.toString()}
          />
          {/* <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteProduct(item.id, item.name)}
          >
            <Text style={styles.deleteButtonText}>Xóa sản phẩm</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Output</Text>
      </View>
      <SearchBar
        placeholder="Tìm kiếm"
        onChangeText={handleSearch}
        value={search}
        inputContainerStyle={{ backgroundColor: "white" }}
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      {filteredData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Không có dữ liệu sản phẩm hoàn thành.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  componentContainer: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  componentName: {
    fontSize: 16,
    color: "#333",
  },
  itemContainer: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  goBack: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  },
});

=======
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
    padding: 16,
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
});

>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
export default OutputList;
