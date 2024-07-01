import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/Color';
import { ApiResponse, fetchUser } from '../../API'; // Điều chỉnh đường dẫn để phù hợp với cấu trúc tệp của bạn

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = '1'; // Thay thế với userId thực tế hoặc lấy động
      const response: ApiResponse<any> = await fetchUser(userId);
      if (response.success) {
        setUserData(response.data); // Giả định API trả về một đối tượng có các thuộc tính 'name' và 'dept'
      } else {
        console.error('Lỗi khi lấy dữ liệu người dùng:', response.error);
      }
    };

    fetchUserData();
  }, []);

  // Xử lý khi nhấn vào từng icon
  const handleIconPress = (iconName: string) => {
    // Viết xử lý khi nhấn vào từng icon ở đây
    console.log('Bạn đã nhấn vào icon:', iconName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inforContainer}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <View style={styles.txtInfor}>
          <Text style={styles.txtName}>{userData.name}</Text>
          <Text style={styles.txtDept}>{userData.dept}</Text>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleIconPress('check')}>
          <Image source={require('../../assets/check .png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('product')}>
          <Image source={require('../../assets/Product.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('output')}>
          <Image source={require('../../assets/Output.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('leave')}>
          <Image source={require('../../assets/leave 1.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('error')}>
          <Image source={require('../../assets/Error.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('error')}>
          <Image source={require('../../assets/ot request.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('group')}>
          <Image source={require('../../assets/Group 23.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('evaluate')}>
          <Image source={require('../../assets/evaluate.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('news')}>
          <Image source={require('../../assets/news.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('group12573')}>
          <Image source={require('../../assets/Group 12573.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('group12574')}>
          <Image source={require('../../assets/Group 12574.png')} style={styles.icon} />
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
    marginTop: 20,
  },
  icon: {
    width: 70,
    height: 100,
    margin: 10,
  },
});

export default HomeScreen;
