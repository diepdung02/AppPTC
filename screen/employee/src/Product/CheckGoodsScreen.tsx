import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from "expo-av";

const CheckGoodsScreen: React.FC = () => {
  // Example data
  const [itemCode, setItemCode] = useState('I001');
  const [itemName, setItemName] = useState('Sản phẩm X');
  const [quantityToCheck, setQuantityToCheck] = useState(50);
  const [qcStatus, setQcStatus] = useState('Chưa kiểm tra');
  const [qcInspector, setQcInspector] = useState('');
  const [qcDate, setQcDate] = useState('');
  const [notes, setNotes] = useState('');
  const [attachments, setAttachments] = useState<{ uri: string; type: 'image' | 'video' }[]>([]);

  const handleCapture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      setAttachments([
        ...attachments,
        { uri, type: type === 'image' ? 'image' : 'video' },
      ]);
    } else {
      Alert.alert(
        'Chưa chụp ảnh hoặc quay video',
        'Vui lòng chụp ảnh hoặc quay video để đính kèm.'
      );
    }
  };

  const handleMediaPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      setAttachments([
        ...attachments,
        { uri, type: type === 'image' ? 'image' : 'video' },
      ]);
    } else {
      Alert.alert(
        'Chưa chọn tài liệu',
        'Vui lòng chọn một tài liệu để đính kèm.'
      );
    }
  };

  const handleSubmit = () => {
    // Implement submission logic here
    Alert.alert('Hoàn tất', 'Kiểm tra hàng đã được gửi đi.');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`bg-white p-4 border-b border-gray-200`}>
          <Text style={tw`text-xl font-bold text-center`}>
            Kiểm Tra Hàng
          </Text>
        </View>

        {/* Item Information */}
        <View style={tw`bg-white p-4 mt-2`}>
          <View style={tw`mb-2`}>
            <Text style={tw`text-gray-500`}>Mã sản phẩm:</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded`}
              value={itemCode}
              onChangeText={setItemCode}
            />
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`text-gray-500`}>Tên sản phẩm:</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded`}
              value={itemName}
              onChangeText={setItemName}
            />
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`text-gray-500`}>Số lượng kiểm tra:</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded`}
              value={quantityToCheck.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setQuantityToCheck(Number(text))}
            />
          </View>
        </View>

        {/* QC Status */}
        <View style={tw`bg-white p-4 mt-2`}>
          <View style={tw`mb-2`}>
            <Text style={tw`text-gray-500`}>Trạng thái QC:</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded`}
              value={qcStatus}
              onChangeText={setQcStatus}
            />
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`text-gray-500`}>Người kiểm tra:</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded`}
              value={qcInspector}
              onChangeText={setQcInspector}
            />
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`text-gray-500`}>Ngày kiểm tra:</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 rounded`}
              value={qcDate}
              onChangeText={setQcDate}
            />
          </View>
        </View>

        {/* Notes */}
        <View style={tw`bg-white p-4 mt-2`}>
          <Text style={tw`text-gray-500 mb-2`}>Ghi chú:</Text>
          <TextInput
            style={tw`border border-gray-300 p-2 rounded`}
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        {/* Media Evidence */}
        <View style={tw`bg-white p-4 mt-2`}>
          <Text style={tw`text-gray-500 mb-2`}>Hình ảnh/Video minh chứng:</Text>
          <TouchableOpacity
            style={tw`bg-green-500 py-2 px-6 rounded-full mb-2`}
            onPress={handleCapture}
          >
            <Text style={tw`text-white font-semibold`}>Chụp Ảnh/Quay Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-red-500 py-2 px-6 rounded-full mb-2`}
            onPress={handleMediaPick}
          >
            <Text style={tw`text-white font-semibold`}>Chọn Hình Ảnh/Video</Text>
          </TouchableOpacity>
          {attachments.map((attachment, index) => (
            <View key={index} style={tw`border border-gray-300 p-4 mb-2`}>
              {attachment.type === 'image' ? (
                <Image
                  source={{ uri: attachment.uri }}
                  style={tw`w-full h-40 bg-gray-200`}
                />
              ) : (
                <Video
                  source={{ uri: attachment.uri }}
                  style={tw`w-full h-40`}
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls
                />
              )}
            </View>
          ))}
          {attachments.length === 0 && (
            <Text style={tw`text-gray-500`}>Chưa có hình ảnh hoặc video minh chứng</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={tw`flex-row justify-around p-4 mt-4`}>
          <TouchableOpacity
            style={tw`bg-blue-500 py-2 px-6 rounded-full`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-white font-semibold`}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckGoodsScreen;
