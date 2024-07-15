<<<<<<< HEAD
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../constants/Color';
import { RootStackParamList } from '../navigator/navigation';
=======
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../../constants/Color";
import { RootStackParamList } from "../navigator/navigation";
>>>>>>> 253f1e9da31d428032ead5bf14f279c73740b793

type NewsDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NotificationDetail"
>;

type NewsDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "NotificationDetail"
>;

type Props = {
  navigation: NewsDetailScreenNavigationProp;
  route: NewsDetailScreenRouteProp;
};

const NotificationDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { notification } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={{ uri: notification.image }} style={styles.image} />
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.date}>{notification.summary}</Text>
        <Text style={styles.price}>{notification.date}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  goBack: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default NotificationDetailScreen;
