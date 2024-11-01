import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  RefreshControl
} from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
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

type ReportDetail = {
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

type Report = {
  stt: number;
  reportNo: string;
  ponoOrRoute: string;
  itemName: string;
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
  detail: ReportDetail; // Thêm phần chi tiết vào kiểu dữ liệu Report
};

const reports: Report[] = [
  {
    stt: 1,
    reportNo: "59888",
    ponoOrRoute: "\nPO:",
    itemCode: "WO-07-2021-00016_16",
    itemName:"Zig Zag Console Table, Macassar",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: 2_WAS\nTeam: 2_WAD2",
    qty: 6,
    qtyRealCheck: 6,
    requestDate: "17-03-2022",
    confirmDate: "16-03-2022",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: hongbt",
    status: "Đã đạt",
    created: "08:31 17-03-2022",
    noted: "",
    reason: "Ok",
    action: "OK",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall:
        "Tổng quan\nTổng quát : kích thước\nTổng quát : cấu trúc\nTổng quát : thông tin handle over\nTổng quát : Mối mọt - không chấp nhận",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 2,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Không đạt",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 3,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Đang kiểm",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 4,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Đã đạt",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 5,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Không đạt",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 6,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Đang kiểm",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 7,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Đã đạt",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 8,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Không đạt",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 9,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Đang kiểm",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 10,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Đã đạt",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 11,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Không đạt",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
  {
    stt: 12,
    reportNo: "170283",
    ponoOrRoute: "\nPO:4619856\nRoute:WO-01-2024-00019_16",
    itemCode: "RH787301.WLT.00",
    itemName:"JACKSON CHEST 3 DRAWERS",
    itemMaterial: "RH832857.LCM.00",
    locationOrTeam: "\nLocation: GCTX\nTeam: DEP",
    qty: 2,
    qtyRealCheck: 0,
    requestDate: "13-07-2024",
    confirmDate: "31-08-2024",
    checkAndVerifyBy: "\nCheck by: qctest\nVerify by: uyennd",
    status: "Đang kiểm",
    created: "07:34 13-07-2024",
    noted: "hoa tessting",
    reason: "Ok",
    action: "hoa tessting",
    detail: {
      item: "RH832857.LCM.00",
      name: "",
      route: "WO-07-2021-00016_16",
      po: "(ItemVT: )",
      team: "2_WAD2",
      booker: "CS Hiếu",
      location: "2_WAS",
      qcPerson: "qctest",
      confirmDate: "3/16/2022",
      quantity: 6,
      status: "Fail - Không đạt",
      actualCheckedQuantity: 0,
      rejectedQuantity: 0,
      overall: "Tổng quan",
      material: "Nguyên vật liệu : tuân thủ tiêu chuẩn /bản vẽ",
      lamination:
        "Kiểm độ ẩm\nGhép : độ ẩm giữa 2 mối ghép ≤ 2%\nGhép : đường keo\nGhép : nứt/hở",
      machinery:
        "Công Đoạn Máy : Lỗ khoan/ lỗ mộng- theo bản vẽ/ rập\nCông Đoạn Máy : Sự vuông góc/ tưa/ cháy",
      carving:
        "Chi Tiết Chạm : tuân theo mẫu chạm\nChi Tiết Chạm : Dấu máy/ dấu nhám\nChi Tiết Chạm : Dơ bẩn",
      veneer:
        "Veneer : Dộp\nVeneer : dằm gỗ/veneer\nVeneer : Màu sắc- theo bản vẽ và tiêu chuẩn\nVeneer : Hướng- theo bản vẽ và tiêu chuẩn\nVeneer : loại ( bông/sọc) - theo bản vẽ và tiêu chuẩn\nVeneer : Mẻ/ Vá\nVeneer : Nứt/ chia tách\nVeneer : ghép veneer- Theo bản vẽ/ mẫu\nVeneer : Mắt gỗ- bể/ nứt\nVeneer : lõm",
      wirebrush:
        "Đánh Cước : tuân theo mẫu của PTC\nĐánh Cước : Lông gỗ\nĐánh Cước : Dằm gỗ/ veneer",
      assembly:
        "Lắp Ráp/Fitting : Tuân theo bản vẽ\nLắp Ráp/Fitting : cong vênh- <3mm\nLắp Ráp/Fitting : Mối ghép hở\nLắp Ráp/Fitting : Móp/ nứt/ mẻ\nLắp Ráp/Fitting : Lồi vít\nLắp Ráp/Fitting : Nứt do bắt vít\nKiểm màu hoàn thiện đạt\nLắp Ráp/Fitting : HW bị gỉ sét\nLắp Ráp/Fitting : Bulong và ốc cấy bị tuôn ren\nLắp Ráp/Fitting : Sự cân bằng trên bàn cân\nLắp Ráp/Fitting : Hướng dẫn lắp ráp và hardware\nLắp Ráp/Fitting : Khe hở giữa kính - Tuân theo bản vẽ /tiêu chuẩn\nLắp Ráp/Fitting : Vết trầy xước/ bể kiếng- theo tiêu chuẩn\nLắp Ráp/Fitting : Kiếng nhô ra ngoài khung\nLắp Ráp/Fitting : Lỗ tay nắm- sứt mẻ gỗ\nLắp Ráp/Fitting : Lỗ đinh- Không chấp nhận\nLắp Ráp/Fitting : Lỗ kệ- không gập ghềnh- Tuân theo bản vẽ\nLắp Ráp/Fitting : hộc kéo- cánh cửa- bằng phẳng theo tiêu chuẩn\nLắp Ráp/Fitting : Hộc kéo - nhẹ/ Không quơ\nLắp Ráp/Fitting : Mặt hộc kéo/ ráp keo - chắc chắn\nLắp Ráp/Fitting : Tay nắm - thằng hàng",
      finishing:
        "Hoàn thiện : Màu- theo mẫu\nHoàn thiện : Độ bóng\nHoàn thiện : Bong tróc/ mẽ/ bọt khí\nHoàn thiện : khu vực sửa dày/ nhựa\nHoàn thiện : Mùi hôi\nHoàn thiện : Da cam\nHoàn thiện : Dơ/ Không láng\nHoàn thiện : Đọng thành giọt\nHoàn thiện : Lem\nHoàn thiện : Nhựa gỗ\nHoàn thiện : Bề mặt không phẳng\nHoàn thiện : Nhìn thấy lỗi sửa\nHoàn thiện : Sự mịn màng\nHoàn thiện : Dấu tay, dấu keo\nHoàn thiện : Nhìn thấy gỗ trắng ( trừ các vị trí có ráp keo\nHoàn thiện : Sứt mẻ /móp\nHoàn thiện : Góc/ cạnh sắc nhọn\nHoàn thiện : Sơn vào ray trượt\nHoàn thiện : thời gian khô",
      upholstery:
        "Bọc nệm : Xệ/ lò xo dài\nBọc nệm : Vải bọc : Nhăn, bụi bẩn, hư hỏng\nBọc nệm : Hướng vải- Theo bản vẽ\nBọc nệm : Cấu trúc tuân theo bản vẽ/tiêu chuẩn",
      packing:
        "Đóng gói : bề mặt và lòng trong hộc kéo - láng mịn và không vụn gỗ/veneer\nĐóng gói : HW và hướng dẫn lắp ráp - đầy đủ và theo bản vẽ\nĐóng gói : đóng gói-tuân theo tiêu chuẩn đóng gói\nĐóng gói: tem nhãn theo tiêu chuẩn",
      planning: "Lỗi sai kế hoạch\nKiểm xác suất\nSố lượng thực loại",
      action: "Action",
    },
  },
];

const DetailRow = ({
  label,
  value,
  customValueStyle = {},
  valueColor = COLORS.black, 
  backgroundColor = COLORS.white, 
}: {
  label: string;
  value: string;
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
          color: COLORS.darkGray,
        },
      ]}
    >
      {label}:
    </Text>
    <Text
      style={[
        {
          fontFamily: "CustomFont-Regular",
          fontSize: getScaledSize(14),
          color: valueColor,
        },
        customValueStyle,
      ]}
    >
      {value}
    </Text>
  </View>
);

