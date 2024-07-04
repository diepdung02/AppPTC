import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../constants/Color'; 
import { RootStackParamList } from '../navigator/natigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Notifications'>;
};

const UserScreen:React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin nhân viên</Text>
      </View>
      <View style={styles.imgcontainer}>
        <Image source={require('../../assets/avatar.jpg')} style={styles.image}/>
      </View>
      <View style={styles.inforContainer}>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Mã nhân viên: MN787899</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Ngày làm việc: 16-06-2024</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Ngày sinh: 20-07-2024</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Số điệ thoại: 0932499021</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Bộ phận làm việc: ERP</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Chức vụ: INTERN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
            <View style={styles.iconContainer}>
          <Text style={styles.txtInfor}>Chế độ phúc lợi: </Text>
          <View style={styles.icon}>
          <FontAwesome name="arrow-right" size={20} color="black" />
          </View>
          </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Ngôn ngữ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infor}>
          <Text style={styles.txtInfor}>Mã nhân viên: MN787899</Text>
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  goBack:{
    height:60,
    width:60,
    alignItems:'center',
    justifyContent:'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  imgcontainer:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  inforContainer:{
    margin:10,
  
  },
  infor:{
    borderBottomWidth: 2, 
    borderBottomColor: 'black', 
  },
  txtInfor:{
    borderBottomWidth: 2, 
    borderBottomColor: 'black', 
    borderColor:'#ccc',
    fontSize:25,
    padding:5
  },
  iconContainer:{
    flexDirection:'row',
  },
  icon:{
    justifyContent:'center',
    marginLeft:170,
  }
});

export default UserScreen;