import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Sử dụng icon
import tw from "twrnc";
import COLORS from "../../../../../constants/Color";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../navigator/navigation";
import { Video, ResizeMode } from "expo-av";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CheckGoodsDetailScreen">;
};

const { width: initialWidth, height: initialHeight } = Dimensions.get("window");

// Hàm tính kích thước responsive
const scaleWidth = initialWidth / 375;
const scaleHeight = initialHeight / 667;

const getScaledSize = (size: number, isWidth = true) => {
  const minWidth = 320;
  const maxWidth = 1024;
  const width = Dimensions.get("window").width;

  if (width < minWidth) {
    return size * 0.5;
  } else if (width > maxWidth) {
    return size * 1.2;
  }

  return isWidth ? size * scaleWidth : size * scaleHeight;
};

const UploadCarCassScreen: React.FC<Props> = ({ navigation }) => {
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    moistureCheck: null,
    machineForce: null,
    glueType: null,
    glueExpiry: null,
    glueMethod: null,
    glueDryTime: null,
    labelImage: null,
    overallProduct: null,
    joineryImage: null,
    dimensionCheck: null,
    chairTiltCheck: null,
    productStability: null,
    scaleCheck: null,
    approvedPanel: null,
    templateCheck: null,
    hwCompletion: null,
    drawerGapCheck: null,
    doorGapCheck: null,
    doorDrawerFunction: null,
    railAlignment: null,
    packingCheck: null,
    carvingCheck: null,
    moistureAfterGluing: null,
  });

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [selectedAttachment, setSelectedAttachment] = useState<{
    uri: string;
    type: "image" | "video";
  } | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const sections = [
    { title: "1: Kiểm tra độ ẩm trước khi ghép (≤ 8%)", key: "moistureCheck" },
    { title: "2: Ghép: Lực ép của máy", key: "machineForce" },
    {
      title: "3: Lắp Ráp: Đủ, đúng loại keo và cảo theo tiêu chuẩn",
      key: "glueType",
    },
    { title: "4: Lắp Ráp: Kiểm tra thời hạn sử dụng keo", key: "glueExpiry" },
    {
      title: "5: Lắp Ráp: Kiểm tra phương pháp bôi keo theo tiêu chuẩn",
      key: "glueMethod",
    },
    {
      title: "6: Lắp Ráp: Kiểm tra thời gian khô keo theo tiêu chuẩn",
      key: "glueDryTime",
    },
    { title: "7: Hình ảnh tem, bản vẽ, lô hàng", key: "labelImage" },
    {
      title: "8: Hình ảnh tổng thể sản phẩm kiểm trên bàn cân",
      key: "overallProduct",
    },
    {
      title: "9: Hình ảnh mộng, keo lắp ráp, phương pháp lắp ráp",
      key: "joineryImage",
    },
    {
      title: "10: Hình ảnh kiểm tra kích thước sản phẩm",
      key: "dimensionCheck",
    },
    {
      title: "11: Hình ảnh kiểm tra độ nghiêng của mê ngồi và tựa lưng (ghế)",
      key: "chairTiltCheck",
    },
    {
      title: "12: Hình ảnh kiểm tra sản phẩm thẳng đứng và ổn định",
      key: "productStability",
    },
    { title: "13: Hình ảnh kiểm tra sản phẩm trên bàn cân", key: "scaleCheck" },
    {
      title: "14: Hình ảnh kiểm tra mặt sau panel được phê duyệt",
      key: "approvedPanel",
    },
    {
      title: "15: Hình ảnh kiểm tra với rập được phê duyệt",
      key: "templateCheck",
    },
    {
      title: "16: Hình ảnh kiểm tra việc lắp ráp hoàn thiện với HW",
      key: "hwCompletion",
    },
    {
      title: "17: Hình ảnh kiểm tra khe hở hộc kéo và cánh cửa",
      key: "drawerGapCheck",
    },
    {
      title: "18: Hình ảnh kiểm tra khe hở xung quanh cánh cửa và hộc kéo",
      key: "doorGapCheck",
    },
    {
      title: "19: Hình ảnh kiểm tra chức năng cánh cửa và hộc kéo",
      key: "doorDrawerFunction",
    },
    {
      title: "20: Hình ảnh kiểm tra rây trượt lắp thẳng hàng",
      key: "railAlignment",
    },
    {
      title: "21: Hình ảnh kiểm tra đóng gói trước khi giao hàng",
      key: "packingCheck",
    },
    {
      title: "22: Hình ảnh kiểm tra chi tiết chạm tiện theo mẫu",
      key: "carvingCheck",
    },
    {
      title: "23: Hình ảnh kiểm tra độ ẩm sau khi ghép",
      key: "moistureAfterGluing",
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSections = sections.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sections.length / itemsPerPage);

  const pickImage = async (key: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => ({ ...prev, [key]: result.assets[0].uri }));
    }
  };

  const handleOpenModal = (uri: string, type: "image" | "video") => {
    setSelectedAttachment({ uri, type });
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAttachment(null);
  };

  const handleDeleteAttachment = (uri: string) => {
    setImages((prev) => {
      const updatedImages = { ...prev };
      for (const key in updatedImages) {
        if (updatedImages[key] === uri) {
          updatedImages[key] = null;
          break;
        }
      }
      return updatedImages;
    });
    if (selectedAttachment && selectedAttachment.uri === uri) {
      setModalVisible(false);
      setSelectedAttachment(null);
    }
  };

  const renderImageSection = (title: string, key: string) => (
    <View style={{ marginVertical: 10 }} key={key}>
      <TouchableOpacity
        onPress={() => setSelectedKey(selectedKey === key ? null : key)}
        style={[
          tw`p-4 bg-gray-200 rounded-md`,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={[tw`w-80`]}>{title}</Text>
        <MaterialCommunityIcons
          name={selectedKey === key ? "chevron-up" : "chevron-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {selectedKey === key && (
        <View style={{ marginTop: 10 }}>
          {images[key] && (
            <TouchableOpacity onPress={() => handleOpenModal(images[key]!, "image")}>
              <Image
                source={{ uri: images[key] }}
                style={{ width: 200, height: 200, marginBottom: 10 }}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => pickImage(key)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#007BFF",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <MaterialCommunityIcons name="image" size={24} color="white" />
            <Text style={{ color: "white", marginLeft: 10 }}>Chọn hình ảnh</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-4`}>
      <View
        style={[
          tw`flex-row items-center mt-${getScaledSize(5)}`,
          { backgroundColor: COLORS.white, padding: getScaledSize(10) },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[tw`p-2`, { borderRadius: 50 }]}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={getScaledSize(24)}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-xl flex-1 text-center`,
            {
              color: COLORS.black,
              fontFamily: "CustomFont-Bold",
              fontSize: getScaledSize(20),
            },
          ]}
        >
          Upload Check CarCass
        </Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
  <View style={tw`flex-row m-4 h-10 w-full`}>
    <View style={tw`flex-row`}>
      <TouchableOpacity style={[tw`py-2 px-4 rounded flex-row items-center`, {backgroundColor:"#00acc1"}]}
      onPress={() => navigation.navigate("UploadQcImageScreen")}>
        <MaterialCommunityIcons
          name="plus"
          size={24}
          color={COLORS.white}
        />
        <Text style={tw`text-white text-center ml-2`}>Tạo mới</Text>
      </TouchableOpacity>
    </View>
    <View style={tw`flex-row`}>
      <TouchableOpacity style={[tw` py-2 px-4 ml-3 rounded flex-row items-center`, {backgroundColor: COLORS.primary}]}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={24}
          color={COLORS.white}
        />
        <Text style={tw`text-white text-center ml-2`}>Xem danh sách</Text>
      </TouchableOpacity>
    </View>
    <View style={tw`flex-row`}>
      <TouchableOpacity style={[tw` py-2 px-4 ml-3 rounded flex-row items-center`, {backgroundColor:"#9ccc65"}]}>
        <Text style={[tw` text-center ml-2`, {color:COLORS.black}]}>
          Xem thông tin liên quan đến router
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</ScrollView>
      <ScrollView>
      <View style={tw`mb-4`}>
          <Text style={[tw`text-lg font-semibold mb-2`, { color: COLORS.black }]}>GV811551.GVZ.00 - Zig Zag Console Table, Macassar - WO-06-2024-00015_31</Text>
        </View>
        {paginatedSections.map(({ title, key }) => renderImageSection(title, key))}

        {/* Pagination controls */}
        <View style={tw`flex-row justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <Text style={tw`text-blue-500`}>Trang trước</Text>
          </TouchableOpacity>
          <Text>
            Trang {currentPage} của {totalPages}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <Text style={tw`text-blue-500`}>Trang sau</Text>
          </TouchableOpacity>
        </View>

        {selectedAttachment && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View
            style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
          >
            <View style={tw`bg-white p-4 rounded`}>
              {selectedAttachment.type === "image" ? (
                <Image
                  source={{ uri: selectedAttachment.uri }}
                  style={tw`w-80 h-80`}
                />
              ) : (
                <Video
                  source={{ uri: selectedAttachment.uri }}
                  style={tw`w-80 h-80`}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay={false}
                />
              )}
              <View style={tw`flex-row justify-between mt-4`}>
                <TouchableOpacity
                  style={tw`p-2 bg-red-500 rounded`}
                  onPress={() => handleDeleteAttachment(selectedAttachment.uri)}
                >
                  <Text style={tw`text-white text-center`}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`p-2 bg-blue-500 rounded`}
                  onPress={handleCloseModal}
                >
                  <Text style={tw`text-white text-center`}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadCarCassScreen;
