import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <View style={styles.textInfo}>
          <Text style={styles.textName}>{userData.name}</Text>
          <Text style={styles.textDept}>{userData.dept}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.colorMain,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 70,
      marginLeft: 20,
    },
    avatar: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
    },
    textInfo: {
      paddingLeft: 10,
    },
    textName: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    textDept: {
      fontSize: 18,
    },
  });

export default HomeScreen;
