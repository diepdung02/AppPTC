import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import COLORS from '../../constants/Color';
import { ApiResponse, fetchUser } from '../../API'; // Điều chỉnh đường dẫn để phù hợp với cấu trúc tệp của bạn

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const [images, setImages] = useState<string[]>([]); // State để lưu danh sách các đường dẫn ảnh

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = '1'; // Thay thế với userId thực tế hoặc lấy động
      const response: ApiResponse<any> = await fetchUser(userId);
      if (response.success) {
        setUserData(response.data); // Giả định API trả về một đối tượng có các thuộc tính 'name', 'dept', và 'images'
        if (response.data.images) {
          setImages(response.data.images); // Lấy danh sách đường dẫn ảnh từ API
        }
      } else {
        console.error('Lỗi khi lấy dữ liệu người dùng:', response.error);
      }
    };

    fetchUserData();
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image source={require('../../assets/')} style={styles.image} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inforContainer}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <View style={styles.txtInfor}>
          <Text style={styles.txtName}>{userData.name}</Text>
          <Text style={styles.txtDept}>{userData.dept}</Text>
        </View>
      </View>

      <FlatList
        data={images} // Truyền danh sách đường dẫn ảnh vào data của FlatList
        renderItem={renderItem} // Render từng mục trong danh sách
        keyExtractor={(item, index) => index.toString()} // Key extractor để tránh lỗi warning của React
        horizontal // Hiển thị danh sách theo chiều ngang
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        contentContainerStyle={styles.flatListContainer} // Style cho container của FlatList
      />
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
    borderRadius: 75 / 2, // Để thành hình tròn
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
  imageContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden', // Để các ảnh không bị tràn ra ngoài khung
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  flatListContainer: {
    paddingVertical: 20,
  },
});

export default HomeScreen;
