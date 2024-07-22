import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigator/navigation";
import COLORS from "../../../constants/Color";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type DetailRequestScreenRouteProp = RouteProp<
  RootStackParamList,
  "DetailRequest"
>;

type Props = {
  route: DetailRequestScreenRouteProp;
};

const DetailRequest: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Chi tiết tăng ca`,
    });
  }, [navigation]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Đã được duyệt":
        return { backgroundColor: COLORS.green, color: COLORS.black };
      case "Đã bị từ chối":
        return { backgroundColor: COLORS.red, color: COLORS.white };
      case "Đang chờ duyệt":
        return { backgroundColor: COLORS.yellow, color: COLORS.black };
      default:
        return { backgroundColor: COLORS.darkGray, color: COLORS.black };
    }
  };

  const { backgroundColor, color } = getStatusStyle(item.status);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tăng ca</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Mã code: </Text>
        <Text style={styles.detailText}>{item.code}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Ngày bắt đầu nghỉ:</Text>
        <Text style={styles.detailText}>{item.startDate}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Ngày kết thúc nghỉ:</Text>
        <Text style={styles.detailText}>{item.endDate}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Số ngày nghỉ:</Text>
        <Text style={styles.detailText}>{item.dayOffs}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Số ngày phép còn lại:</Text>
        <Text style={styles.detailText}>{item.remainingDaysOff}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Số ngày phép đã sử dụng:</Text>
        <Text style={styles.detailText}>{item.usedDaysOff}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Lí do:</Text>
        <Text style={styles.detailText}>{item.reason}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Trạng thái:</Text>
        <Text
          style={[
            styles.statusText,
            { backgroundColor, color }
          ]}
        >
          {item.status}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
    marginTop: StatusBar.currentHeight || 0,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  goBack: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 10,
  },
  detailLabel: {
    width: 150,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  detailText: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  statusText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: "600",
    borderRadius: 5,
    fontSize: 16, 
  },
});

export default DetailRequest;
