import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigator/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import COLORS from "../../../../constants/Color";
import { SearchBar } from "@rneui/themed";
import { WebView } from "react-native-webview"; 

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetail"
>;

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDetail"
>;

type Props = {
  route: ProductDetailScreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
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
  } else if (width > maxWidth) {
    return size * 1.2;
  }

  return isWidth ? size * scaleWidth : size * scaleHeight;
};

const getButtonStyle = (tabName: string, selectedTab: string) => ({
  backgroundColor: selectedTab === tabName ? COLORS.primary : COLORS.white,
  color: selectedTab === tabName ? COLORS.white : COLORS.primary,
});

type TabData = {
  docNumber: string;
  docDescription: string;
  pdfUri: string;
};

type DataObject = {
  Drawing: TabData[];
  Panel: TabData[];
  Quantity: TabData[];
  Testing: TabData[];
  Others: TabData[];
  Instruction: TabData[];
  Detail: TabData[]; 
};

const DetailProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;
  const [selectedTab, setSelectedTab] = useState<keyof DataObject>("Detail");
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false); 
  const [selectedPdfUri, setSelectedPdfUri] = useState<string | null>(null);

  const data: DataObject = {
    Drawing: [
      {
        docNumber: "DRA-23768",
        docDescription:
          "Update May 08,2024 By.TAN As per: ECR-2325 + 2308 Changing the finish from ABS.JC to ABS.01.MB Add HW99-222 for back rest Thêm HW09-222 cho tựa lưng Using HW09-1211 and HW09-1212 Instead HW09-417 and HW09-890. Sử dụng HW09-1211 + HW09-1212 Thay cho HW09-417 + HW09-890 /",
        pdfUri: "https://heyzine.com/flip-book/9cd47802ed.html",
      },
      {
        docNumber: "DRA-16693",
        docDescription:
          "Update: Apr 22,2021 By. TAN. As per. ECR-1882. All of those items to be used same plywood seat base. Change dimensions follow drawing client request. Toàn bộ ghế durrant chair sử dụng một lại mê ngồi. Thay đổi kích thước kết cấu mới theo bản vẽ khách hàng xác nhận. Asper ECR: 1867. Add the wood support and blocked at center - location conected . (Thêm thanh giằng và ke góc giữa khung ghế) . /",
        pdfUri: "https://heyzine.com/flip-book/9cd47802ed.html",
      },
    ],
    Panel: [
      {
        docNumber: "PLN-00312",
        docDescription:
          "System Sheet - SWO.MB-006 Approved Date: 01 Mar 2024 Panel ID: P-4902 / System Sheet - SWO.MB-006 Approved Date: 01 Mar 2024 Panel ID: P-4902.",
        pdfUri: "https://heyzine.com/flip-book/9cd47802ed.html",
      },
    ],
    Quantity: [
      {
        docNumber: "STD-00165",
        docDescription:
          'Standard For Loading Container_R1 Updated page 16 and Combine "Standard for Container Loading - JC and MB" with "Standard For Loading Container" / Standard For Loading Container_R1 Updated page 16 and Combine "Standard for Container Loading - JC and MB" with "Standard For Loading Container"',
        pdfUri: "https://heyzine.com/flip-book/9cd47802ed.html",
      },
      {
        docNumber: "STD-00039",
        docDescription:
          "Reject this Standard for Container Loading - JC and MB --> Use STD-00165 / Reject this Standard for Container Loading - JC and MB --> Use STD-00165",
        pdfUri: "https://heyzine.com/flip-book/4228bc6ed6.html",
      },
      {
        docNumber: "STD-00036",
        docDescription: "Pallet Standard /",
        pdfUri: "https://heyzine.com/flip-book/4228bc6ed6.html",
      },
    ],
    Testing: [
      {
        docNumber: "TES-02048",
        docDescription:
          "MTS - 76123-040243 - Desiccant bag - Dimethyl Fumarate Content - PASS /",
        pdfUri: "https://heyzine.com/flip-book/9cd47802ed.html",
      },
    ],
    Others: [
      {
        docNumber: "ECR-2308",
        docDescription:
          "Bu lông kết nối tựa lưng không đủ dài. Thực tế, để tính toán chiều dài bu lông, chúng ta phải tính cả đến chiều dày foam và vải bọc cho tựa lưng Áp dụng cho tất cả các sản phẩm thuộc dòng Durrant / Bolts to connect the back rest arent long enough. Actually, to calculate the length of the bolt, we have to calculate the thickness of foam and fabric for back rest also For all items in Durrant series.",
        pdfUri: "https://heyzine.com/flip-book/9cd47802ed.html",
      },
      {
        docNumber: "ECR-2325",
        docDescription:
          "Khách hàng yêu cầu - MB618501.DWN.00; MB618502.SWO.00; MB618503.DWN.00; MB618504.SWO.00; MB618505.DWN.00; MB618506.SWO.00; MB618507.SWO.00; MB618508.DWN.00; MB618509.SWO.00; MB618510.DWN.00; MB618511.DWN.00; MB618512.SWO.00; MB618515.DWN.00; MB618516.DWN.00; MB618517.SWO.00; MB618518.SWO.00 / Customer request - MB618501.DWN.00; MB618502.SWO.00; MB618503.DWN.00; MB618504.SWO.00; MB618505.DWN.00; MB618506.SWO.00; MB618507.SWO.00; MB618508.DWN.00; MB618509.SWO.00; MB618510.DWN.00; MB618511.DWN.00; MB618512.SWO.00; MB618515.DWN.00; MB618516.DWN.00; MB618517.SWO.00; MB618518.SWO.00",
        pdfUri: "https://example.com/others2.pdf",
      },
    ],
    Instruction: [],
    Detail: [], 
  };

  const filteredData = data[selectedTab].filter(
    (item) =>
      item.docNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      item.docDescription.toLowerCase().includes(searchText.toLowerCase())
  );
  const renderTabContent = useCallback(() => {
    switch (selectedTab) {
      case "Detail":
        return (
          <View style={tw`p-${getScaledSize(2)} m-${getScaledSize(2)} border border-gray-300 rounded-lg`}>
            <View style={tw`items-center`}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                accessible={true}
                accessibilityLabel="View product image"
                accessibilityRole="button"
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    {
                      width: getScaledSize(300),
                      height: getScaledSize(300),
                      borderRadius: getScaledSize(10),
                      marginTop: getScaledSize(-30),
                    },
                    { resizeMode: "contain" },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row`}>
              <View style={tw`flex-1 my-${getScaledSize(1)} ml-${getScaledSize(3)}`}>
                {[
                  { label: "PTC Code:", value: item.PTCcode },
                  { label: "Description:", value: item.description },
                  { label: "Collection:", value: item.collectionName },
                  { label: "Group:", value: item.productGroup },
                  { label: "Color Code:", value: item.colorCode },
                  {
                    label: "Dimension:",
                    value: item.Dimensions.map(
                      (dim) => `Width: ${dim.width} cm 
Height: ${dim.height} cm 
Length: ${dim.length} cm  `
                    ).join("; "),
                  },
                  { label: "Client Code:", value: item.ClientCode },
                  { label: "CBM:", value: item.cbm },
                ].map((info, index) => (
                  <View
                    key={index}
                    style={tw` bg-transparent border-b border-gray-300`}
                  >
                    <View style={tw`flex-row`}>
                      <View style={tw`w-${getScaledSize(25)}`}>
                        <Text
                          style={[
                            {
                              fontFamily: "CustomFont-Regular",
                              fontSize: getScaledSize(14),
                              color: COLORS.red,
                              marginBottom: 4,
                            },
                          ]}
                        >
                          {info.label}
                        </Text>
                      </View>
                      <Text
                        style={[
                          tw`flex-1 `,
                          {
                            fontFamily: "CustomFont-Regular",
                            fontSize: getScaledSize(14),
                            color: COLORS.black,
                          },
                        ]}
                      >
                        {info.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      case "Drawing":
      case "Panel":
      case "Quantity":
      case "Testing":
      case "Others":
      case "Instruction":
        return (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.docNumber}
            ListHeaderComponent={
              <Text
                style={{
                  fontSize: getScaledSize(14),
                  marginBottom: getScaledSize(8),
                  fontFamily: "CustomFont-Regular",
                }}
              >
                Total: {filteredData.length} items
              </Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`p-${getScaledSize(3)} border border-gray-300 rounded-lg mb-2`}
                onPress={() => {
                  if (item.pdfUri) {
                    setSelectedPdfUri(item.pdfUri); 
                    setPdfModalVisible(true); 
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: getScaledSize(14),
                    fontFamily: "CustomFont-Bold",
                  }}
                >
                  Doc Number: {item.docNumber}
                </Text>
                <Text
                  style={{
                    fontSize: getScaledSize(14),
                    fontFamily: "CustomFont-Regular",
                  }}
                >
                  Doc Description: {item.docDescription}
                </Text>
              </TouchableOpacity>
            )}
          />
        );
      default:
        return null;
    }
  }, [selectedTab, filteredData, item]);
  return (
     <SafeAreaView style={[tw`flex-1 mt-${getScaledSize(5)}`, { backgroundColor: COLORS.colorMain }]}>
      <View
        style={[
          tw`flex-row items-center py-${getScaledSize(2.5)} px-${getScaledSize(5)} mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[tw`p-${getScaledSize(2)}`, { borderRadius: 50 }]}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={getScaledSize(24)}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "CustomFont-Bold",
            fontSize: getScaledSize(20),
            flex: 1,
            textAlign: "center",
          }}
        >
          Chi tiết sản phẩm
        </Text>
      </View>
      <View>
        <SearchBar
          placeholder="Tìm kiếm"
          onChangeText={setSearchText}
          value={searchText}
          lightTheme
          round
          containerStyle={tw`bg-transparent border-b border-gray-300 border-t-0`}
          inputContainerStyle={{
            height: getScaledSize(40),
            backgroundColor: COLORS.white,
          }}
          inputStyle={{ fontSize: getScaledSize(16) }}
        />
      </View>
      <View style={tw`flex-row`}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            "Detail",
            "Drawing",
            "Panel",
            "Quantity",
            "Testing",
            "Others",
            "Instruction",
          ]}
          keyExtractor={(item) => item}
          renderItem={({ item: tab }) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab as keyof DataObject)}
              style={[
                tw`p-${getScaledSize(3)} m-${getScaledSize(2)} rounded-full`,
                getButtonStyle(tab as keyof DataObject, selectedTab),
              ]}
              accessible={true}
              accessibilityLabel={`Select ${tab} tab`}
              accessibilityRole="button"
            >
              <Text
                style={{
                  color: getButtonStyle(tab as keyof DataObject, selectedTab)
                    .color,
                  fontSize: getScaledSize(14),
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={tw`flex-1 bg-transparent px-${getScaledSize(3)}`}>{renderTabContent()}</View>
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: getScaledSize(20),
              borderRadius: getScaledSize(10),
            }}
            onPress={() => {}}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: getScaledSize(300),
                height: getScaledSize(300),
                borderRadius: getScaledSize(10),
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={pdfModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPdfModalVisible(false)}
      >
        <View style={[tw`flex-1`,{backgroundColor:COLORS.white}]}>
          <TouchableOpacity
            onPress={() => setPdfModalVisible(false)}
            style={tw`absolute top-${getScaledSize(10)} left-${getScaledSize(10)} z-${getScaledSize(10)} `}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={getScaledSize(30)}
              color={COLORS.black}
            />
          </TouchableOpacity>
          {selectedPdfUri && (
            <WebView
              source={{ uri: selectedPdfUri }}
              style={{ marginTop: 50 }}
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default DetailProductScreen;