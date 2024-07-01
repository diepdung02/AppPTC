import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/Color';
import { ApiResponse, fetchUser } from '../../API'; 
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/natigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>; 
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [userData, setUserData] = useState<any>({});
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = '1'; 
      const response: ApiResponse<any> = await fetchUser(userId);
      if (response.success) {
        setUserData(response.data); 
      } else {
        console.error('Lỗi khi lấy dữ liệu người dùng:', response.error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString();
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const [search, setSearch] = useState("");
  const updateSearch = (search: React.SetStateAction<string>) => {
    setSearch(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar
        placeholder='Tìm kiếm '
        inputContainerStyle = {{backgroundColor:"white"}}
        
          containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 2, borderTopColor: 'transparent' }}
        onChangeText={updateSearch}
        value={search}
        ></SearchBar>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity >
          <Image source={require('../../assets/check .png')} style={styles.icon} />
          <Text style={styles.txt} >Kiểm hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
          <Image source={require('../../assets/Product.png')} style={styles.icon} />
          <Text style={styles.txt}>Sản Phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/Output.png')} style={styles.icon} />
          <Text style={styles.txt}>Output</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RequestMain')}>
          <Image source={require('../../assets/leave 1.png')} style={styles.icon} />
          <Text style={styles.txt}>Nghỉ phép</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/Error.png')} style={styles.icon} />
          <Text style={styles.txt}>Báo lỗi</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/ot request.png')} style={styles.icon} />
          <Text style={styles.txt}>Tăng ca</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/Group 23.png')} style={styles.icon} />
          <Text style={styles.txt}>Lịch</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/evaluate.png')} style={styles.icon} />
          <Text style={styles.txt}>Đánh giá</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/gmail.png')} style={styles.icon} />
          <Text style={styles.txt}>Thư</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/Group 12573.png')} style={styles.icon} />
          <Text style={styles.txt}>Giấy ra cổng</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={require('../../assets/Group 12574.png')} style={styles.icon} />
          <Text style={styles.txt}>Rời khỏi bộ phận</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{currentTime}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  avatar: {
    width: 75,
    height: 75,
    marginTop: 70,
    marginLeft: 20,
  },
  inforContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtInfor: {
    marginTop: 70,
    paddingLeft: 10,
  },
  txtName: {
    fontSize: 20,
  },
  txtDept: {
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
  },
  icon: {
    width: 75,
    height: 75,
    margin: 20,
  },
  txt:{
    textAlign:"center",
  },
  timeContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  timeText: {
    fontSize: 16,
    color: 'red',
  },
});

export default HomeScreen;
