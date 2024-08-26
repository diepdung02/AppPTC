import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import tw from 'twrnc';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from "react-native-check-box";
import COLORS from '../../../../constants/Color';

type Report = {
  stt: number;
  reportNo: string;
  ponoOrRoute: string;
  itemCode: string;
  itemMaterial: string;
  locationOrTeam: string;
  qty: number;
  requestDate: string;
  confirmDate: string;
  checkAndVerifyBy: string;
  status: string;
  created: string;
  noted: string;
  detail: {
    item: string;
    name: string;
    route: string;
    po: string;
    team: string;
    booker: string;
    location: string;
    qcPerson: string;
    confirmDate: string;
    quantity: number;
    status: string;
    actualCheckedQuantity: number;
    rejectedQuantity: number;
    overall: string;
    material: string;
    lamination: string;
    machinery: string;
    carving: string;
    veneer: string;
    wirebrush: string;
    assembly: string;
    finishing: string;
    upholstery: string;
    packing: string;
    planning: string;
    action: string;
  };
};

const ErrorDetailScreen = ({ navigation, route }: any) => {
  const { report }: { report: Report | undefined } = route.params;
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  if (!report) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text>Không có dữ liệu báo lỗi.</Text>
      </SafeAreaView>
    );
  }

  const handleStartCheck = () => {
    if (selectedItems.size === 0) {
      Alert.alert("Chưa chọn phần tử", "Vui lòng chọn ít nhất một phần tử để kiểm tra.");
      return;
    }

    // Điều hướng đến màn hình kiểm tra với các phần tử đã chọn
    navigation.navigate('CheckDetailScreen', { selectedItems: Array.from(selectedItems) });
  };

  const handleComplete = () => {
    Alert.alert("Hoàn thành", "Báo lỗi đã được hoàn thành.");
  };

  const handleSelect = (value: string) => {
    setSelectedItems(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(value)) {
        newSelected.delete(value);
      } else {
        newSelected.add(value);
      }
      return newSelected;
    });
  };

  const renderCheckboxGroup = (title: string, content: string) => {
    const options = content.split('\n').map(item => item.trim()).filter(item => item);

    return (
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold`}>{title}</Text>
        {options.map((option, index) => (
          <View key={index} style={tw`flex-row items-center my-2`}>
            <CheckBox
              value={selectedItems.has(option)}
              onValueChange={() => handleSelect(option)}
              tintColors={{ true: COLORS.blue, false: COLORS.gray }}
            />
            <Text style={tw`ml-2 text-lg`}>{option}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View style={[tw`flex-row items-center py-2.5 px-5`, { backgroundColor: COLORS.white }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[tw`text-xl flex-1 text-center`, { color: COLORS.black, fontFamily: 'CustomFont-Bold' }]}>
          Chi tiết báo lỗi
        </Text>
      </View>

      <ScrollView style={tw`p-4`}>
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold`}>Thông tin báo lỗi</Text>
          <View style={tw`mt-2`}>
            <Text>Report No: {report.reportNo}</Text>
            <Text>PONO/Route: {report.ponoOrRoute}</Text>
            <Text>Item Code: {report.itemCode}</Text>
            <Text>Item Vật Tư: {report.itemMaterial}</Text>
            <Text>Location/Team: {report.locationOrTeam}</Text>
            <Text>Qty: {report.qty}</Text>
            <Text>Request Date: {report.requestDate}</Text>
            <Text>Confirm Date: {report.confirmDate}</Text>
            <Text>Check & Verify by: {report.checkAndVerifyBy}</Text>
            <Text>Status: {report.status}</Text>
            <Text>Created: {report.created}</Text>
            <Text>Noted: {report.noted}</Text>
          </View>
        </View>

        {renderCheckboxGroup("Overall", report.detail?.overall || '')}
        {renderCheckboxGroup("Material", report.detail?.material || '')}
        {renderCheckboxGroup("Lamination", report.detail?.lamination || '')}
        {renderCheckboxGroup("Machinery", report.detail?.machinery || '')}
        {renderCheckboxGroup("Carving", report.detail?.carving || '')}
        {renderCheckboxGroup("Veneer", report.detail?.veneer || '')}
        {renderCheckboxGroup("Wirebrush", report.detail?.wirebrush || '')}
        {renderCheckboxGroup("Assembly", report.detail?.assembly || '')}
        {renderCheckboxGroup("Finishing", report.detail?.finishing || '')}
        {renderCheckboxGroup("Upholstery", report.detail?.upholstery || '')}
        {renderCheckboxGroup("Packing", report.detail?.packing || '')}
        {renderCheckboxGroup("Planning", report.detail?.planning || '')}

        <View>
          <Text style={tw`text-lg font-bold text-gray-700 mb-2`}>Action</Text>
          <TouchableOpacity
            onPress={handleStartCheck}
            style={tw`bg-blue-500 p-3 rounded mb-3 flex-row items-center justify-center`}
          >
            <Text style={tw`text-white text-lg`}>Bắt đầu kiểm tra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleComplete}
            style={tw`bg-green-500 p-3 rounded flex-row items-center justify-center`}
          >
            <Text style={tw`text-white text-lg`}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ErrorDetailScreen;
