import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Product } from "../../navigator/navigation";
import COLORS from "../../../constants/Color";

type OutputListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OutputList"
>;
type OutputListRouteProp = RouteProp<RootStackParamList, "OutputList">;

interface OutputListProps {
  navigation: OutputListNavigationProp;
  route: OutputListRouteProp;
}

const OutputList: React.FC<OutputListProps> = ({ navigation, route }) => {
  const { completedProducts } = route.params;

  const handleProductPress = (product: Product) => {
    // Xử lý khi người dùng nhấn vào sản phẩm
    // Ví dụ: điều hướng đến một màn hình chi tiết sản phẩm
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item)}
    >
      <Text style={styles.productName}>{item.name}</Text>
      {/* Hiển thị các thông tin khác của sản phẩm */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={completedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    padding: 16,
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default OutputList;
