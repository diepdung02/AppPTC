import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, SafeAreaView, Alert, Image, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import tw from 'twrnc';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from "../../../../constants/Color";
import { MaterialCommunityIcons } from '@expo/vector-icons';


type Report = {
  reportNo: string;
  confirmDate: string;
  ponoOrRoute: string;
  itemCode: string;
  itemMaterial: string;
  locationOrTeam: string;
  qty: number;
  requestDate: string;
  checkAndVerifyBy: string;
  status: string;
  created: string;
  noted: string;
};

const { width, height } = Dimensions.get("window");

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Calculate scale based on the smaller ratio
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

const CheckDetailScreen: React.FC = ({ navigation, route }: any) => {
  const [status, setStatus] = useState<string>('');
  const [actualCheckedQuantity, setActualCheckedQuantity] = useState<number>(0);
  const [rejectedQuantity, setRejectedQuantity] = useState<number>(0);
  const [errorDescription, setErrorDescription] = useState<string>('');
  const [attachments, setAttachments] = useState<Array<{ uri: string, type: 'image' | 'video' }>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAttachment, setSelectedAttachment] = useState<{ uri: string, type: 'image' | 'video' } | null>(null);

  // Get the report from the route params
  const { report }: { report?: Report } = route.params;

  if (!report) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg font-bold`}>Không có thông tin báo cáo.</Text>
      </SafeAreaView>
    );
  }

  // Function to pick media from the device
  const handleMediaPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, type } = result.assets[0];
      setAttachments([...attachments, { uri, type: type === 'image' ? 'image' : 'video' }]);
    } else {
      Alert.alert('Chưa chọn tài liệu', 'Vui lòng chọn một tài liệu để đính kèm.');
    }
  };

  // Function to handle attachment press
  const handleAttachmentPress = (attachment: { uri: string, type: 'image' | 'video' }) => {
    setSelectedAttachment(attachment);
    setModalVisible(true);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Implement submission logic here
    Alert.alert('Thông báo', 'Báo cáo đã được gửi.');
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAttachment(null);
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View
        style={[
          tw`flex-row items-center py-2.5 px-5 mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2`}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-xl flex-1 text-center`,
            { color: COLORS.black, fontFamily: "CustomFont-Bold" },
          ]}
        >
          Chi tiết báo lỗi
        </Text>
      </View>
      <ScrollView style={tw`p-4`}>
        <View style={tw`mb-4`}>
          <Text
            style={[
              tw``,
              { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) },
            ]}
          >
            Thông tin báo lỗi
          </Text>
          <View style={tw`mt-2`}>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Report No:{" "}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.reportNo}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Confirm Date:{" "}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.confirmDate}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                PONO/Route:{" "}
              </Text>
              <Text
                style={[
                  tw`mt--4`,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.ponoOrRoute}
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Item Code:{" "}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.itemCode}
              </Text>
            </View>
            <View style={tw`flex-row`}>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Item Vật Tư:{" "}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.itemMaterial}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Location/Team:{" "}
              </Text>
              <Text
                style={[
                  tw`mt--4`,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.locationOrTeam}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Check & Verify by:{" "}
              </Text>
              <Text
                style={[
                  tw`mt--4`,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.checkAndVerifyBy}
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Status:{" "}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {status}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Qty:{" "}
              </Text>
              <Text
                style={[
                  tw``,
                  {
                    fontFamily: "CustomFont-Regular",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                {report.qty}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`border border-gray-300 p-2 rounded bg-white mb-4`}>
          <Text
            style={[
              tw``,
              { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) },
            ]}
          >
            Số lượng thực kiểm
          </Text>
          <TextInput
            style={tw`border border-black p-2 rounded text-black text-base`}
            keyboardType="numeric"
            value={actualCheckedQuantity.toString()}
            onChangeText={(text) => setActualCheckedQuantity(Number(text))}
          />
        </View>

        <View style={tw`border border-gray-300 p-2 rounded bg-white mb-4`}>
          <Text
            style={[
              tw``,
              { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) },
            ]}
          >
            Số lượng bị từ chối
          </Text>
          <TextInput
            style={tw`border border-black p-2 rounded text-black text-base`}
            keyboardType="numeric"
            value={rejectedQuantity.toString()}
            onChangeText={(text) => setRejectedQuantity(Number(text))}
          />
        </View>

        <View style={tw`border border-gray-300 p-2 rounded bg-white mb-4`}>
          <Text
            style={[
              tw``,
              { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) },
            ]}
          >
            Trạng thái
          </Text>
          <RNPickerSelect
            value={status}
            onValueChange={(value: string) => setStatus(value)}
            items={[
              { label: "Pass - Đạt", value: "Pass - Đạt" },
              { label: "Fail - Không đạt", value: "Fail - Không đạt" },
            ]}
            style={{
              inputIOS: {
                borderColor: COLORS.darkGray,
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: getScaledSize(10),
                paddingHorizontal: getScaledSize(5),
                fontSize: getScaledSize(14),
                color: COLORS.black,
              },
              inputAndroid: {
                borderColor: COLORS.darkGray,
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: getScaledSize(12),
                paddingHorizontal: getScaledSize(10),
                fontSize: getScaledSize(14),
                color: COLORS.black,
              },
            }}
          />
        </View>

      <Text style={tw`text-lg font-bold mt-4`}>Thời gian báo lỗi:</Text>
      <Text style={tw`text-lg mb-2`}>{new Date().toLocaleString()}</Text>

      <Button title="Gửi báo cáo" onPress={handleSubmit} />
      <Button title="Quay lại" onPress={() => console.log("Quay lại")} />

      {selectedAttachment && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-80 z-50`}>
            <Pressable 
              style={tw`absolute top-10 right-5 p-4 bg-gray-700 rounded-full`} 
              onPress={handleCloseModal}
              hitSlop={10}
              accessibilityRole="button"
            >
              <Text style={tw`text-white text-3xl`}>×</Text>
            </Pressable>

            {selectedAttachment.type === 'image' ? (
              <Image
                source={{ uri: selectedAttachment.uri }}
                style={tw`w-full h-full`}
                resizeMode="contain"
              />
            ) : (
              <Video
                source={{ uri: selectedAttachment.uri }}
                style={tw`w-full h-full`}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
              />
            )}
          </View>
        </Modal>
      )}
    </ScrollView>

    </SafeAreaView>
  );
};

export default CheckDetailScreen;
