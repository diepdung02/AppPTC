import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CheckBox from "react-native-check-box";
import tw from "twrnc";
import COLORS from "../../../../constants/Color";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { CameraView, Camera } from "expo-camera";
import RNPickerSelect from "react-native-picker-select";
interface Item {
  orderID: string;
  itemCode: string;
  clientPO: string;
  componentID: string;
  routeCode: string;
}

interface Data {
  VEN: Item[];
  MAC: Item[];
  SAM: Item[];
}

const CreateOutPutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [orderID, setOrderID] = useState("");
  const [createDate, setCreateDate] = useState(new Date());
  const [type, setType] = useState("");
  const [stage, setStage] = useState<keyof Data | null>(null);
  const [itemCode, setItemCode] = useState("");
  const [routeCode, setRouteCode] = useState("");
  const [employee, setEmployee] = useState("Diệp Minh Dũng");
  const [approved, setApproved] = useState(false);
  const [close, setClose] = useState(false);
  const [note, setNote] = useState("");
  const [ref, setRef] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const [data, setData] = useState<Data>({
    VEN: [],
    MAC: [],
    SAM: [],
  });


  useEffect(() => {
    if (stage) {
      const fetchData = async () => {
        // Giả lập dữ liệu
        const responseData = {
          VEN: [
            {
              orderID: "24-0040257",
              itemCode: "RH887333.WLB.00",
              clientPO: "PO-12345",
              componentID: "COMP-67890",
              routeCode: "WO-05-2024-00015_124",
            },
            {
              orderID: "24-0040257",
              itemCode: "RH887333.WLB.00",
              clientPO: "PO-12345",
              componentID: "COMP-67890",
              routeCode: "WO-05-2024-00015_124",
            },

          ],
          MAC: [
            {
              orderID: "24-0040258",
              itemCode: "RH887333.WLB.01",
              clientPO: "PO-54321",
              componentID: "COMP-09876",
              routeCode: "WO-05-2024-00015_124",
            },
          ],
          SAM: [
            {
              orderID: "24-0040259",
              itemCode: "RH887333.WLB.02",
              clientPO: "RH887333.WLB.00",
              componentID: "RH887333.WLB.00",
              routeCode: "RH887333.WLB.00",
            },
          ],
        };
        
        // Cập nhật dữ liệu
        setData(responseData);
      };
      fetchData();
    }
  }, [stage]);
  

  // QR data mapping
  const qrData: { [key: string]: { orderID: string; itemCode: string; clientPO: string; componentID: string; routeCode: string } } = {
    "24-0040257": {
        orderID: "24-0040257", 
        itemCode: "RH887333.WLB.00", 
        clientPO: "PO-12345", 
        componentID: "COMP-67890", 
        routeCode: "WO-05-2024-00015_124",
    },
    "24-0040258": {
        orderID: "24-0040258", 
        itemCode: "RH887333.WLB.00",
        clientPO: "PO-54321", 
        componentID: "COMP-09876",
        routeCode: "WO-05-2024-00015_124",
    },
};


  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert(
          "Quyền bị từ chối",
          "Cần phải có quyền truy cập máy ảnh để quét mã QR."
        );
      }
    };
    requestPermissions();
  }, []);

  const handleDateConfirm = (date: Date) => {
    setCreateDate(date);
    setDatePickerVisibility(false);
  };

  const resetForm = () => {
    setOrderID("");
    setCreateDate(new Date());
    setType("");
    setStage(null);
    setItemCode("");
    setRouteCode("");
    setEmployee("Diệp Minh Dũng");
    setApproved(false);
    setClose(false);
    setNote("");
    setRef("");
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setOrderID(data);
    const qrInfo = qrData[data];

    if (qrInfo) {
      setItemCode(qrInfo.itemCode);
      setRouteCode(qrInfo.routeCode);

      // Kiểm tra các thông tin cần thiết
      const isComplete = qrInfo.orderID === data && 
                         qrInfo.itemCode && 
                         qrInfo.clientPO && 
                         qrInfo.componentID && 
                         qrInfo.routeCode;

      if (isComplete) {
        Alert.alert("Hoàn thành", "Tất cả thông tin đã được xác nhận.");
        setIsCompleted(true);  // Cập nhật trạng thái hoàn thành
        // Thực hiện hành động hoàn thành nếu cần
      } else {
        Alert.alert("Thông tin không đầy đủ", "Vui lòng kiểm tra lại các thông tin.");
        setIsCompleted(false); // Reset trạng thái nếu không hoàn thành
      }
    } else {
      Alert.alert(
        "Không tìm thấy dữ liệu",
        `Không tìm thấy dữ liệu cho các thông tin đã quét QR code: ${data}`
      );
      setIsCompleted(false); // Reset trạng thái nếu không tìm thấy dữ liệu
    }
    setIsScanning(false);
  };


  if (hasPermission === null) {
    return <Text>Yêu cầu cấp phép sử dụng máy ảnh...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không có quyền truy cập vào máy ảnh</Text>;
  }
  return (
    <SafeAreaView
      style={[tw`flex-1 mt-5`, { backgroundColor: COLORS.colorMain }]}
    >
      {/* Header */}
      <View
        style={[
          tw`flex-row items-center py-2 px-5 mt-5`,
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
            tw`flex-1 text-center`,
            {
              color: COLORS.black,
              fontFamily: "CustomFont-Bold",
              fontSize: 16,
            },
          ]}
        >
          Output
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateOutPut")}
          style={tw`p-2`}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`mb-4 flex-row items-center`}>
          <Text style={tw`mb-1`}>Order ID:</Text>
          <TextInput
            style={tw`border border-gray-400 rounded p-2 flex-1`}
            value={String(orderID)}
            onChangeText={(text) => setOrderID(text)} 
          />
        </View>
        <View style={tw`flex-row mb-4 items-center justify-between`}>
          <View style={tw`flex-1 mr-2`}>
            <Text style={tw`mb-1`}>Create Date:</Text>
            <TouchableOpacity
              style={tw`border border-gray-400 rounded p-2 flex-row justify-between items-center`}
              onPress={() => setDatePickerVisibility(true)}
            >
              <Text>{createDate.toLocaleDateString()}</Text>
              <MaterialCommunityIcons name="calendar" size={24} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisibility(false)}
              date={createDate}
            />
          </View>
          <View style={tw`flex-row items-center mt-5`}>
            <CheckBox
              isChecked={approved}
              onClick={() => setApproved(!approved)}
              checkBoxColor={COLORS.lightGray}
              checkedCheckBoxColor={COLORS.red}
              uncheckedCheckBoxColor={COLORS.black}
              style={{ transform: [{ scale: 1 }] }}
            />
            <Text style={tw`ml-2`}>Approved</Text>
            <CheckBox
              isChecked={close}
              onClick={() => setClose(!close)}
              checkBoxColor={COLORS.lightGray}
              checkedCheckBoxColor={COLORS.red}
              uncheckedCheckBoxColor={COLORS.black}
              style={{ transform: [{ scale: 1 }] }}
            />
            <Text style={tw`ml-2`}>Close</Text>
          </View>
        </View>
        <View style={tw`mb-4 `}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-1 items-center`}>
              <Text style={tw``}>Type:</Text>
              <RNPickerSelect
                placeholder={{ label: "Chọn loại...", value: null }}
                items={[{ label: "CAR", value: "CAR" }]}
                onValueChange={(value) => setType(value)}
                style={pickerSelectStyles}
              />
            </View>
            <View style={tw`flex-1 items-center `}>
              <Text style={tw`mr-2`}>Stage:</Text>
              <RNPickerSelect
                placeholder={{ label: "Chọn giai đoạn...", value: null }}
                items={[
                  { label: "VEN", value: "VEN" },
                  { label: "MAC", value: "MAC" },
                  { label: "SAM", value: "SAM" },
                ]}
                onValueChange={(value) => setStage(value)}
                style={pickerSelectStyles}
              />
            </View>
          </View>
        </View>
        <View style={tw`mb-4`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-1 mr-2`}>
              <Text style={tw`mb-1`}>Employee:</Text>
              <RNPickerSelect
                onValueChange={setEmployee}
                items={[
                  { label: "Diệp Minh Dũng", value: "Diệp Minh Dũng" },
                  { label: "Nguyễn Văn A", value: "Nguyễn Văn A" },
                ]}
                style={pickerSelectStyles}
                value={employee}
              />
            </View>
          </View>
          <View style={tw`my-4`}>
            <Text style={tw`mb-1`}>Note:</Text>
            <TextInput
              style={tw`border border-gray-400 rounded p-2`}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`mb-1`}>Ref:</Text>
            <TextInput
              style={tw`border border-gray-400 rounded p-2`}
              value={ref}
              onChangeText={setRef}
            />
          </View>
          {stage && (
  <View style={tw`mt-4`}>
    <Text style={tw`text-lg font-bold`}>Items in {stage}:</Text>
    {data[stage].map((item: Item, index: number) => (
      <View key={index} style={tw`border p-2 rounded mb-2`}>
        <Text>Order ID: {item.orderID}</Text>
        <Text>Item Code: {item.itemCode}</Text>
        <Text>Client PO: {item.clientPO}</Text>
        <Text>Route Code: {item.routeCode}</Text>
        <Text>Component ID: {item.componentID}</Text>

        {/* Nút quét mã QR cho từng item */}
        <View style={tw`flex-row items-center mt-4`}>
          <TouchableOpacity
            onPress={() => setIsScanning(true)}
            style={tw`p-3 bg-blue-600 rounded-full shadow-md`}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={30}
              color={COLORS.white} 
            />
          </TouchableOpacity>
        </View>
        {isScanning && (
          <CameraView
            style={tw`h-64 w-full mt-4 rounded-lg overflow-hidden border border-gray-300`}
            onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
          />
        )}
      </View>
    ))}

    {isCompleted && (
      <MaterialCommunityIcons name="check-circle" size={24} color="green" style={tw`mt-2`} />
    )}
  </View>
)}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, 
  },
};
export default CreateOutPutScreen;
