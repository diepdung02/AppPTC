import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
import { Component, Product } from "../../../navigator/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../../../../constants/Color";

interface OutputListProps {
  navigation: any; 
}

const OutputList: React.FC<OutputListProps> = ({ navigation }) => {
  const [completedProducts, setCompletedProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem("completedOutput");
        if (storedProducts) {
          let parsedProducts: Product[] = JSON.parse(storedProducts);
          if (!Array.isArray(parsedProducts)) {
            parsedProducts = [];
          }
          setCompletedProducts(parsedProducts);
          setFilteredData(parsedProducts); 
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
        setIsLoading(false); 
      }
    };

    fetchCompletedProducts();
  }, []);

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
          <Text style={styles.itemText}>PTC Code: {item.PTCcode}</Text>
          <Text style={styles.itemText}>Client Code: {item.ClientCode}</Text>
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
    backgroundColor: COLORS.colorMain,
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
    borderColor: COLORS.border,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    fontFamily:'CustomFont-Regular'
  },
  itemName: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontFamily:'CustomFont-Bold'
  },
  itemText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
    fontFamily:'CustomFont-Regular'
  },
  detailsContainer: {
    backgroundColor: COLORS.colorMain,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    fontFamily:'CustomFont-Regular'
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
    fontFamily:'CustomFont-Regular'
  },
  componentContainer: {
    backgroundColor: COLORS.lightGray,
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
    fontFamily:'CustomFont-Bold'
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    fontFamily:'CustomFont-Regular'
  },
});

export default OutputList;
