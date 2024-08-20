import React, { useState } from 'react';
import { View, Text, Button, ScrollView, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import RNPickerSelect from 'react-native-picker-select';

const ErrorScreen: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedErrorCode, setSelectedErrorCode] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string>('');
  const [attachment, setAttachment] = useState<string | null>(null);

  const products = [
    { label: 'Sản phẩm A', value: 'productA' },
    { label: 'Sản phẩm B', value: 'productB' },
    { label: 'Sản phẩm C', value: 'productC' },
  ];

  const errorCodes = [
    { label: 'Lỗi 1234', value: 'E1234' },
    { label: 'Lỗi 5678', value: 'E5678' },
    { label: 'Lỗi 91011', value: 'E91011' },
    { label: 'Khác', value: 'other' },
  ];

  const handleSubmit = () => {
    // Xử lý gửi báo cáo lỗi
    console.log(`Sản phẩm: ${selectedProduct}`);
    console.log(`Mã lỗi: ${selectedErrorCode}`);
    console.log(`Mô tả lỗi: ${errorDescription}`);
    console.log(`Tài liệu đính kèm: ${attachment}`);
    // Thực hiện gửi báo cáo lỗi qua API hoặc lưu trữ dữ liệu
  };

  return (
    <SafeAreaView>
      <Text style={tw`text-2xl font-bold mb-5`}>Báo lỗi sản phẩm</Text>

      <View style={tw`bg-gray-100 p-4 rounded-lg mb-5`}>
        <Text style={tw`text-lg font-bold`}>Chọn sản phẩm:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedProduct(value)}
          items={products}
          style={pickerSelectStyles}
          placeholder={{ label: "Chọn sản phẩm...", value: null }}
        />

        <Text style={tw`text-lg font-bold mt-4`}>Chọn mã lỗi:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedErrorCode(value)}
          items={errorCodes}
          style={pickerSelectStyles}
          placeholder={{ label: "Chọn mã lỗi...", value: null }}
        />

        <Text style={tw`text-lg font-bold mt-4`}>Mô tả lỗi:</Text>
        <TextInput
          style={tw`border p-2 rounded-lg`}
          multiline
          numberOfLines={4}
          onChangeText={setErrorDescription}
          value={errorDescription}
        />

        <Text style={tw`text-lg font-bold mt-4`}>Tài liệu đính kèm:</Text>
        <TouchableOpacity style={tw`bg-blue-500 p-2 rounded-lg`} onPress={() => console.log("Tải lên tài liệu")}>
          <Text style={tw`text-white text-center`}>{attachment ? 'Tài liệu đã đính kèm' : 'Chọn tài liệu'}</Text>
        </TouchableOpacity>

        <Text style={tw`text-lg font-bold mt-4`}>Thời gian báo lỗi:</Text>
        <Text style={tw`text-lg mb-2`}>{new Date().toLocaleString()}</Text>
      </View>

      <Button title="Gửi báo cáo" onPress={handleSubmit} />
      <Button title="Quay lại" onPress={() => console.log("Quay lại")} />
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#000',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#000',
    paddingRight: 30,
  },
  placeholder: {
    color: '#888',
  },
});

export default ErrorScreen;
