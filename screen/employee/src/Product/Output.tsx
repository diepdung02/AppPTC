import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, TextInput, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';

const Output: React.FC = () => {
  const productCode = 'P12345';
  const productName = 'Sản phẩm A';
  const quantityCompleted = 100;
  const completionDate = '04/09/2024';
  const qcStatus = 'Đã kiểm tra';
  const qcInspector = 'Nguyễn Văn B';
  const qcDate = '03/09/2024';
  const inspectionResults = [
    'Bước 1: Hoàn thành',
    'Bước 2: Hoàn thành',
    'Bước 3: Có lỗi, đã sửa chữa',
  ];
  const initialNotes = 'Sản phẩm đã đạt yêu cầu.';
  const [editing, setEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(initialNotes);
  const [attachments, setAttachments] = useState<{ uri: string; type: 'image' | 'video' }[]>([]);

  const handleConfirm = () => {
    Alert.alert('Xác nhận', 'Báo cáo sản phẩm đã được xác nhận.');
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    Alert.alert('Chỉnh sửa', 'Ghi chú đã được cập nhật.');
    setEditing(false);
  };

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

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`bg-white p-4 border-b border-gray-200`}>
          <Text style={tw`text-xl font-bold text-center`}>
            Báo cáo sản phẩm hoàn thành
          </Text>
        </View>

        {/* Product Information */}
        <View style={tw`bg-white p-4 mt-2`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <Text style={tw`text-gray-500`}>Mã sản phẩm:</Text>
            <Text style={tw`text-black font-semibold`}>{productCode}</Text>
          </View>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <Text style={tw`text-gray-500`}>Tên sản phẩm:</Text>
            <Text style={tw`text-black font-semibold`}>{productName}</Text>
          </View>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <Text style={tw`text-gray-500`}>Số lượng hoàn thành:</Text>
            <Text style={tw`text-black font-semibold`}>{quantityCompleted}</Text>
          </View>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-gray-500`}>Ngày hoàn thành:</Text>
            <Text style={tw`text-black font-semibold`}>{completionDate}</Text>
          </View>
        </View>

        {/* QC Status */}
        <View style={tw`bg-white p-4 mt-2`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <Text style={tw`text-gray-500`}>Trạng thái QC:</Text>
            <Text style={tw`text-green-500 font-semibold`}>{qcStatus}</Text>
          </View>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <Text style={tw`text-gray-500`}>Người kiểm tra:</Text>
            <Text style={tw`text-black font-semibold`}>{qcInspector}</Text>
          </View>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-gray-500`}>Ngày kiểm tra:</Text>
            <Text style={tw`text-black font-semibold`}>{qcDate}</Text>
          </View>
        </View>

        {/* Completion Details */}
        <View style={tw`bg-white p-4 mt-2`}>
          <Text style={tw`text-gray-500 mb-2`}>Kết quả kiểm tra:</Text>
          <View style={tw`ml-4`}>
            {inspectionResults.map((result, index) => (
              <Text key={index} style={tw`text-black`}>
                - {result}
              </Text>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={tw`bg-white p-4 mt-2`}>
          <Text style={tw`text-gray-500 mb-2`}>Ghi chú:</Text>
          {editing ? (
            <>
              <TextInput
                style={tw`border border-gray-300 p-2 rounded`}
                value={editedNotes}
                onChangeText={setEditedNotes}
              />
              <TouchableOpacity
                style={tw`bg-blue-500 py-2 px-6 rounded-full mt-2`}
                onPress={handleSave}
              >
                <Text style={tw`text-white font-semibold`}>Lưu</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={tw`text-black`}>{editedNotes}</Text>
              <TouchableOpacity
                style={tw`bg-gray-400 py-2 px-6 rounded-full mt-2`}
                onPress={handleEdit}
              >
                <Text style={tw`text-white font-semibold`}>Chỉnh sửa</Text>
              </TouchableOpacity>
            </>
          )}
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
                  resizeMode={ResizeMode.COVER}
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
            onPress={handleConfirm}
          >
            <Text style={tw`text-white font-semibold`}>Xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-gray-400 py-2 px-6 rounded-full`}
            onPress={handleEdit}
          >
            <Text style={tw`text-white font-semibold`}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Output;
