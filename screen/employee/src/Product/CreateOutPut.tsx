import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import COLORS from "../../../../constants/Color";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';

const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

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

const CreateOrderScreen: React.FC = ({ navigation }: any) => {
  const [orderID, setOrderID] = useState('');
  const [createDate, setCreateDate] = useState<string>('');
  const [type, setType] = useState('');
  const [stage, setStage] = useState('');
  const [employee, setEmployee] = useState('');
  const [approved, setApproved] = useState(false);
  const [close, setClose] = useState(true);
  const [note, setNote] = useState('');
  const [ref, setRef] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to scan QR codes.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestCameraPermission();
  }, []);

  const handleDateConfirm = (date: Date) => {
    setCreateDate(date.toLocaleDateString());
    setDatePickerVisibility(false);
  };

  const handleSubmit = async () => {
    const data = {
      orderID,
      createDate,
      type,
      stage,
      employee,
      approved,
      close,
      note,
      ref,
    };
    console.log("Submitted Data:", data);
    Alert.alert("Submit", `Order Created: ${JSON.stringify(data, null, 2)}`);
  };

  const handleBarCodeRead = (e: any) => {
    const { data } = e;
    setOrderID(data);
    Alert.alert(`Scanned barcode`, `Data: ${data}`);
    setIsScanning(false);
  };

  return (
    <SafeAreaView
      style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}
    >
      <View
        style={[tw`flex-row items-center py-${getScaledSize(2.5)} px-${getScaledSize(5)} mt-${getScaledSize(5)}`, { backgroundColor: COLORS.white }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2`}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={[tw`flex-1 text-center`, { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) }]}>
          Output
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("CreateOutPut")}
          style={tw`p-${getScaledSize(2)}`}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 p-4`}>
        <View style={tw`mb-4`}>
          <Text style={tw`mb-1`}>Order ID:</Text>
          <TextInput
            style={tw`border border-gray-400 rounded p-2`}
            value={String(orderID)}
            keyboardType="numeric"
            onChangeText={text => setOrderID(text)}
          />
        </View>

        {/* Camera for QR Code Scanner */}
        {isScanning ? (
          <RNCamera
            style={tw`h-64 w-full`}
            onBarCodeRead={handleBarCodeRead}
            captureAudio={false}
          >
            <View style={tw`flex-1 justify-center align-items-center`}>
              <Text style={tw`text-white`}>Scan the QR Code</Text>
            </View>
          </RNCamera>
        ) : (
          <TouchableOpacity onPress={() => setIsScanning(true)} style={tw`bg-blue-500 p-2 rounded mb-4`}>
            <Text style={tw`text-white text-center`}>Start Scanning</Text>
          </TouchableOpacity>
        )}

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1`}>Create Date:</Text>
          <TouchableOpacity 
            style={tw`border border-gray-400 rounded p-2 flex-row justify-between items-center`} 
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text>{createDate || "Select Date"}</Text>
            <MaterialCommunityIcons name="calendar" size={24} />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
          date={new Date()}
        />

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1`}>Type:</Text>
          <TextInput
            style={tw`border border-gray-400 rounded p-2`}
            value={type}
            onChangeText={text => setType(text)}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1`}>Stage:</Text>
          <TextInput
            style={tw`border border-gray-400 rounded p-2`}
            value={stage}
            onChangeText={text => setStage(text)}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1`}>Employee:</Text>
          <TextInput
            style={tw`border border-gray-400 rounded p-2`}
            value={employee}
            onChangeText={text => setEmployee(text)}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1`}>Reference (Ref):</Text>
          <TextInput
            style={tw`border border-gray-400 rounded p-2`}
            value={ref}
            onChangeText={text => setRef(text)}
          />
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`mb-1`}>Note:</Text>
          <TextInput
            style={tw`border border-gray-400 rounded p-2`}
            value={note}
            onChangeText={text => setNote(text)}
          />
        </View>

        <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={handleSubmit}>
          <Text style={tw`text-white text-center`}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateOrderScreen;
