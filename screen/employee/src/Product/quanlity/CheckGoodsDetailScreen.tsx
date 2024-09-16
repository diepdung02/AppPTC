import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../../../../constants/Color";

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

type Report = {
  stt: number;
  reportNo: string;
  ponoOrRoute: string;
  itemCode: string;
  itemMaterial: string;
  locationOrTeam: string;
  qty: number;
  qtyRealCheck: number;
  requestDate: string;
  confirmDate: string;
  checkAndVerifyBy: string;
  status: string;
  created: string;
  noted: string;
  reason: string;
  action: string;
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

const CheckGoodsDetailScreen: React.FC = ({ navigation, route }: any) => {
  const { report }: { report: Report | undefined } = route.params;

  const handleUploadQcImage = () => {
    navigation.navigate("UploadQcImageScreen");
  };

  if (!report) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text
          style={{
            fontFamily: "CustomFont-Regular",
            fontSize: getScaledSize(14),
            color: COLORS.text,
          }}
        >
          Không có dữ liệu kiểm hàng.
        </Text>
      </SafeAreaView>
    );
  }

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
            tw` flex-1 text-center`,
            { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize: getScaledSize(18), },
          ]}
        >
          Chi tiết kiểm hàng
        </Text>
      </View>
      <ScrollView style={tw`p-4`}>
        <View style={[tw`mb-1 p-4 rounded-lg shadow-lg`, {backgroundColor:COLORS.white}]}>
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
            Thông tin kiểm hàng
          </Text>

          <View style={tw`border-t border-gray-200 pt-4`}>
            {[
              { label: "Report No", value: report.reportNo },
              { label: "Confirm Date", value: report.confirmDate },
              { label: "PONO/Route", value: report.ponoOrRoute },
              { label: "Item Code", value: report.itemCode },
              { label: "Item Vật Tư", value: report.itemMaterial },
              { label: "Location/Team", value: report.locationOrTeam },
              { label: "Qty", value: report.qty },
              { label: "Material: ", value: "follow PTC's standard/ Drawing" },
              { label: "Được kiểm bởi: ", value: " QC Nguyễn Trọng An" },
              { label: "Trạng Thái:", value: "Hoàn thành" },
              { label: "Hoàn thành lúc:", value: "08:27 07-08-2023" },
              { label: "Qty Check", value: String(report.qty) },
              { label: "Qty Reject", value: String(report.qtyRealCheck) },
              { label: "Lý Do", value: report.reason },
              { label: "Xử Lý", value: report.action },
            ].map((item, index) => (
              <View
                key={index}
                style={tw`flex-row justify-between items-center mb-2`}
              >
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                      width: "45%",
                    },
                  ]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.label}:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                      flex: 1,
                    },
                  ]}
                  numberOfLines={0}
                  ellipsizeMode="tail"
                >
                  {item.value}
                </Text>
              </View>
            ))}
            <View style={tw`flex-1 justify-center items-center`}>
              <TouchableOpacity
                style={[tw`p-4 rounded`, { backgroundColor: COLORS.blue }]}
                onPress={handleUploadQcImage}
              >
                <Text style={[tw``,{fontFamily: "CustomFont-Regular", fontSize: getScaledSize(14),}]}>
                  New Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckGoodsDetailScreen;
