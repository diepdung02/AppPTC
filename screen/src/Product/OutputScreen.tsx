<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
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
<<<<<<< HEAD
import { SearchBar } from "@rneui/themed";
import {
  RootStackParamList,
  Component,
  Product,
} from "../../navigator/navigation";
import COLORS from "../../../constants/Color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
=======
import { RootStackParamList, Component, Product } from "../../navigator/navigation";
import COLORS from "../../../constants/Color";
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793

type OutputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OutputScreen"
<<<<<<< HEAD
  
>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, "OutputScreen">;
type ProductScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Product">;
};

const OutputScreen: React.FC<ProductScreenProps> = ({navigation}) => {
=======
>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, "OutputScreen">;

const OutputScreen = ({
  navigation,
}: {
  navigation: OutputScreenNavigationProp;
}) => {
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  const route = useRoute<OutputScreenRouteProp>();
  const {
    productName,
    components,
    productId,
    productClient,
    productImage,
    productPDF,
    productCode,
  } = route.params;
<<<<<<< HEAD
  const [search, setSearch] = useState("");
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);
  const [remainingComponents, setRemainingComponents] = useState<Component[]>(
    []
  );
  const [completedComponents, setCompletedComponents] = useState<Component[]>(
    []
  );

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const storedRemainingComponents = await AsyncStorage.getItem(
          `remainingComponents_${productId}`
        );
        const storedCompletedComponents = await AsyncStorage.getItem(
          `completedComponents_${productId}`
        );

        if (storedRemainingComponents) {
          setRemainingComponents(JSON.parse(storedRemainingComponents));
        } else {
          setRemainingComponents(components); // Initialize with components if nothing stored
        }

        if (storedCompletedComponents) {
          setCompletedComponents(JSON.parse(storedCompletedComponents));
        } else {
          setCompletedComponents([]); // Initialize with empty array if nothing stored
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadComponents();

    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedComponents([]);
    });

    return unsubscribe;
  }, [navigation, productId, components]);

  useEffect(() => {
    setFilteredComponents(
      remainingComponents.filter((component) =>
        component.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, remainingComponents]);

=======
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);

  // Effect to reset selected components when navigating back to OutputScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedComponents([]); // Reset selectedComponents when screen focuses
    });

    return unsubscribe;
  }, [navigation]);

>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
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

<<<<<<< HEAD
  const handleSubmit = async () => {
    if (selectedComponents.length === 0) {
      Alert.alert(
        "Không có bộ phận nào được chọn",
        "Vui lòng chọn ít nhất một bộ phận trước khi gửi."
=======
  const handleRemoveComponent = (componentId: number) => {
    const updatedComponents = components.filter(comp => comp.id !== componentId);
    const updatedSelectedComponents = selectedComponents.filter(comp => comp.id !== componentId);

    setSelectedComponents(updatedSelectedComponents);
    navigation.setParams({
      ...route.params,
      components: updatedComponents,
    });
  };

  const handleSubmit = async () => {
    if (selectedComponents.length === 0) {
      Alert.alert(
        "Chưa chọn thành phần",
        "Vui lòng chọn ít nhất một thành phần trước khi gửi."
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
      );
      return;
    }

    try {
<<<<<<< HEAD
      // Update remaining and completed components
      const updatedRemainingComponents = remainingComponents.filter(
        (comp) => !selectedComponents.some((selComp) => selComp.id === comp.id)
      );
      const updatedCompletedComponents = [
        ...completedComponents,
        ...selectedComponents,
      ];

      // Save updated components to AsyncStorage
      await AsyncStorage.setItem(
        `remainingComponents_${productId}`,
        JSON.stringify(updatedRemainingComponents)
      );
      await AsyncStorage.setItem(
        `completedComponents_${productId}`,
        JSON.stringify(updatedCompletedComponents)
      );

      // Save updated completed products to AsyncStorage
      const storedProducts = await AsyncStorage.getItem("completedOutput");
      let parsedProducts: Product[] = storedProducts
        ? JSON.parse(storedProducts)
        : [];
      const existingProductIndex = parsedProducts.findIndex(
        (prod) => prod.id === productId
      );

      if (existingProductIndex !== -1) {
        parsedProducts[existingProductIndex].components =
          updatedCompletedComponents;
      } else {
        parsedProducts.push({
          id: productId,
          name: productName,
          components: updatedCompletedComponents,
          ClientCode: productClient,
          image: productImage,
          pdfUri: productPDF,
          PTCcode: productCode,
          remainingComponents,
        });
      }

      await AsyncStorage.setItem(
        "completedOutput",
        JSON.stringify(parsedProducts)
      );

      // Update state with updated components
      setRemainingComponents(updatedRemainingComponents);
      setCompletedComponents(updatedCompletedComponents);
      setSelectedComponents([]);

      Alert.alert("Thành công", "Đã gửi báo cáo hoàn thành.");
=======
      // Lấy dữ liệu từ AsyncStorage
      const storedProducts = await AsyncStorage.getItem("completedOutput");
      let parsedProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : [];

      // Đảm bảo parsedProducts là một mảng
      if (!Array.isArray(parsedProducts)) {
        parsedProducts = [];
      }

      // Thêm sản phẩm mới vào danh sách
      parsedProducts.push({
        id: productId,
        name: productName,
        components: selectedComponents,
        ClientCode: productClient,
        image: productImage,
        pdfUri: productPDF,
        PTCcode: productCode,
      });

      // Lưu danh sách đã hoàn thành vào AsyncStorage
      await AsyncStorage.setItem("completedOutput", JSON.stringify(parsedProducts));

      // Thông báo thành công
      Alert.alert("Thông báo", "Đã gửi thông tin thành công.");

      // Xóa các thành phần đã chọn khỏi danh sách components
      const updatedComponents = components.filter(
        (comp) => !selectedComponents.some((selComp) => selComp.id === comp.id)
      );

      // Cập nhật lại route.params.components bằng cách gọi setParams
      navigation.setParams({
        ...route.params,
        components: updatedComponents,
      });

      // Điều hướng quay lại màn hình trước đó
      navigation.goBack();

>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
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
<<<<<<< HEAD
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sản phẩm</Text>
      </View>
      <SearchBar
        placeholder="Tìm kiếm bộ phận..."
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.sectionTitle}>Bộ phận chưa hoàn thành</Text>
      <FlatList
        data={filteredComponents}
=======
      <Text style={styles.productName}>{productName}</Text>
      <FlatList
        data={components}
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
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
<<<<<<< HEAD
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.sectionTitle}>Bộ phận đã hoàn thành</Text>
      <FlatList
        data={completedComponents}
        renderItem={({ item }) => (
          <View style={styles.completedComponent}>
            <Text style={styles.componentText}>{item.name}</Text>
          </View>
=======
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.colorMain,
  },
<<<<<<< HEAD
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  goBack: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  searchBarInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkGray,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginVertical: 8,
  },
=======
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 16,
    textAlign: "center",
  },
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  listContainer: {
    paddingBottom: 16,
  },
  componentButton: {
<<<<<<< HEAD
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  selectedComponentButton: {
    backgroundColor: COLORS.primaryLight,
  },
  componentText: {
    fontSize: 18,
    color: COLORS.text,
  },
  completedComponent: {
    backgroundColor: COLORS.successLight,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
=======
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
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793
  },
});

export default OutputScreen;
