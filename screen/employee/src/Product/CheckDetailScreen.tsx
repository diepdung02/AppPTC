  import React, { useState } from "react";
  import {
    View,
    Text,
    TextInput,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Alert,
    Image,
    TouchableOpacity,
    Modal,
    Keyboard,
    TouchableWithoutFeedback,
  } from "react-native";
  import tw from "twrnc";
  import RNPickerSelect from "react-native-picker-select";
  import * as ImagePicker from "expo-image-picker";
  import { Video, ResizeMode } from "expo-av";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import COLORS from "../../../../constants/Color";


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
  const BASE_WIDTH = 375;
  const BASE_HEIGHT = 667;
  const scaleWidth = width / BASE_WIDTH;
  const scaleHeight = height / BASE_HEIGHT;
  const scale = Math.min(scaleWidth, scaleHeight);

  const getScaledSize = (size: number) => Math.round(size * scale);

  const CheckDetailScreen: React.FC = ({ navigation, route }: any) => {
    const [status, setStatus] = useState<string>("");
    const [errorState, setErrorState] = useState<string>("");
    const [actualCheckedQuantity, setActualCheckedQuantity] = useState<number>(0);
    const [rejectedQuantity, setRejectedQuantity] = useState<number>(0);
    const [attachments, setAttachments] = useState<Array<{ uri: string; type: "image" | "video" }> >([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAttachment, setSelectedAttachment] = useState<{uri: string; type: "image" | "video"; } | null>(null);
    const { report, selectedItems }: { report: Report; selectedItems: string[] } =route.params;
    const [reason, setReason] = useState<string>("");
    const [action, setAction] = useState<string>("");

    if (!report) {
      return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
          <Text style={tw`text-lg font-bold`}>Không có thông tin báo cáo.</Text>
        </SafeAreaView>
      );
    }
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
          { uri, type: type === "image" ? "image" : "video" },
        ]);
      } else {
        Alert.alert(
          "Chưa chụp ảnh hoặc quay video",
          "Vui lòng chụp ảnh hoặc quay video để đính kèm."
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
          { uri, type: type === "image" ? "image" : "video" },
        ]);
      } else {
        Alert.alert(
          "Chưa chọn tài liệu",
          "Vui lòng chọn một tài liệu để đính kèm."
        );
      }
    };

    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };

    const handleAttachmentPress = (attachment: {
      uri: string;
      type: "image" | "video";
    }) => {
      setSelectedAttachment(attachment);
      setModalVisible(true);
    };
    const handleDeleteAttachment = (uri: string) => {
      setAttachments(attachments.filter((attachment) => attachment.uri !== uri));
      if (selectedAttachment && selectedAttachment.uri === uri) {
        setModalVisible(false);
        setSelectedAttachment(null);
      }
    };

    const handleSubmit = () => {
      if (!status ||  !errorState || !reason || !action || actualCheckedQuantity < 0 || rejectedQuantity < 0) {
        Alert.alert(
          "Thông báo",
          "Vui lòng điển đầy đủ thông tin và thử lại."
        );
        return;
      }

      // Tạo đối tượng báo cáo để kiểm tra dữ liệu
      const reportData = {
        status,
        actualCheckedQuantity,
        rejectedQuantity,
        attachments,
        errorState,
        reason,
        action
      };

      // Log dữ liệu ra console
      console.log("Dữ liệu báo cáo đã gửi:", reportData);

      // Hiển thị thông báo về dữ liệu đã được gửi
      Alert.alert("Thông báo", "Báo cáo đã được gửi thành công.");

      // Xóa hoặc reset dữ liệu nếu cần
      setActualCheckedQuantity(0);
      setRejectedQuantity(0);
      setAttachments([]);
      setStatus("");
    };

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
        <ScrollView contentContainerStyle={tw`p-4`}>
          <View style={tw`bg-white p-4 rounded-lg shadow-md mb-6`}>
            <Text
              style={[
                tw`text-center mb-4`,
                {
                  fontFamily: "CustomFont-Bold",
                  fontSize: getScaledSize(18),
                  color: COLORS.black,
                },
              ]}
            >
              Thông tin báo lỗi
            </Text>
            <View style={tw`border-t border-gray-200 pt-4`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Report No:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.reportNo}
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Confirm Date:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.confirmDate}
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  PONO/Route:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.ponoOrRoute}
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Item Code:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.itemCode}
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Item Vật Tư:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.itemMaterial}
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Location/Team:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.locationOrTeam}
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Check & Verify by:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.checkAndVerifyBy}
                </Text>
              </View>

              <View style={tw`flex-row items-center`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Status:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                    },
                  ]}
                >
                  {status}
                </Text>
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <Text
                    style={[
                      {
                        fontFamily: "CustomFont-Bold",
                        fontSize: getScaledSize(14),
                        color: COLORS.darkGray,
                      },
                    ]}
                  >
                    Error State:
                  </Text>
                  <Text
                    style={[
                      {
                        fontFamily: "CustomFont-Regular",
                        fontSize: getScaledSize(14),
                      },
                    ]}
                  >
                    {errorState}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  Qty:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  {report.qty}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`flex-row justify-around `}>
            <View style={tw`border border-gray-300 p-2 rounded bg-white w-40`}>
              <Text
                style={[
                  tw`text-center`,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Số lượng thực kiểm
              </Text>
              <TextInput
                style={tw`border border-black p-2 rounded text-black`}
                keyboardType="numeric"
                value={actualCheckedQuantity.toString()}
                onChangeText={(text) => setActualCheckedQuantity(Number(text))}
              />
            </View>

            <View style={tw`border border-gray-300 p-2 rounded bg-white w-40`}>
              <Text
                style={[
                  tw`text-center`,
                  {
                    fontFamily: "CustomFont-Bold",
                    fontSize: getScaledSize(14),
                  },
                ]}
              >
                Số lượng bị từ chối
              </Text>
              <TextInput
                style={tw`border border-black p-2 rounded text-black`}
                keyboardType="numeric"
                value={rejectedQuantity.toString()}
                onChangeText={(text) => setRejectedQuantity(Number(text))}
              />
            </View>
          </View>
          <View style={tw`flex-row justify-around `}>
            <View style={tw`flex-1 justify-center items-center mt-4`}>
              <View
                style={tw`border border-gray-300 p-2 rounded bg-white  w-40 justify-center items-center`}
              >
                <Text
                  style={[
                    tw``,
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(16),
                    },
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
            </View>
            <View style={tw`flex-1 justify-center items-center mt-4`}>
              <View
                style={tw`border border-gray-300 p-2 rounded bg-white  w-40 justify-center items-center`}
              >
                <Text
                  style={[
                    tw``,
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(16),
                    },
                  ]}
                >
                  Trạng thái lỗi
                </Text>
                <RNPickerSelect
                  value={errorState}
                  onValueChange={(value: string) => setErrorState(value)}
                  items={[
                    {
                      label: "A: Critical - Lỗi nghiêm trọng",
                      value: "A: Critical - Lỗi nghiêm trọng",
                    },
                    {
                      label: "B: Mojor - Lỗi nặng",
                      value: "B: Mojor - Lỗi nặng",
                    },
                    { label: "C: Minor - Lỗi nhẹ", value: "C: Minor - Lỗi nhẹ" },
                    {
                      label: "D: Done - Không lỗi",
                      value: "D: Done - Không lỗi",
                    },
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
            </View>
          </View>

          <View style={tw`pt-4 mb-4 px-4`}>
            {selectedItems.length > 0 ? (
              Array.from(selectedItems).map((item, index) => (
                <View key={index} style={tw`flex-row mb-1 items-center`}>
                  <Text
                    style={[
                      tw`mr-2`,
                      { fontSize: getScaledSize(16), color: COLORS.blue },
                    ]}
                  >
                    Item:
                  </Text>
                  <Text
                    style={[
                      tw`mr-10`,
                      { fontSize: getScaledSize(16), color: COLORS.red },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                style={[
                  tw`text-center`,
                  { fontSize: getScaledSize(16), color: COLORS.darkGray },
                ]}
              >
                Không có phần tử nào được chọn.
              </Text>
            )}
          </View>

          <ScrollView contentContainerStyle={tw`p-4`}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View>
                {/* Reason Input */}
                <View style={tw`mb-4`}>
                  <Text style={tw`text-lg font-bold text-gray-700 mb-2`}>
                    Lý Do:
                  </Text>
                  <TextInput
                    style={tw`border border-gray-300 p-2 rounded-lg h-24`} // Thay đổi chiều cao nếu cần
                    placeholder="Nhập lý do"
                    value={reason}
                    onChangeText={(text) => setReason(text)}
                    multiline
                  />
                </View>

                {/* Action Input */}
                <View style={tw`mb-4`}>
                  <Text style={tw`text-lg font-bold text-gray-700 mb-2`}>
                    Hành Động:
                  </Text>
                  <TextInput
                    style={tw`border border-gray-300 p-2 rounded-lg h-24`} // Thay đổi chiều cao nếu cần
                    placeholder="Nhập hành động"
                    value={action}
                    onChangeText={(text) => setAction(text)}
                    multiline
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          <View style={tw`border-t border-gray-300 pt-4 px-4 mb-6`}>
            <Text
              style={[
                tw`text-center mb-4`,
                {
                  fontFamily: "CustomFont-Bold",
                  fontSize: 16,
                  color: COLORS.black,
                },
              ]}
            >
              Đính kèm
            </Text>
            <View style={tw`flex-row flex-row justify-center items-center mb-4`}>
              <TouchableOpacity
                onPress={handleCapture}
                style={tw`bg-blue-500 p-2 rounded-lg m-2`}
              >
                <Text style={tw`text-white text-center w-40`}>
                  Chụp ảnh / Quay video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleMediaPick}
                style={tw`bg-green-500 p-2 rounded-lg m-2`}
              >
                <Text style={tw`text-white text-center w-40`}>Chọn từ thư viện</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={tw`mt-4`} horizontal>
              {attachments.map((attachment, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAttachmentPress(attachment)}
                  style={tw`mr-4`}
                >
                  {attachment.type === "image" ? (
                    <Image
                      source={{ uri: attachment.uri }}
                      style={tw`w-40 h-40 rounded-lg`}
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      source={{ uri: attachment.uri }}
                      style={tw`w-40 h-40 rounded-lg`}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <View
          style={tw`flex-row justify-around bg-white p-2 border-t border-gray-300`}
        >
          <TouchableOpacity
            style={[
              tw`flex-1 m-4 p-2 rounded`,
              { backgroundColor: COLORS.green },
            ]}
            onPress={handleSubmit}
          >
            <Text style={tw`text-white text-center`}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
        {/* Modal */}
        {selectedAttachment && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleCloseModal}
          >
            <View
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
            >
              <View style={tw`bg-white p-4 rounded`}>
                {selectedAttachment.type === "image" ? (
                  <Image
                    source={{ uri: selectedAttachment.uri }}
                    style={tw`w-80 h-80`}
                  />
                ) : (
                  <Video
                    source={{ uri: selectedAttachment.uri }}
                    style={tw`w-80 h-80`}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={false}
                  />
                )}
                <View style={tw`flex-row justify-between mt-4`}>
                  <TouchableOpacity
                    style={tw`p-2 bg-red-500 rounded`}
                    onPress={() => handleDeleteAttachment(selectedAttachment.uri)}
                  >
                    <Text style={tw`text-white text-center`}>Xóa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`p-2 bg-blue-500 rounded`}
                    onPress={handleCloseModal}
                  >
                    <Text style={tw`text-white text-center`}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    );
  };

  export default CheckDetailScreen;