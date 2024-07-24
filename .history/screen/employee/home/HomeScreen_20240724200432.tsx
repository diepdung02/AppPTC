
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../../constants/Color';
import { SearchBar } from '@rneui/themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Product } from '../../navigator/navigation';
import useCustomFonts from '../../../hooks/useFont';


type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState<string>("");


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
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    // Bạn có thể hiển thị một màn hình tải hoặc gì đó khác ở đây
    return <View style={styles.container}><Text>Loading Fonts...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar
          placeholder="Tìm kiếm "
          inputContainerStyle={{ backgroundColor: "white" }}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomWidth: 1,
            borderTopColor: "transparent",
          }}
          onChangeText={updateSearch}
          value={search}
        />
      </View>
      
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={{uri:'https://img.upanh.tv/2024/07/09/checklist.png'}} style={styles.icon} />
            <Text style={styles.txt}>Kiểm hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Product')}>
            <Image source={{uri:'https://img.upanh.tv/2024/07/09/product.png'}} style={styles.icon} />
            <Text style={styles.txt}>Sản Phẩm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('OutputList')}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/output.png'}} style={styles.icon} />
            <Text style={styles.txt}>Output</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('RequestMain')}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/leave.png'}} style={styles.icon} />
            <Text style={styles.txt}>Nghỉ phép</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/error.png'}} style={styles.icon} />
            <Text style={styles.txt}>Báo lỗi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Overtime')}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/overtime.png'}} style={styles.icon} />
            <Text style={styles.txt}>Tăng ca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Schedule')}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/calendar.png'}} style={styles.icon} />
            <Text style={styles.txt}>Lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/evaluate.png'}} style={styles.icon} />
            <Text style={styles.txt}>Đánh giá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/vote.png'}} style={styles.icon} />
            <Text style={styles.txt}>Bầu chọn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('LeftDeptScreen')}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/left_dept.png'}} style={styles.icon} />
            <Text style={styles.txt}>Giấy ra cổng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
          <Image source={{uri:'https://img.upanh.tv/2024/07/09/transfer_dept.png'}} style={styles.icon} />
            <Text style={styles.txt}>Rời khỏi</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconWrapper}  onPress={() => navigation.navigate('ApproveLeaveScreen')} >
          <Image source={{uri:'https://img.upanh.tv/2024/07/18/approved.png'}} style={styles.icon} />
            <Text style={styles.txt}>Duyệt đơn</Text>
          </TouchableOpacity> */}
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
    fontFamily:''
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: hp("5%"),
  },
  iconWrapper: {
    alignItems: "center",
    width: wp("27%"),
    marginVertical: hp("1%"),
    marginHorizontal: hp("1%"),
  },
  icon: {
    width: wp("20%"),
    height: wp("20%"),
    marginBottom: hp("1%"),
  },
  txt: {
    textAlign: "center",
    fontSize: hp("2%"),
    width: wp("100%"),
  },
  timeContainer: {
    position: "absolute",
    bottom: hp("2%"),
    alignSelf: "center",
  },
  timeText: {
    fontSize: hp("2%"),
    color: "red",
  },
});

export default HomeScreen;
