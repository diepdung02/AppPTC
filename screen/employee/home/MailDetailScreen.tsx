import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigator/navigation';
import COLORS from '../../../constants/Color';

type MailDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MailDetail"
>;
type MailDetailScreenRouteProp = RouteProp<RootStackParamList, "MailDetail">;

type Props = {
  navigation: MailDetailScreenNavigationProp;
  route: MailDetailScreenRouteProp;
};

const MailDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { emailItem } = route.params;

  // Dữ liệu cho FlatList
  const emailDetails = [
    { label: 'To:', value: emailItem.to },
    { label: 'Chủ đề:', value: emailItem.subject },
    { label: 'Nội dung:', value: emailItem.message },
    { label: 'Thời gian gửi mail:', value: emailItem.timestamp },
  ];

  const renderItem = ({ item }: { item: { label: string; value: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.text}>{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết Email</Text>
      </View>
      <FlatList
        data={emailDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
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
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

export default MailDetailScreen;
