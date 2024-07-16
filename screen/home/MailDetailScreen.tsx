
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/navigation';
import COLORS from '../../constants/Color';


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
      <View style={styles.content}>
        <Text style={styles.label}>To:</Text>
        <Text style={styles.text}>{emailItem.to}</Text>
        <Text style={styles.label}>Chủ đề:</Text>
        <Text style={styles.text}>{emailItem.subject}</Text>
        <Text style={styles.label}>Nội dung:</Text>
        <Text style={styles.text}>{emailItem.message}</Text>
        <Text style={styles.label}>Thời gian gửi mail:</Text>
        <Text style={styles.text}>{emailItem.timestamp}</Text>
      </View>
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
  },
  content: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
});

export default MailDetailScreen;
