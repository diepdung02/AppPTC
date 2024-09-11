import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import tw from 'twrnc';
import COLORS from "../../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigator/navigation";
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

  // Các giá trị dropdown
  const [routeCode, setRouteCode] = useState('');
  const [clientPo, setClientPo] = useState('');
  const [drawingCodeCarCass, setDrawingCodeCarCass] = useState('');
  const [drawingCodeHardware, setDrawingCodeHardware] = useState('');
  const [inspector, setInspector] = useState('');
  const [inspectionLocation, setInspectionLocation] = useState('');

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
  };

  // Options cho các dropdown picker
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
      { label: 'Inspector 1', value: 'inspector1' },
      { label: 'Inspector 2', value: 'inspector2' },
      { label: 'Inspector 3', value: 'inspector3' },
    ],
    inspectionLocation: [
      { label: 'Location 1', value: 'location1' },
      { label: 'Location 2', value: 'location2' },
      { label: 'Location 3', value: 'location3' },
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

  const handleItemCodeChange = useCallback((code: string) => {
    setItemCode(code);

    // Cập nhật các giá trị dropdown dựa trên mã sản phẩm
    if (code === 'GV811551.GVZ.00') {
      setRouteCode('WO-05-2021-00031_17');
      setClientPo('WO-05-2021-00031_17');
      setDrawingCodeCarCass('DRA 23964');
      setDrawingCodeHardware('DRA 23964');
      setColorCode('P-4531/GZ1.GV');
    } else if (code === 'GV811552.GVZ.01') {
      setRouteCode('WO-06-2022-00045_22');
      setClientPo('WO-06-2022-00045_22');
      setDrawingCodeCarCass('DRA 34027');
      setDrawingCodeHardware('DRA 34027');
      setColorCode('P-4532/GZ2.GV');
    } else if (code === 'GV811553.GVZ.02') {
      setRouteCode('WO-07-2023-00056_23');
      setClientPo('WO-07-2023-00056_23');
      setDrawingCodeCarCass('DRA 45218');
      setDrawingCodeHardware('DRA 45218');
      setColorCode('P-4533/GZ3.GV');
    } else {
      // Reset giá trị nếu không khớp mã sản phẩm
      setRouteCode('');
      setClientPo('');
      setDrawingCodeCarCass('');
      setDrawingCodeHardware('');
      setColorCode('');
    }
  }, []);

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
    <SafeAreaView style={[tw`flex-1`, {backgroundColor:COLORS.colorMain}]}>
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
            <Text style={[tw`text-xl flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold', fontSize: getScaledSize(20) }]}>
            Upload QC Image
            </Text>
          </View>
      <ScrollView contentContainerStyle={tw`p-5`}>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Item Code:</Text>
          <TextInput
            style={[tw`border rounded-lg p-2`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={itemCode}
            onChangeText={handleItemCodeChange}
            placeholder="Enter Item Code"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Quantity:</Text>
          <TextInput
            style={[tw`border rounded-lg p-2`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter Quantity"
            keyboardType="numeric"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>WO/PO Quantity:</Text>
          <TextInput
            style={[tw`border rounded-lg p-2`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={woPoQuantity}
            onChangeText={setWoPoQuantity}
            placeholder="Enter WO/PO Quantity"
            keyboardType="numeric"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Notes:</Text>
          <TextInput
            style={[tw`border rounded-lg p-2`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Enter Notes"
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Color Code:</Text>
          <TextInput
            style={[tw`border rounded-lg p-2`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}
            value={colorCode}
            onChangeText={setColorCode}
            placeholder="Enter Color Code"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Route Code:</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Route Code", value: "" }}
            items={filteredOptions.routeCode}
            onValueChange={setRouteCode}
            value={routeCode}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Client PO:</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Client PO", value: "" }}
            items={filteredOptions.clientPo}
            onValueChange={setClientPo}
            value={clientPo}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Drawing Code (Car Cass):</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Drawing Code Car Cass", value: "" }}
            items={filteredOptions.drawingCodeCarCass}
            onValueChange={setDrawingCodeCarCass}
            value={drawingCodeCarCass}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Drawing Code (Hardware):</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Drawing Code Hardware", value: "" }}
            items={filteredOptions.drawingCodeHardware}
            onValueChange={setDrawingCodeHardware}
            value={drawingCodeHardware}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Inspector:</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Inspector", value: "" }}
            items={options.inspector}
            onValueChange={setInspector}
            value={inspector}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Inspection Location:</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Inspection Location", value: "" }}
            items={options.inspectionLocation}
            onValueChange={setInspectionLocation}
            value={inspectionLocation}
            style={pickerSelectStyles}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>Inspection Date:</Text>
          <TouchableOpacity onPress={showDatePicker} style={[tw`border rounded-lg p-2`, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]}>
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
          style={[tw` p-3 rounded-lg`, { alignItems: 'center', backgroundColor:COLORS.blue }]}
          onPress={() => {}}
        >
          <Text style={[tw`text-white text-lg`]} >Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Custom style cho RNPickerSelect
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
