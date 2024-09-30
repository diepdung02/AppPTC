import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  RefreshControl,
} from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import CheckBox from "react-native-check-box"; // Import CheckBox
import COLORS from "../../../../constants/Color";

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
  orderID: number;
  createDate: string;
  type: string;
  stage: string;
  employee: string;
  approved: boolean;
  close: boolean;
  note: string;
  ref: string;
};

const reports: Report[] = [
  {
    orderID: 1,
    createDate: "23/09/2024",
    type: "CAR",
    stage: "SAM",
    employee: "SAM Nguyễn Văn A",
    approved: true,
    close: false,
    note: "123",
    ref: "123",
  },
  {
    orderID: 2,
    createDate: "24/09/2024",
    type: "CAR",
    stage: "VEN",
    employee: "PRO Diệp Minh Dũng",
    approved: false,
    close: true,
    note: "123",
    ref: "123",
  },
];
const DetailRow = ({
  label,
  value,
  isCheckbox = false,
  customValueStyle = {},
  valueColor = "#666",
  backgroundColor = "#fff",
}: {
  label: string;
  value: string | boolean;
  isCheckbox?: boolean;
  customValueStyle?: object;
  valueColor?: string;
  backgroundColor?: string;
}) => (
  <View
    style={[
      tw`flex-row justify-between items-center mb-${getScaledSize(2)}`,
      { backgroundColor },
    ]}
  >
    <Text
      style={[
        {
          fontFamily: "CustomFont-Bold",
          fontSize: getScaledSize(14),
          color: "#444",
        },
      ]}
    >
      {label}:
    </Text>
    {isCheckbox ? (
      <CheckBox
        isChecked={value as boolean}
        disabled={true} // Disable checkbox
        onClick={() => {}} // Add a no-op function for onClick
        checkedImage={
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={20}
            color={COLORS.green}
          />
        }
        unCheckedImage={
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={20}
            color={COLORS.red}
          />
        }
      />
    ) : (
      <Text
        style={[
          {
            fontFamily: "CustomFont-Regular",
            fontSize: getScaledSize(12),
            color: valueColor,
          },
          customValueStyle,
        ]}
      >
        {value}
      </Text>
    )}
  </View>
);
const Output: React.FC = ({ navigation }: any) => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleSearch = (text: string) => {
    setSearch(text.toLowerCase());
  };

  const filteredReports = reports.filter((report) => {
    const searchTerm = search.trim().toLowerCase();
    return (
      report.employee.toLowerCase().includes(searchTerm) ||
      String(report.orderID).toLowerCase().includes(searchTerm) ||
      report.stage.toLowerCase().includes(searchTerm)
    );
  });

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return (
    <SafeAreaView
      style={[
        tw`flex-1 mt-${getScaledSize(5)}`,
        { backgroundColor: COLORS.colorMain },
      ]}
    >
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
            { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize: getScaledSize(16) },
          ]}
        >
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
      <View style={tw`flex-row items-center justify-center mt-${getScaledSize(2.5)} px-${getScaledSize(5)}`}>
        <SearchBar
          placeholder="Tìm kiếm"
          onChangeText={handleSearch}
          value={search}
          lightTheme
          round
          containerStyle={tw`flex-1 bg-transparent border-b border-gray-300 border-t-0`}
          inputContainerStyle={{ height: getScaledSize(40), backgroundColor: COLORS.white }}
          inputStyle={{ fontSize: 16 }}
        />
      </View>
      <ScrollView
        style={tw`p-4`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      > 
             {paginatedReports.map((report, index) => (
          <TouchableOpacity
            key={report.orderID}
            style={[tw`p-4 m-2 rounded-md shadow-md`, { backgroundColor: COLORS.white }]}
          >
            <View>
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow label="OrderID" value={String(report.orderID)} />
              </View>
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow label="Ngày tạo" value={report.createDate} />
                <DetailRow label="Loại" value={report.type} />
                <DetailRow label="Công đoạn" value={report.stage} />
              </View>
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow label="Tên người tạo" value={report.employee} />
              </View>
              <DetailRow label="Note" value={report.note} />
              <DetailRow label="Ref" value={report.ref} />
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow
                  label="Approved"
                  value={report.approved}
                  isCheckbox
                />
                <DetailRow
                  label="Close"
                  value={report.close}
                  isCheckbox
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={tw`flex-row justify-between p-${getScaledSize(4)}`}>
        <TouchableOpacity
          onPress={() => setCurrentPage(page => Math.max(page - 1, 1))}
          style={[tw`p-${getScaledSize(2)}`, { backgroundColor: COLORS.primary }]}
          disabled={currentPage === 1}
        >
          <Text style={[{color:COLORS.white}]}>Previous</Text>
        </TouchableOpacity>
        <Text>{`${currentPage} / ${totalPages}`}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
          style={[tw`p-${getScaledSize(2)}`, { backgroundColor: COLORS.primary }]}
          disabled={currentPage === totalPages}
        >
          <Text style={[{color:COLORS.white}]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Output;