const ReportImageScreen:React.FC = ({ navigation }: any) => {
  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [refreshing, setRefreshing] = useState(false); 

  const handleSearch = (text: string) => {
    setSearch(text.toLowerCase());
  };

  const onRefresh = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const filteredReports = reports.filter((report) => {
    const searchTerm = search.trim().toLowerCase();
    return (
      report.reportNo.toLowerCase().includes(searchTerm) ||
      report.itemCode.toLowerCase().includes(searchTerm) ||
      report.itemMaterial.toLowerCase().includes(searchTerm) 
    );
  });

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handleReportPress = (report: Report) => {
    navigation.navigate("CheckGoodsDetailScreen", { report });
  };

  const getStatusColorAndTextColor = (status: string) => {
    let statusColor, textColor;
    switch (status) {
      case "Đã đạt":
        statusColor = COLORS.green;
        textColor = COLORS.black;
        break;
      case "Không đạt":
        statusColor = COLORS.red;
        textColor = COLORS.white;
        break;
      case "Đang kiểm":
        statusColor = COLORS.yellow;
        textColor = COLORS.black;
        break;
      default:
        statusColor = COLORS.darkGray;
        textColor = COLORS.black;
        break;
    }
    return { statusColor, textColor };
  };

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
          style={tw`p-${getScaledSize(2)}`}
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
            { color: COLORS.black, fontFamily: "CustomFont-Bold", fontSize:getScaledSize(18) },
          ]}
        >
          Báo cáo hình ảnh sản phẩm
        </Text>
        
      </View>
      <View style={tw`flex-row items-center justify-center mt-${getScaledSize(2.5)} px-${getScaledSize(5)}`}>
        <SearchBar
          placeholder="Tìm kiếm"
          onChangeText={handleSearch}
          value={search}
          lightTheme
          round
          containerStyle={tw`flex-1 bg-transparent border-b border-gray-300 border-t-0`}
          inputContainerStyle={{ height: 40, backgroundColor: COLORS.white }}
          inputStyle={{ fontSize: 16 }}
        />
      </View>
      <ScrollView style={tw`p-${getScaledSize(4)}`}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
                {paginatedReports.map((report) => {
          const { statusColor, textColor } = getStatusColorAndTextColor(
            report.status
          );
          return (
            <TouchableOpacity
            key={report.stt}
            style={[tw`p-4 m-2 rounded-md shadow-md`, { backgroundColor: COLORS.white }]}
            onPress={() => handleReportPress(report)}
          >
            <View>
              <Text style={[tw`text-lg font-bold text-gray-800`]}>
                Report No: {report.reportNo}
              </Text>
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow label="Stt" value={report.stt.toString()} />
                <DetailRow label="Item Code" value={report.itemCode} />
              </View>
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow label="Qty" value={report.qty.toString()} />
                <DetailRow label="Qty Real" value={report.qtyRealCheck.toString()} />
              </View>
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow label="Request Date" value={report.requestDate} />
                <DetailRow label="Status" value={report.status} valueColor={textColor} backgroundColor={statusColor} />
              </View>
              <View style={tw`flex-row justify-between mt-${getScaledSize(2)}`}>
                <DetailRow label="Created" value={report.created} />
              </View>
                <DetailRow label="Noted" value={report.noted} />
            </View>
          </TouchableOpacity>
          );
        })}
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

export default ReportImageScreen;
