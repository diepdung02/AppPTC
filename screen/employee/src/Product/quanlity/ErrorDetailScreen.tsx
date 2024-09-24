import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  TextInput,
  RefreshControl
} from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import COLORS from "../../../../../constants/Color";
import RNPickerSelect from "react-native-picker-select";

const { width, height } = Dimensions.get("window");

// Base dimensions for scaling
const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

// Calculate scale based on the smaller ratio
const scaleWidth = width / BASE_WIDTH;
const scaleHeight = height / BASE_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

const getScaledSize = (size: number) => Math.round(size * scale);

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

const ErrorDetailScreen: React.FC = ({ navigation, route }: any) => {
  const { report }: { report: Report | undefined } = route.params;
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownContent, setDropdownContent] = useState<string[]>([]);
  const [actualCheckedQuantity, setActualCheckedQuantity] = useState<number>(0);
  const [rejectedQuantity, setRejectedQuantity] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false); 

  const handleStartCheck = () => {
    if (selectedItems.size === 0) {
      Alert.alert(
        "Chưa chọn phần tử",
        "Vui lòng chọn ít nhất một phần tử để kiểm tra."
      );
      return;
    }
    navigation.navigate("CheckDetailScreen", {
      report,
      selectedItems: Array.from(selectedItems),
    });
  };

  const handleComplete = () => {
    Alert.alert("Hoàn thành", "Báo lỗi đã được hoàn thành.");
  };
  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleSelect = (option: string) => {
    setSelectedItems((prevState) => {
      const newSelectedItems = new Set(prevState);
      if (newSelectedItems.has(option)) {
        newSelectedItems.delete(option);
      } else {
        newSelectedItems.add(option);
      }
      return newSelectedItems;
    });
  };

  const handleDropdownToggle = (title: string, content: string) => {
    if (openDropdown === title) {
      setOpenDropdown(null);
      setDropdownContent([]);
    } else {
      const options = content
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item)
        .filter((option) =>
          option.toLowerCase().includes(search.toLowerCase())
        );
      setDropdownContent(options);
      setOpenDropdown(title);
    }
  };

  const renderDropdown = (title: string, content: string) => {
    const getSelectedOptionsText = () => {
      const selectedOptions = content
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item)
        .filter((option) => selectedItems.has(option));
      return selectedOptions.length > 0
        ? selectedOptions.join(", ")
        : "Chọn tùy chọn";
    };

    return (
      <View style={tw`mb-${getScaledSize(4)}`}>
        <TouchableOpacity
          style={[
            tw`border border-gray-300 p-${getScaledSize(2)} rounded`,
            { backgroundColor: COLORS.white },
          ]}
          onPress={() => handleDropdownToggle(title, content)}
        >
          <Text
            style={[
              { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) },
            ]}
          >
            {title}
          </Text>
          <Text style={[{color:COLORS.darkGray}]}>{getSelectedOptionsText()}</Text>
        </TouchableOpacity>
        {openDropdown === title && (
          <View style={[tw`border border-gray-300 mt-${getScaledSize(2)} p-${getScaledSize(2)} rounded `, {backgroundColor:COLORS.white}]}>
            {dropdownContent.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={tw`flex-row items-center my-${getScaledSize(2)}`}
                onPress={() => handleSelect(option)}
              >
                <CheckBox
                  isChecked={selectedItems.has(option)}
                  onClick={() => handleSelect(option)}
                />
                <Text
                  style={[
                    tw`ml-${getScaledSize(2)}`,
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                    },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  if (!report) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text>Không có dữ liệu báo lỗi.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: COLORS.colorMain }]}>
      <View
        style={[
          tw`flex-row items-center py-${getScaledSize(2.5)} px-${getScaledSize(5)} mt-${getScaledSize(5)}`,
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
            { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize:getScaledSize(18) },
          ]}
        >
          Chi tiết báo lỗi
        </Text>
      </View>

      <ScrollView style={tw`p-${getScaledSize(4)}`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[tw` p-${getScaledSize(4)} rounded-lg shadow-md mb-${getScaledSize(6)}`, {backgroundColor:COLORS.white}]}>
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
            {[
              { label: "Report No", value: report.reportNo },
              { label: "Confirm Date", value: report.confirmDate },
              { label: "PONO/Route", value: report.ponoOrRoute },
              { label: "Item Code", value: report.itemCode },
              { label: "Item Vật Tư", value: report.itemMaterial },
              { label: "Location/Team", value: report.locationOrTeam },
              { label: "Qty", value: report.qty },
            ].map((item, index) => (
              <View
                key={index}
                style={tw`flex-row justify-between items-center mb-${getScaledSize(2)}`}
              >
                <Text
                  style={[
                    {
                      fontFamily: "CustomFont-Bold",
                      fontSize: getScaledSize(14),
                      color: COLORS.darkGray,
                    },
                  ]}
                >
                  {item.label}:
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
                  {item.value}
                </Text>
              </View>
            ))}
           

            <View style={tw`border-t border-gray-200 pt-${getScaledSize(4)}`}>
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
                Các phần tử đã chọn
              </Text>
              {selectedItems.size > 0 ? (
                Array.from(selectedItems).map((item, index) => (
                  <Text
                    key={index}
                    style={[
                      tw`text-center`,
                      {
                        fontFamily: "CustomFont-Regular",
                        fontSize: getScaledSize(14),
                        color: COLORS.text,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                ))
              ) : (
                <Text
                  style={[
                    tw`text-center`,
                    {
                      fontFamily: "CustomFont-Regular",
                      fontSize: getScaledSize(14),
                      color: COLORS.text,
                    },
                  ]}
                >
                  Không có phần tử nào được chọn.
                </Text>
              )}
            </View>
            
          </View>
        </View>
        <View style={tw`flex-row justify-around mt-${getScaledSize(5)}`}>
              <View
                style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded  w-${getScaledSize(40)}`, {backgroundColor:COLORS.white}]}
              >
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
                  onChangeText={(text) =>
                    setActualCheckedQuantity(Number(text))
                  }
                />
              </View>

              <View
                style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded  w-${getScaledSize(40)}`, {backgroundColor:COLORS.white}]}
              >
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

            <View style={tw`flex-1 justify-center items-center mt-${getScaledSize(2)}`}>
              <View
                style={[tw`border border-gray-300 p-${getScaledSize(2)} rounded   w-${getScaledSize(40)} justify-center items-center`, {backgroundColor:COLORS.white}]}
              >
                <Text
                  style={[
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
        <View style={tw`mt-${getScaledSize(4)}`}>
          {renderDropdown("Overall", report.detail.overall)}
          {renderDropdown("Material", report.detail.material)}
          {renderDropdown("Lamination", report.detail.lamination)}
          {renderDropdown("Machinery", report.detail.machinery)}
          {renderDropdown("Carving", report.detail.carving)}
          {renderDropdown("Veneer", report.detail.veneer)}
          {renderDropdown("Wirebrush", report.detail.wirebrush)}
          {renderDropdown("Assembly", report.detail.assembly)}
          {renderDropdown("Finishing", report.detail.finishing)}
          {renderDropdown("Upholstery", report.detail.upholstery)}
          {renderDropdown("Packing", report.detail.packing)}
          {renderDropdown("Planning", report.detail.planning)}
        </View>
      </ScrollView>

      <View
        style={tw`flex-row justify-around bg-white p-${getScaledSize(2)} border-t border-gray-300`}
      >
        <TouchableOpacity
          style={[
            tw`flex-1 m-${getScaledSize(4)} p-${getScaledSize(2)} rounded`,
            { backgroundColor: COLORS.primary },
          ]}
          onPress={handleStartCheck}
        >
          <Text style={[tw`text-center`, {color:COLORS.white}]}>Bắt đầu kiểm tra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`flex-1 m-${getScaledSize(4)} p-${getScaledSize(2)} rounded`,
            { backgroundColor: COLORS.green },
          ]}
          onPress={handleComplete}
        >
          <Text style={[tw` text-center`, {color:COLORS.white}]}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ErrorDetailScreen;

