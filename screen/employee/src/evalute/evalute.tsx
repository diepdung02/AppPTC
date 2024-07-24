import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const evalute = () => {
  const [reviews, setReviews] = useState([
    { id: '1', workerName: 'Nguyễn Văn A', workerPosition: 'Công nhân chính', reviewContent: 'Rất nỗ lực và chịu khó.', rating: 4.5 },
    { id: '2', workerName: 'Trần Thị B', workerPosition: 'Công nhân phụ', reviewContent: 'Cần cải thiện thái độ làm việc.', rating: 3.0 },
    { id: '3', workerName: 'Phạm Văn C', workerPosition: 'Công nhân chính', reviewContent: 'Luôn hoàn thành công việc đúng hạn.', rating: 4.8 },
    { id: '4', workerName: 'Lê Thị D', workerPosition: 'Công nhân phụ', reviewContent: 'Gặp khó khăn trong giao tiếp nhóm.', rating: 2.5 },
  ]);


  const renderItem = ({ item }):any => (
    <View style={styles.item}>
      <Text style={styles.title}>Đánh giá của nhân viên: {item.workerName}</Text>
      <Text style={styles.info}>Vị trí công việc: {item.workerPosition}</Text>
      <Text style={styles.info}>Nội dung đánh giá:</Text>
      <Text style={styles.content}>{item.reviewContent}</Text>
      <Text style={styles.info}>Điểm đánh giá: {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 3,
  },
  content: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default evalute;
