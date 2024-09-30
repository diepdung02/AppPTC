import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import tw from 'twrnc';
import COLORS from "../../../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../navigator/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

// Hàm tính kích thước responsive
const scaleWidth = initialWidth / 375; 
const scaleHeight = initialHeight / 667; 

const getScaledSize = (size: number, isWidth = true) => {
  const minWidth = 320;
  const maxWidth = 1024;
  const width = Dimensions.get('window').width;

  if (width < minWidth) {
    return size * 0.5;
  } else if (width > maxWidth) {
    return size * 1.2;
  }
  
  return isWidth ? size * scaleWidth : size * scaleHeight;
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "CheckGoodsDetailScreen">;
};

const UploadQcImageScreen: React.FC<Props> = ({ navigation }) => {
  const [itemCode, setItemCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [woPoQuantity, setWoPoQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [colorCode, setColorCode] = useState('');
  const [inspectionDate, setInspectionDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [refreshing, setRefreshing] = useState(false); 
  const [routeCode, setRouteCode] = useState('');
  const [clientPo, setClientPo] = useState('');
  const [drawingCodeCarCass, setDrawingCodeCarCass] = useState('');
  const [drawingCodeHardware, setDrawingCodeHardware] = useState('');
  const [inspector, setInspector] = useState('');
  const [inspectionLocation, setInspectionLocation] = useState('');
  const [typeOfInspection, setTypeOfInspection] = useState('');
  const [status, setStatus] = useState('');
  const [isFullCodeSet, setIsFullCodeSet] = useState(false);

  type Option = {
    label: string;
    value: string;
  };

  type Options = {
    routeCode: Option[];
    clientPo: Option[];
    drawingCodeCarCass: Option[];
    drawingCodeHardware: Option[];
    inspector: Option[];
    inspectionLocation: Option[];
    typeOfInspection: Option[];
    status: Option[];
  };


  const options: Options = {
    routeCode: [
      { label: 'WO-05-2021-00031_17', value: 'WO-05-2021-00031_17' },
      { label: 'WO-06-2022-00045_22', value: 'WO-06-2022-00045_22' },
      { label: 'WO-07-2023-00056_23', value: 'WO-07-2023-00056_23' },
    ],
    clientPo: [
      { label: 'WO-05-2021-00031_17', value: 'WO-05-2021-00031_17' },
      { label: 'WO-06-2022-00045_22', value: 'WO-06-2022-00045_22' },
      { label: 'WO-07-2023-00056_23', value: 'WO-07-2023-00056_23' },
    ],
    drawingCodeCarCass: [
      { label: 'DRA 23964', value: 'DRA 23964' },
      { label: 'DRA 34027', value: 'DRA 34027' },
      { label: 'DRA 45218', value: 'DRA 45218' },
    ],
    drawingCodeHardware: [
      { label: 'DRA 23964', value: 'DRA 23964' },
      { label: 'DRA 34027', value: 'DRA 34027' },
      { label: 'DRA 45218', value: 'DRA 45218' },
    ],
    inspector: [
      { label: 'QC ERP', value: 'QC ERP' },
      { label: 'QC Bùi Thị Hồng', value: 'QC Bùi Thị Hồng' },
      { label: 'QC Bùi Văn Dụng', value: 'QC Bùi Văn Dụng' },
    ],
    inspectionLocation: [
      { label: 'Antique 2 - PTC 2 - Làm màu giả cổ ', value: 'Antique 2 - PTC 2 - Làm màu giả cổ ' },
      { label: 'Deg - PTC 2 - Làm cũ gương - PTC2', value: 'Deg - PTC 2 - Làm cũ gương - PTC2' },
      { label: 'Fit-wash - Ptc 2 - Ráp - Ptc 2', value: 'Fit-wash - Ptc 2 - Ráp - Ptc 2' },
    ],
    typeOfInspection: [
      { label: 'CarCass', value: 'CarCass' },
      { label: 'Final', value: 'Final' },
      { label: 'Frame', value: 'Frame' },
    ],
    status: [
      { label: 'Đạt', value: 'Đạt' },
      { label: 'Không đạt', value: 'Không đạt' },
    ],
    
  };

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = useCallback((date: Date) => {
    setInspectionDate(date);
    hideDatePicker();
  }, [hideDatePicker]);
  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

 // Mapping các mã sản phẩm
const codeMapping: { [key: string]: string } = {
  'GV8115': 'GV811551.GVZ.00',
  'GV8116': 'GV811652.GVZ.01',
  'GV8117': 'GV811753.GVZ.02',
};

// Hàm xử lý khi mã sản phẩm thay đổi
const handleItemCodeChange = useCallback((code: string) => {
  const normalizedCode = code.toLowerCase(); // Chuyển đổi mã nhập vào thành chữ thường
  setItemCode(code); // Cập nhật itemCode từ đầu vào

  const fullCode = Object.keys(codeMapping).find(key => normalizedCode.startsWith(key.toLowerCase())); // Tìm fullCode từ codeMapping
  const completeCode = fullCode ? codeMapping[fullCode] : '';

  // Định nghĩa chi tiết cho từng mã
  const codeDetails: { [key: string]: { routeCode: string, clientPo: string, drawingCodeCarCass: string, drawingCodeHardware: string, colorCode: string } } = {
    'gv811551.gvz.00': {
      routeCode: 'WO-05-2021-00031_17',
      clientPo: 'WO-05-2021-00031_17',
      drawingCodeCarCass: 'DRA 23964',
      drawingCodeHardware: 'DRA 23964',
      colorCode: 'P-4531/GZ1.GV',
    },
    'gv811652.gvz.01': {
      routeCode: 'WO-06-2022-00045_22',
      clientPo: 'WO-06-2022-00045_22',
      drawingCodeCarCass: 'DRA 34027',
      drawingCodeHardware: 'DRA 34027',
      colorCode: 'P-4532/GZ2.GV',
    },
    'gv811753.gvz.02': {
      routeCode: 'WO-07-2023-00056_23',
      clientPo: 'WO-07-2023-00056_23',
      drawingCodeCarCass: 'DRA 45218',
      drawingCodeHardware: 'DRA 45218',
      colorCode: 'P-4533/GZ3.GV',
    },
  };

  // Nếu mã trống thì đặt lại trạng thái
  if (code.length === 0) {
    setIsFullCodeSet(false);
    return; // Dừng tại đây nếu mã trống
  }

  // Nếu tìm thấy mã đầy đủ trong codeMapping
  if (completeCode) {
    // Khi nhập ít hơn 15 ký tự và chưa hoàn thành mã
    if (code.length < 15) {
      if (!isFullCodeSet) {
        setItemCode(completeCode); // Cập nhật mã đầy đủ từ codeMapping vào itemCode
        setIsFullCodeSet(true); // Đánh dấu đã có mã đầy đủ

        // Cập nhật thông tin dựa trên mã đầy đủ
        const details = codeDetails[completeCode.toLowerCase()];
        if (details) {
          setRouteCode(details.routeCode);
          setClientPo(details.clientPo);
          setDrawingCodeCarCass(details.drawingCodeCarCass);
          setDrawingCodeHardware(details.drawingCodeHardware);
          setColorCode(details.colorCode);
        }
      }
    } 
    // Khi nhập đủ 15 ký tự và mã đầy đủ đã khớp
    else if (completeCode.toLowerCase() === normalizedCode) {
      setRouteCode('');
      setClientPo('');
      setDrawingCodeCarCass('');
      setDrawingCodeHardware('');
      setColorCode('');
      setIsFullCodeSet(false); // Đặt lại trạng thái mã đầy đủ khi đủ 15 ký tự
    }
  } else {
    // Khi nhập mã không có trong codeMapping
    if (code.length >= 15) {
      setItemCode(''); // Đặt lại itemCode khi mã không hợp lệ
      setRouteCode('');
      setClientPo('');
      setDrawingCodeCarCass('');
      setDrawingCodeHardware('');
      setColorCode('');
      setIsFullCodeSet(false); 
    }
  }
}, [codeMapping, itemCode, isFullCodeSet]);


// Lọc các giá trị cho dropdown chỉ hiển thị các giá trị khớp
const filteredOptions = {
  routeCode: options.routeCode.filter(option => option.value === routeCode),
  clientPo: options.clientPo.filter(option => option.value === clientPo),
  drawingCodeCarCass: options.drawingCodeCarCass.filter(option => option.value === drawingCodeCarCass),
  drawingCodeHardware: options.drawingCodeHardware.filter(option => option.value === drawingCodeHardware),
  inspector: options.inspector, // Luôn hiển thị tất cả
  inspectionLocation: options.inspectionLocation, // Luôn hiển thị tất cả
};



  return (
    <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, {backgroundColor:COLORS.colorMain}]}>
     <View  style={[
          tw`flex-row items-center mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white, padding: getScaledSize(10) },
        ]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[tw`p-2`, { borderRadius: 50 }]}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="arrow-left" size={getScaledSize(24)} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={[tw` flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(18) }]}>
            Tải thông tin sản phẩm
            </Text>
          </View>
      <ScrollView contentContainerStyle={tw`p-${getScaledSize(5)}`}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Kiểu kiểm hàng:</Text>
          <RNPickerSelect
            placeholder={{ label: "--Kiểu kiểm hàng--", value: "" }}
            items={options.typeOfInspection}
            onValueChange={setTypeOfInspection}
            value={typeOfInspection}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
  <Text style={[tw`mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(16) }]}>Mã sản phẩm:</Text>
  <TextInput
    style={[tw`border rounded-lg p-${getScaledSize(2)}`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
    value={itemCode}
    onChangeText={handleItemCodeChange}
    placeholder="--Nhập tìm ItemCode ít nhất 6 kí tự--"
    maxLength={15}
  />
</View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Item Code:</Text>
          <TextInput
            style={[tw`border rounded-lg p-${getScaledSize(2)}`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={itemCode}
            onChangeText={handleItemCodeChange}
            editable={false}
          />
        </View>
          <View style={tw`flex-row justify-between`}> 
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Số lượng kiểm:</Text>
          <TextInput
            style={[tw`border rounded-lg p-${getScaledSize(2)}`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="--Số lượng kiểm--"
            keyboardType="numeric"
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Số lượng WO/PO:</Text>
          <TextInput
            style={[tw`border rounded-lg p-${getScaledSize(2)}`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={woPoQuantity}
            onChangeText={setWoPoQuantity}
            placeholder="--Số lượng WO/PO--"
            keyboardType="numeric"
          />
        </View>
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Color Code:</Text>
          <TextInput
            style={[tw`border rounded-lg p-${getScaledSize(2)}`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={colorCode}
            onChangeText={setColorCode}
            placeholder="--Color Code--"
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Mã Route:</Text>
          <RNPickerSelect
            placeholder={{ label: "--Chọn Router Code--", value: "" }}
            items={filteredOptions.routeCode}
            onValueChange={setRouteCode}
            value={routeCode}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Client PO:</Text>
          <RNPickerSelect
            placeholder={{ label: "--Chọn PO--", value: "" }}
            items={filteredOptions.clientPo}
            onValueChange={setClientPo}
            value={clientPo}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Mã bản vẽ CarCass:</Text>
          <RNPickerSelect
            placeholder={{ label: "-- Chọn mã bản vẽ CarCass--", value: "" }}
            items={filteredOptions.drawingCodeCarCass}
            onValueChange={setDrawingCodeCarCass}
            value={drawingCodeCarCass}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Mã bản vẽ HardWare:</Text>
          <RNPickerSelect
            placeholder={{ label: "--Chọn mã bản vẽ HardWare--", value: "" }}
            items={filteredOptions.drawingCodeHardware}
            onValueChange={setDrawingCodeHardware}
            value={drawingCodeHardware}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Người kiểm hàng:</Text>
          <RNPickerSelect
            placeholder={{ label: "--Chọn người kiểm hàng--", value: "" }}
            items={options.inspector}
            onValueChange={setInspector}
            value={inspector}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Nơi kiểm hàng:</Text>
          <RNPickerSelect
            placeholder={{ label: "--Chọn nơi kiểm hàng", value: "" }}
            items={options.inspectionLocation}
            onValueChange={setInspectionLocation}
            value={inspectionLocation}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Ghi chú:</Text>
          <TextInput
            style={[tw`border rounded-lg p-${getScaledSize(2)}`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="--Ghi chú--"
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={tw`mb-${getScaledSize(4)}`}>
          <Text style={[tw` mb-${getScaledSize(2)}`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize:getScaledSize(16) }]}>Ngày kiểm hàng:</Text>
          <TouchableOpacity onPress={showDatePicker} style={[tw`border rounded-lg p-${getScaledSize(2)}`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}>
            <Text>{inspectionDate.toDateString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={inspectionDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <TouchableOpacity
          style={[tw` p-${getScaledSize(3)} rounded-lg`, { alignItems: 'center', backgroundColor:COLORS.blue }]}
          onPress={() => navigation.navigate("UploadCarCassScreen")}
        >
          <Text style={[{color:COLORS.white, fontSize:getScaledSize(16), fontFamily: 'CustomFont-Regular'}]} >Lưu lại và tải hình ảnh</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const pickerSelectStyles = {
  inputIOS: {
    fontSize: getScaledSize(16),
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    color: COLORS.primary,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: getScaledSize(16),
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    color: COLORS.primary,
    marginBottom: 10,
  },
};

export default UploadQcImageScreen;