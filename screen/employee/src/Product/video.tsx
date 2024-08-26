// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, TextInput, SafeAreaView, Image, Alert, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
// import tw from 'twrnc';
// import * as ImagePicker from 'expo-image-picker';
// import { Video, ResizeMode } from 'expo-av';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const ErrorScreen: React.FC = () => {
//   const [errorDescription, setErrorDescription] = useState<string>('');
//   const [attachments, setAttachments] = useState<Array<{ uri: string, type: 'image' | 'video' }>>([]);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedAttachment, setSelectedAttachment] = useState<{ uri: string, type: 'image' | 'video' } | null>(null);

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   const requestPermissions = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Camera access is required to take pictures or record videos.');
//     }

//     const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (galleryStatus !== 'granted') {
//       Alert.alert('Permission Denied', 'Access to media library is required to upload images or videos.');
//     }
//   };

//   const handleMediaPick = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       const type = result.assets[0].type as 'image' | 'video';

//       setAttachments(prev => [...prev, { uri, type }]);
//     }
//   };

//   const handleAttachmentPress = (attachment: { uri: string, type: 'image' | 'video' }) => {
//     setSelectedAttachment(attachment);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     setSelectedAttachment(null);
//   };

//   const handleSubmit = () => {
//     console.log(`Mô tả lỗi: ${errorDescription}`);
//     console.log('Tài liệu đính kèm:', attachments);
//   };

//   return (
//     <SafeAreaView>
//       <Text style={tw`text-2xl font-bold mb-5`}>Báo lỗi sản phẩm</Text>

//       <View style={tw`bg-gray-100 p-4 rounded-lg mb-5`}>
//         <Text style={tw`text-lg font-bold mt-4`}>Mô tả lỗi:</Text>
//         <TextInput
//           style={tw`border p-2 rounded-lg`}
//           multiline
//           numberOfLines={4}
//           onChangeText={setErrorDescription}
//           value={errorDescription}
//         />

//         <Text style={tw`text-lg font-bold mt-4`}>Chọn loại tài liệu đính kèm:</Text>
//         <TouchableOpacity onPress={handleMediaPick} style={tw`mt-4`}>
//           <Icon name="camera-alt" size={40} color="blue" />
//           <Text style={tw`text-center mt-2`}>Chụp ảnh / Quay video</Text>
//         </TouchableOpacity>

//         <ScrollView style={tw`mt-4`} horizontal>
//           {attachments.map((attachment, index) => (
//             <TouchableOpacity key={index} onPress={() => handleAttachmentPress(attachment)} style={tw`mr-4`}>
//               {attachment.type === 'image' ? (
//                 <Image source={{ uri: attachment.uri }} style={tw`w-40 h-40 rounded-lg`} resizeMode="cover" />
//               ) : (
//                 <Video
//                   source={{ uri: attachment.uri }}
//                   style={tw`w-40 h-40 rounded-lg`}
//                   useNativeControls
//                   resizeMode={ResizeMode.CONTAIN} 
//                 />
//               )}
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Text style={tw`text-lg font-bold mt-4`}>Thời gian báo lỗi:</Text>
//         <Text style={tw`text-lg mb-2`}>{new Date().toLocaleString()}</Text>
//       </View>

//       <Button title="Gửi báo cáo" onPress={handleSubmit} />
//       <Button title="Quay lại" onPress={() => console.log("Quay lại")} />

//       {selectedAttachment && (
//         <Modal
//           visible={modalVisible}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={handleCloseModal}
//         >
//           <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-80 z-50`}>
//             <Pressable 
//               style={tw`absolute top-10 right-5 p-4 bg-gray-700 rounded-full`} 
//               onPress={handleCloseModal}
//               hitSlop={10}
//               accessibilityRole="button"
//             >
//               <Text style={tw`text-white text-3xl`}>×</Text>
//             </Pressable>

//             {selectedAttachment.type === 'image' ? (
//               <Image
//                 source={{ uri: selectedAttachment.uri }}
//                 style={tw`w-full h-full`}
//                 resizeMode="contain"
//               />
//             ) : (
//               <Video
//                 source={{ uri: selectedAttachment.uri }}
//                 style={tw`w-full h-full`}
//                 useNativeControls
//                 resizeMode={ResizeMode.CONTAIN}
//               />
//             )}
//           </View>
//         </Modal>
//       )}
//     </SafeAreaView>
//   );
// };

// export default ErrorScreen;
