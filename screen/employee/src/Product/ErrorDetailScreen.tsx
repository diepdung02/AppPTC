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
} from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import COLORS from "../../../../constants/Color";
import { SearchBar } from "@rneui/themed";
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
  const [actualCheckedQuantity, setActualCheckedQuantity] = useState<number>(
    report?.detail.actualCheckedQuantity || 0
  );
  const [rejectedQuantity, setRejectedQuantity] = useState<number>(
    report?.detail.rejectedQuantity || 0
  );
  const [status, setStatus] = useState<string>(report?.detail.status || "Pass");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownContent, setDropdownContent] = useState<string[]>([]);

  const handleStartCheck = () => {
    if (selectedItems.size === 0) {
      // Hiển thị cảnh báo nếu không có phần tử nào được chọn
      Alert.alert(
        "Chưa chọn phần tử",
        "Vui lòng chọn ít nhất một phần tử để kiểm tra."
      );
      return; // Ngừng thực hiện nếu không có phần tử nào được chọn
    }
  
    // Nếu có ít nhất một phần tử được chọn, điều hướng đến CheckDetailScreen
    navigation.navigate('CheckDetailScreen', { report });
  };
  

  const handleComplete = () => {
    Alert.alert("Hoàn thành", "Báo lỗi đã được hoàn thành.");
  };

  const handleSelect = (option: string) => {
    setSelectedItems((prevState) => {
      const newSelectedItems = new Set(prevState);
      if (newSelectedItems.has(option)) {
        newSelectedItems.delete(option);
      } else {
        newSelectedItems.add(option);
      }
      return new Set(newSelectedItems);
    });
  };

  const handleSearch = (text: string) => {
    setSearch(text);
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
    // Tạo hàm để lấy các tùy chọn đã chọn
    const getSelectedOptionsText = () => {
      const selectedOptions = content
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item)
        .filter((option) => selectedItems.has(option));
      return selectedOptions.length > 0
        ? selectedOptions.join(", ")
        : "Select options";
    };

    return (
      <View style={tw`mb-4`}>
        <TouchableOpacity
          style={[tw`border border-gray-300 p-2 rounded`, {backgroundColor:COLORS.white} ]}
          onPress={() => handleDropdownToggle(title, content)}
        >
          <Text
            style={[
              tw``,
              { fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) },
            ]}
          >
            {title}
          </Text>
          <Text style={tw`text-gray-500`}>
            {openDropdown === title
              ? getSelectedOptionsText()
              : getSelectedOptionsText()}
          </Text>
        </TouchableOpacity>
        {openDropdown === title && (
          <View style={tw`border border-gray-300 mt-2 p-2 rounded bg-white`}>
            {dropdownContent.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={tw`flex-row items-center my-2`}
                onPress={() => handleSelect(option)}
              >
                <CheckBox
                  isChecked={selectedItems.has(option)}
                  onClick={() => handleSelect(option)}
                />
                <Text
                  style={[
                    tw`ml-2`,
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

      {/* <View style={tw`flex-row items-center justify-center mt-2.5 px-5`}>
        <SearchBar
          placeholder="Tìm kiếm"
          onChangeText={handleSearch}
          value={search}
          lightTheme
          round
          containerStyle={tw`flex-1 bg-transparent border-b border-gray-300 border-t-0`}
          inputContainerStyle={{ height: getScaledSize(40), backgroundColor: COLORS.white }}
          inputStyle={{ fontSize: getScaledSize(16) }}
        />
      </View> */}

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

        {renderDropdown("Overall", report.detail.overall || "")}
        {renderDropdown("Material", report.detail.material || "")}
        {renderDropdown("Lamination", report.detail.lamination || "")}
        {renderDropdown("Machinery", report.detail.machinery || "")}
        {renderDropdown("Carving", report.detail.carving || "")}
        {renderDropdown("Veneer", report.detail.veneer || "")}
        {renderDropdown("Wirebrush", report.detail.wirebrush || "")}
        {renderDropdown("Assembly", report.detail.assembly || "")}
        {renderDropdown("Finishing", report.detail.finishing || "")}
        {renderDropdown("Upholstery", report.detail.upholstery || "")}
        {renderDropdown("Packing", report.detail.packing || "")}
        {renderDropdown("Planning", report.detail.planning || "")}
      </ScrollView>
      <View
        style={tw`flex-row justify-around bg-white p-2 border-t border-gray-300`}
      >
        <TouchableOpacity
            style={[tw`flex-1 m-4 p-2 rounded`, { backgroundColor:COLORS.primary}]}
          onPress={handleStartCheck}
        >
          <Text style={tw`text-white text-center`}>Bắt đầu kiểm tra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`flex-1 m-4 p-2 rounded`, { backgroundColor:COLORS.green}]}
          onPress={handleComplete}
        >
          <Text style={tw`text-white text-center`}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ErrorDetailScreen;