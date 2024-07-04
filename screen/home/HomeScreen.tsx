import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
          inputContainerStyle={{ backgroundColor: "white" }}
          containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 1, borderTopColor: 'transparent' }}
          onChangeText={updateSearch}
          value={search}
        />
      </View>
      
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={require('../../assets/checklist.png')} style={styles.icon} />
            <Text style={styles.txt}>Kiểm hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Product')}>
            <Image source={require('../../assets/product.png')} style={styles.icon} />
            <Text style={styles.txt}>Sản Phẩm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={require('../../assets/output.png')} style={styles.icon} />
            <Text style={styles.txt}>Output</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('RequestMain')}>
            <Image source={require('../../assets/leave.png')} style={styles.icon} />
            <Text style={styles.txt}>Nghỉ phép</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={require('../../assets/error.png')} style={styles.icon} />
            <Text style={styles.txt}>Báo lỗi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Overtime')}>
            <Image source={require('../../assets/overtime.png')} style={styles.icon} />
            <Text style={styles.txt}>Tăng ca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Schedule')}>
            <Image source={require('../../assets/calendar.png')} style={styles.icon} />
            <Text style={styles.txt}>Lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={require('../../assets/evaluate.png')} style={styles.icon} />
            <Text style={styles.txt}>Đánh giá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={require('../../assets/vote.png')} style={styles.icon} />
            <Text style={styles.txt}>Bầu chọn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={require('../../assets/left_dept.png')} style={styles.icon} />
            <Text style={styles.txt}>Giấy ra cổng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={require('../../assets/transfer_dept.png')} style={styles.icon} />
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
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  iconWrapper: {
    alignItems: 'center',
    width: wp('27%'), 
    marginVertical: hp('1%'),
    marginHorizontal: hp('1%'),
  },
  icon: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('1%'),
  },
  txt: {
    textAlign: 'center',
    fontSize: hp('2%'),
    width:wp('100%'), 
  },
  timeContainer: {
    position: 'absolute',
    bottom: hp('2%'),
    alignSelf: 'center',
  },
  timeText: {
    fontSize: hp('2%'),
    color: 'red',
  },
});

export default HomeScreen;
