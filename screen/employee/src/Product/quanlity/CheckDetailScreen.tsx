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
  RefreshControl
} from "react-native";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../../../../constants/Color";

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

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

const scaleWidth = initialWidth / 375; 
const scaleHeight = initialHeight / 667; 


const getScaledSize = (size: number, isWidth = true) => {
  const minWidth = 320;  
  const maxWidth = 1024;

  const width = Dimensions.get('window').width; 


  if (width < minWidth) {
    return size * 0.5; 
  } 
  else if (width > maxWidth) {
    return size * 1.2; 
  }

  
  return isWidth ? size * scaleWidth : size * scaleHeight;
};

const CheckDetailScreen: React.FC = ({ navigation, route }: any) => {
  const [status, setStatus] = useState<string>("");
  const [errorState, setErrorState] = useState<string>("");
  const [actualCheckedQuantity, setActualCheckedQuantity] = useState<number>(0);
  const [rejectedQuantity, setRejectedQuantity] = useState<number>(0);
  const [attachments, setAttachments] = useState<
    Array<{ uri: string; type: "image" | "video" }>
  >([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAttachment, setSelectedAttachment] = useState<{
    uri: string;
    type: "image" | "video";
  } | null>(null);
  const { report, selectedItems }: { report: Report; selectedItems: string[] } =
    route.params;
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [action, setAction] = useState("");
  const [itemDetails, setItemDetails] = useState<Record<string, { reason: string; action: string; isCompleted?: boolean; qtyCheck?: number; qtyReject?: number; solution?: string }>>({});
  const [refreshing, setRefreshing] = useState(false); 


  if (!report) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-lg font-bold`}>Không có thông tin báo cáo.</Text>
      </SafeAreaView>
    );
  }

  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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

  const handleReasonChange = (item: string, text: string) => {
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [item]: { ...prevDetails[item], reason: text },
    }));
  };

  const handleActionChange = (item: string, text: string) => {
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [item]: { ...prevDetails[item], action: text },
    }));
  };

  const handleComplete = (item: string) => {
    setItemDetails(prevDetails => ({
      ...prevDetails,
      [item]: {
        ...prevDetails[item],
        isCompleted: true,
        qtyCheck: 0, 
        qtyReject: 0, 
        solution: prevDetails[item]?.action || 'Chưa có giải pháp' 
      }
    }));
  };
  
  
  

  const handleSubmit = () => {
    if (
      !status ||
      !errorState ||
      !reason ||
      !action ||
      actualCheckedQuantity < 0 ||
      rejectedQuantity < 0
    ) {
      Alert.alert("Thông báo", "Vui lòng điển đầy đủ thông tin và thử lại.");
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
      action,
    };

    // Log dữ liệu ra console
    console.log("Dữ liệu báo cáo đã gửi:", reportData);

    Alert.alert("Thông báo", "Báo cáo đã được gửi thành công.");

    setActualCheckedQuantity(0);
    setRejectedQuantity(0);
    setAttachments([]);
    setStatus("");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAttachment(null);
  };
  const handleDelete = (item: string) => {
  setItemDetails(prevDetails => {
    const updatedDetails = { ...prevDetails };
    delete updatedDetails[item];
    return updatedDetails;
  });

};


  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
    <View
        style={[
          tw`flex-row items-center py-${getScaledSize(2.7)} px-${getScaledSize(5)} mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-${getScaledSize(2)}`}
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
            tw` flex-1 text-center`,
            { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize:getScaledSize(18) },
          ]}
        >
          Chi tiết báo lỗi
        </Text>
      </View>
      <ScrollView contentContainerStyle={tw`p-${getScaledSize(4)}`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={[tw`p-${getScaledSize(4)} rounded-lg shadow-md mb-${getScaledSize(6)}`, {backgroundColor:COLORS.white}]}>
          <Text
            style={[
              tw`text-center mb-${getScaledSize(4)}`,
              {
                fontFamily: "CustomFont-Bold",
                fontSize: getScaledSize(18),
                color: COLORS.black,
              },
            ]}
          >
            Thông tin báo lỗi
          </Text>
          <View style={tw`border-t border-gray-200 pt-${getScaledSize(4)}`}>
            <View style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}>
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

            <View style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}>
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

            <View style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}>
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

            <View style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}>
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

            <View style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}>
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

            <View style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}>
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

            <View style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}>
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
          <View style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded  w-${getScaledSize(40)}`, {backgroundColor:COLORS.white}]}>
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
              style={[tw`border border-black p-${getScaledSize(2)} rounded `, {color:COLORS.black}]}
              keyboardType="numeric"
              value={actualCheckedQuantity.toString()}
              onChangeText={(text) => setActualCheckedQuantity(Number(text))}
            />
          </View>

          <View style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded  w-${getScaledSize(40)}`, {backgroundColor:COLORS.white}]}>
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
              style={[tw`border border-black p-${getScaledSize(2)} rounded `, {color:COLORS.black}]}
              keyboardType="numeric"
              value={rejectedQuantity.toString()}
              onChangeText={(text) => setRejectedQuantity(Number(text))}
            />
          </View>
        </View>
        <View style={tw`flex-row justify-around `}>
          <View style={tw`flex-1 justify-center items-center mt-${getScaledSize(4)}`}>
            <View
              style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded   w-${getScaledSize(40)} justify-center items-center`, {backgroundColor:COLORS.white}]}
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
          <View style={tw`flex-1 justify-center items-center mt-${getScaledSize(4)}`}>
          <View
              style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded   w-${getScaledSize(40)} justify-center items-center`, {backgroundColor:COLORS.white}]}
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
        <View style={tw`pt-${getScaledSize(4)} mb-${getScaledSize(4)} px-${getScaledSize(4)}`}>
    {selectedItems.length > 0 ? (
      Array.from(selectedItems).map((item, index) => (
        <View key={index} style={tw`mb-${getScaledSize(4)}`}>
          <TouchableOpacity
            onPress={() => setSelectedItem(selectedItem === item ? null : item)} // Nếu item đã được chọn thì bỏ chọn, ngược lại chọn item mới
            style={[
              tw`flex-row items-center`,
              itemDetails[item]?.isCompleted && tw`bg-gray-200` // Thay đổi giao diện nếu item đã được hoàn thành
            ]}
            disabled={itemDetails[item]?.isCompleted} // Vô hiệu hóa nếu item đã hoàn thành
          >
            <Text
              style={[
                tw`mr-${getScaledSize(2)}`,
                { fontSize: getScaledSize(16), color: COLORS.blue },
              ]}
            >
              Item:
            </Text>
            <Text
              style={[
                tw`mr-${getScaledSize(10)}`,
                { fontSize: getScaledSize(16), color: COLORS.red },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>

          {/* Hiển thị lý do và hành động nếu phần tử này được chọn và chưa hoàn thành */}
          {selectedItem === item && !itemDetails[item]?.isCompleted && (
            <View style={tw`pt-${getScaledSize(4)}`}>
              <View style={tw`mb-${getScaledSize(4)}`}>
                <Text style={[tw`mb-${getScaledSize(2)}`,{fontSize:getScaledSize(16), fontFamily: "CustomFont-Bold", color:COLORS.darkGray}]}>
                  Lý Do:
                </Text>
                <TextInput
                  style={tw`border border-gray-300 p-${getScaledSize(2)} rounded-lg h-${getScaledSize(24)}`}
                  placeholder="Nhập lý do"
                  value={itemDetails[item]?.reason || ''}
                  onChangeText={(text) => handleReasonChange(item, text)}
                  multiline
                />
              </View>

              <View style={tw`mb-${getScaledSize(4)}`}>
                <Text style={[tw` mb-${getScaledSize(2)}`, {fontSize:getScaledSize(16), fontFamily: "CustomFont-Bold", color:COLORS.darkGray}]}>
                  Hành Động:
                </Text>
                <TextInput
                  style={tw`border border-gray-300 p-${getScaledSize(2)} rounded-lg h-${getScaledSize(24)}`}
                  placeholder="Nhập hành động"
                  value={itemDetails[item]?.action || ''}
                  onChangeText={(text) => handleActionChange(item, text)}
                  multiline
                />
              </View>

              {/* Thêm các trường nhập liệu cho số lượng */}
              <View style={tw`flex-row justify-around mb-${getScaledSize(4)}`}>
                <View style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded  w-${getScaledSize(40)}`, {backgroundColor:COLORS.white}]}>
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
                    style={[tw`border border-black p-${getScaledSize(2)} rounded `, {color:COLORS.black}]}
                    keyboardType="numeric"
                    value={itemDetails[item]?.qtyCheck?.toString() || actualCheckedQuantity.toString()}
                    onChangeText={(text) => {
                      const value = Number(text);
                      setActualCheckedQuantity(value);
                      setItemDetails(prevDetails => ({
                        ...prevDetails,
                        [item]: {
                          ...prevDetails[item],
                          qtyCheck: value
                        }
                      }));
                    }}
                  />
                </View>

                <View style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded  w-${getScaledSize(40)}`, {backgroundColor:COLORS.white}]}>
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
                     style={[tw`border border-black p-${getScaledSize(2)} rounded `, {color:COLORS.black}]}
                    keyboardType="numeric"
                    value={itemDetails[item]?.qtyReject?.toString() || rejectedQuantity.toString()}
                    onChangeText={(text) => {
                      const value = Number(text);
                      setRejectedQuantity(value);
                      setItemDetails(prevDetails => ({
                        ...prevDetails,
                        [item]: {
                          ...prevDetails[item],
                          qtyReject: value
                        }
                      }));
                    }}
                  />
                </View>
              </View>

              {/* Thêm nút hoàn thành */}
              <TouchableOpacity
                onPress={() => handleComplete(item)} // Thực hiện hành động hoàn thành cho item
                style={[
                  tw`bg-blue-500 p-${getScaledSize(3)} rounded-lg`,
                  itemDetails[item]?.isCompleted && tw`bg-gray-500` // Thay đổi màu sắc nút nếu item đã hoàn thành
                ]}
                disabled={itemDetails[item]?.isCompleted} // Vô hiệu hóa nút nếu item đã hoàn thành
              >
                <Text style={[tw`text-center `, {color:COLORS.white,fontFamily: "CustomFont-Bold", }]}>
                  Hoàn thành
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Hiển thị thông tin sau khi hoàn thành */}
          {itemDetails[item]?.isCompleted && (
            <View>
              <View style={tw`mb-${getScaledSize(4)} `}>
                <Text style={[tw`  mb${getScaledSize(2)}`, {fontSize:getScaledSize(16), fontFamily: "CustomFont-Bold", color:COLORS.darkGray} ]}>
                  Số lượng thực kiểm:
                </Text>
                <Text style={[{fontSize:getScaledSize(16)}]}>
                  {itemDetails[item]?.qtyCheck || 0}
                </Text>
              </View>

              <View style={tw`mb-${getScaledSize(4)} `}>
              <Text style={[tw`  mb${getScaledSize(2)}`, {fontSize:getScaledSize(16), fontFamily: "CustomFont-Bold", color:COLORS.darkGray} ]}>
                  Số lượng bị từ chối:
                </Text>
                <Text style={[{fontSize:getScaledSize(16)}]}>
                  {itemDetails[item]?.qtyReject || 0}
                </Text>
              </View>

              <View style={tw`mb-${getScaledSize(4)} `}>
              <Text style={[tw`  mb${getScaledSize(2)}`, {fontSize:getScaledSize(16), fontFamily: "CustomFont-Bold", color:COLORS.darkGray} ]}>
                  Nguyên nhân:
                </Text>
                <Text style={[{fontSize:getScaledSize(16)}]}>
                  {itemDetails[item]?.reason || 'Chưa có nguyên nhân'}
                </Text>
              </View>

              <View style={tw`mb-${getScaledSize(4)} `}>
              <Text style={[tw`  mb-${getScaledSize(2)}`, {fontSize:getScaledSize(16), fontFamily: "CustomFont-Bold", color:COLORS.darkGray} ]}>
                  Giải pháp:
                </Text>
                <Text style={[{fontSize:getScaledSize(16)}]}>
                  {itemDetails[item]?.solution || 'Chưa có giải pháp'}
                </Text>
              </View>

              {/* Thêm nút xóa */}
              <TouchableOpacity
                onPress={() => handleDelete(item)} // Thực hiện hành động xóa cho item
                style={tw`bg-red-500 p-3 rounded-lg`}
              >
                <Text style={[tw`text-center`, {color:COLORS.white, fontFamily: "CustomFont-Bold"}]}>
                  Xóa
                </Text>
              </TouchableOpacity>
            </View>
          )}
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


        <View style={tw`border-t border-gray-300 pt-${getScaledSize(4)} px-${getScaledSize(4)} mb-${getScaledSize(6)}`}>
          <Text
            style={[
              tw`text-center mb-${getScaledSize(4)}`,
              {
                fontFamily: "CustomFont-Bold",
                fontSize: 16,
                color: COLORS.black,
              },
            ]}
          >
            Đính kèm
          </Text>
          <View style={tw`flex-row justify-center items-center mb-${getScaledSize(4)} `}>
            <TouchableOpacity
              onPress={handleCapture}
              style={tw`bg-blue-500 p-2 rounded-lg m-${getScaledSize(2)} flex-row items-center`}
            >
              <MaterialCommunityIcons
                name="camera"
                size={20}
                color="#fff"
                style={tw`mr-2`}
              />
              <Text style={[tw`text-center w-${getScaledSize(20)}`, {color:COLORS.white, fontSize:getScaledSize(16)}]}>
                Chụp ảnh / Quay video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleMediaPick}
              style={tw`bg-green-500 p-${getScaledSize(2)} rounded-lg m-${getScaledSize(2)} flex-row items-center `}
            >
              <MaterialCommunityIcons
                name="image"
                size={20}
                color="#fff"
                style={tw`mr-2`}
              />
              <Text style={[tw`text-center w-${getScaledSize(20)}`, {color:COLORS.white, fontSize:getScaledSize(16)}]}>
                Chọn từ thư viện
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={tw`mt-${getScaledSize(4)}`} horizontal>
            {attachments.map((attachment, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAttachmentPress(attachment)}
                style={tw`mr-${getScaledSize(4)}`}
              >
                {attachment.type === "image" ? (
                  <Image
                    source={{ uri: attachment.uri }}
                    style={tw`w-${getScaledSize(40)} h-${getScaledSize(40)} rounded-lg`}
                    resizeMode="cover"
                  />
                ) : (
                  <Video
                    source={{ uri: attachment.uri }}
                    style={tw`w-${getScaledSize(40)} h-${getScaledSize(40)} rounded-lg`}
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
        style={[tw`flex-row justify-around  p-${getScaledSize(2)} border-t border-gray-300`, {backgroundColor:COLORS.white}]}
      >
        <TouchableOpacity
          style={[
            tw`flex-1 m-${getScaledSize(4)} p-${getScaledSize(2)} rounded`,
            { backgroundColor: COLORS.green },
          ]}
          onPress={handleSubmit}
        >
          <Text style={[tw` text-center`, {color:COLORS.white, fontSize:getScaledSize(16)}]}>Hoàn thành</Text>
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
            style={[tw`flex-1 justify-center items-center `, { backgroundColor: 'rgba(0, 0, 0, 0.5 )' }]}
          >
            <View style={[tw` p-${getScaledSize(4)} rounded`, {backgroundColor:COLORS.white}]}>
              {selectedAttachment.type === "image" ? (
                <Image
                  source={{ uri: selectedAttachment.uri }}
                  style={tw`w-${getScaledSize(80)} h-${getScaledSize(80)}`}
                />
              ) : (
                <Video
                  source={{ uri: selectedAttachment.uri }}
                  style={tw`w-${getScaledSize(80)} h-${getScaledSize(80)}`}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay={false}
                />
              )}
              <View style={tw`flex-row justify-between mt-${getScaledSize(4)}`}>
                <TouchableOpacity
                  style={tw`p-${getScaledSize(2)} bg-red-500 rounded`}
                  onPress={() => handleDeleteAttachment(selectedAttachment.uri)}
                >
                  <Text style={[tw` text-center`, {color:COLORS.white}]}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`p-${getScaledSize(2)} bg-blue-500 rounded`}
                  onPress={handleCloseModal}
                >
                  <Text style={[tw`text-center`, {color:COLORS.white}]}>Đóng</Text>
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