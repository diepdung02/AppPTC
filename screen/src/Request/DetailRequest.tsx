import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/navigation'; // Ensure correct import path
import COLORS from '../../../constants/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type DetailOvertimeScreenRouteProp = RouteProp<RootStackParamList, 'DetailRequest'>;

type Props = {
  route: DetailOvertimeScreenRouteProp;
};

const DetailRequest: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Chi tiết tăng ca`,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tăng ca</Text>
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
        <Text style={styles.detailLabel}>Loại nghỉ phép:</Text>
        <Text style={styles.detailText}>{item.leaveType}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Lí do:</Text>
        <Text style={styles.detailText}>{item.reason}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Trạng thái:</Text>
        <Text style={styles.detailText}>{getStatusText(item.status)}</Text>
      </View>
    </SafeAreaView>
  );
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'approved':
      return 'Đã duyệt';
    case 'rejected':
      return 'Không được duyệt';
    default:
      return 'Đang chờ duyệt';
  }
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
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  goBack: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 10,
  },
  detailLabel: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detailText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});

export default DetailRequest;
