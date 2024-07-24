import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/Color'; 
import { RootStackParamList } from '../../navigator/navigation';
import { SearchBar } from "@rneui/themed";

type ActivityDetail = {
  time: string;
  activities: string[];
};

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  details: ActivityDetail[];
  sender: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "News">;
};

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Chương trình du lịch Long Hải",
    summary: "Theo thông báo số 11 ban hành ngày 3 tháng 5 năm 2024, công ty sẽ tổ chức chuyến du lịch đến Long Hải. Nay phòng Nhân sự xin cập nhật lại chương trình như sau: Địa điểm: khu du lịch bãi tắm An Bình – Long Hải, Thời gian: Chủ nhật ngày 02/06/2024, Tập trung lúc 5h00 tại PTC1, khởi hành đi Long Hải lúc 5h30; dự tính chiều 18h30 về đến PTC1",
    image: "https://lh5.googleusercontent.com/p/AF1QipPyCRaq4Oi0amzVgAhEI7nLYLzcgN48zW2pMQ0x=w426-h240-k-no",
    date: "30-06-2024",
    details: [
      {
        time: "Sáng",
        activities: [
          "5h00: Xe và Hướng dẫn viên Du lịch đón Quý khách tại điểm hẹn. Nhân viên tập trung đúng giờ",
          "05h30: Khởi hành đi Long Hải (Lưu ý: xe xuất phát đúng giờ và sẽ không chờ những ai đến trễ)",
          "06h30: Đoàn dùng điểm tâm sáng tại nhà hàng Song Trang. Trên đường đi Quý khách cùng Hướng dẫn viên tìm hiểu các địa danh lịch sử, những vùng đất đi qua như: Biên Hòa, Tượng Phật Dốc 47, Long Thành, Bà Rịa…",
          "08h30: Đoàn tập trung tại bãi biển tham gia chương trình Team Building cùng với hoạt náo viên chuyên nghiệp với các chương trình được dàn dựng vô cùng hoành tráng được dựa theo cảm hứng từ “tinh thần Olympic” với dàn âm thanh công suất lớn để nhận được những phần quà của Du Lịch - Giải nhất: 02 thùng bia, Giải nhì: 01 thùng bia, Giải ba: 01 thùng nước ngọt.",
          "Kết thúc chương trình, Đoàn tự do tắm biển hoặc tham gia các trò chơi thể thao biển: dù lượn, mô tô nước,… (chi phí tự túc)"
        ]
      },
      {
        time: "Trưa",
        activities: [
          "11h30: Đoàn đến nhà hàng dùng tiệc trưa và tham gia chương trình Gala Lunch với chủ đề “Bứt phá mọi giới hạn” với các phần chương trình Karaoke, trò chơi sân khấu vui nhộn do công ty du lịch tổ chức để nhận được nhiều phần quà hấp dẫn và đầy bất ngờ."
        ]
      },
      {
        time: "Chiều",
        activities: [
          "15h00: Đoàn khởi hành về lại HCM.",
          "15h50: Trên đường Đoàn ghé nhà thờ Song Vĩnh, là ngôi thánh đường của họ đạo Song Vĩnh ở Bà Rịa – Vũng Tàu, được hoàn thành sau 11 năm 1 tháng 1 ngày bởi do “những người con Song Vĩnh đòi hỏi mọi thứ phải tỉ mỉ, trau chuốt đến từng chi tiết”. Giữa vùng đất Bà Rịa – Vũng Tàu đầy nắng và gió, Nhà thờ Song Vĩnh nguy nga, lộng lẫy chẳng khác nào một cung điện giữa trời Âu. Tại đây, Quý khách sẽ có thể bắt được những thước hình lộng lẫy và đầy lãng mạn.",
          "16h30: Dừng chân tại Trại Bò Sữa Long Thành mua đặc sản được chế biến từ sữa về làm quà cho người thân, bạn bè.",
          "17h30: Đoàn dùng cơm chiều tại nhà hàng Song Trang hoặc Mekong Long Thành.",
          "18h30: Về đến Bình Dương, kết thúc chuyến tham quan."
        ]
      }
    ],
    sender: "Phòng Nhân sự",
  },
  {
    id: "2",
    title: "Hội nghị Người Lao Động 2024",
    summary: "Hội nghị Người Lao Động được tổ chức hàng năm nhằm tạo cơ hội để toàn thể nhân viên và Ban giám đốc chia sẻ về tình hình kinh doanh, chính sách lương, thưởng, phúc lợi, việc thực hiện Thỏa ước lao động tập thể.",
    image: "https://via.placeholder.com/150",
    date: "27-03-2024",
    details: [
      {
        time: "15h00",
        activities: [
          "Thân gởi toàn thể nhân viên,\n\nHội nghị Người Lao Động được tổ chức hàng năm nhằm tạo cơ hội để toàn thể nhân viên và Ban giám đốc chia sẻ về tình hình kinh doanh, chính sách lương, thưởng, phúc lợi, việc thực hiện Thỏa ước lao động tập thể.\nBan Giám đốc công ty nhận thức sâu sắc rằng Hội nghị Người Lao Động là một sự kiện quan trọng đối với tất cả cán bộ công nhân viên, nhằm phát huy quyền dân chủ trực tiếp và tạo điều kiện dễ dàng để người lao động được biết, được tham gia ý kiến, được quyết định và giám sát những vấn đề liên quan được nêu ở trên, xây dựng mối quan hệ lao động hài hòa ổn định góp phần xây dựng công ty phát triển bền vững.\nVì tính chất quan trọng của Hội nghị, Ban Giám đốc Công ty và Ban chấp hành Công đoàn thân mời toàn thể anh chị em đến dự Hội nghị người lao động năm 2024 với thông tin như sau:\n\nNgày: Thứ Tư, ngày 27 tháng 03 năm 2024\nThời gian: Từ 15h00 đến 16h30 (thân mời toàn thể nhân viên có mặt tại canteen lúc 14h50 để ổn định chỗ ngồi)\nĐịa điểm: Nhà Ăn xưởng 1 của công ty\nThành phần tham dự:\nBan Giám đốc công ty\nBan Chấp hành công đoàn\nTrưởng bộ phận, Quản Đốc, nhân viên văn phòng và công nhân viên, tổng số lượng 600 nhân viên thâm niên\n- Các trưởng bộ phận, quản lý trực tiếp sắp xếp nhân viên tham dự hội nghị theo danh sách đính kèm (gồm 700 nhân viên thâm niên). Ghi chú: bộ phận có thể thay đổi người tham dự\n- Sự có mặt của các Trưởng bộ phận, Quản đốc, nhân viên văn phòng và công nhân viên các Phòng ban sẽ góp phần đáng kể cho thành công của Hội nghị, vì thế Ban Giám đốc công ty đề nghị các anh chị em tham dự đầy đủ và nghiêm túc.\nCám ơn sự hợp tác của toàn thể anh chị em công nhân viên. Trân trọng!",
          "Dear all,\n\nThe Employee Conference is organized annually to create an opportunity for all employees and the Board of Directors to share on business situation, the salary and benefit policy, the implementation of the collective labor agreement.\nThe Board of Directors is acutely aware that the Employee Conference is an important event for all employees, in order to promote democracy and create easy conditions for employees to know, to be able to contribute ideas, to decide and to supervise the above-mentioned matters, to build a stable and harmonious labor relationship, thus contributing to building a sustainable development company.\nWe also emphasize that attending the Employee Conference is not only a right but also a responsibility of each employee in building and developing the company. Your contributions and presence will help the company better understand the needs and desires of the workers, thereby improving the working environment and benefits policy.\nThe Conference is also an opportunity to honor the efforts and contributions of individuals and teams over the past year. We will have awards and recognition for outstanding individuals and teams, acknowledging everyone's dedication and work spirit.\nWe look forward to your full attendance for the Conference to be a great success.\nSincerely,\nCompany Board of Directors"
        ]
      }
    ],
    sender: 'Phòng Công đoàn',
  },
  {
    id: "3",
    title: "Nghỉ lễ Quốc khánh 2/9",
    summary: "Theo thông báo từ Phòng Hành chính, công ty sẽ nghỉ lễ Quốc khánh 2/9 từ ngày 01/09 đến ngày 03/09. Ngày 04/09 tất cả nhân viên quay lại làm việc bình thường.",
    image: "https://via.placeholder.com/150",
    date: "15-08-2024",
    details: [
      {
        time: "Ngày 01/09 - 03/09",
        activities: [
          "Toàn thể nhân viên nghỉ lễ Quốc khánh 2/9 theo quy định.",
          "Các bộ phận cần chuẩn bị trước thời gian nghỉ để đảm bảo công việc không bị gián đoạn."
        ]
      }
    ],
    sender: 'Phòng Hành chính',
  },
  {
    id: "4",
    title: "Chương trình đào tạo kỹ năng mềm tháng 8",
    summary: "Công ty tổ chức chương trình đào tạo kỹ năng mềm cho toàn thể nhân viên trong tháng 8, với các chủ đề: Kỹ năng giao tiếp, Kỹ năng làm việc nhóm, và Kỹ năng giải quyết vấn đề.",
    image: "https://img.upanh.tv/2024/07/18/4b8ef4c7ac8c09d2509d.jpg",
    date: "01-08-2024",
    details: [
      {
        time: "Ngày 10/08",
        activities: [
          "Chủ đề: Kỹ năng giao tiếp",
          "Thời gian: 8h00 - 12h00",
          "Diễn giả: Ms. Hoa Nguyễn"
        ]
      },
      {
        time: "Ngày 17/08",
        activities: [
          "Chủ đề: Kỹ năng làm việc nhóm",
          "Thời gian: 8h00 - 12h00",
          "Diễn giả: Mr. Minh Phan"
        ]
      },
      {
        time: "Ngày 24/08",
        activities: [
          "Chủ đề: Kỹ năng giải quyết vấn đề",
          "Thời gian: 8h00 - 12h00",
          "Diễn giả: Ms. Lan Tran"
        ]
      }
    ],
    sender: 'Phòng Đào tạo',
  },
  {
    id: "5",
    title: "Hội thảo nâng cao sức khỏe và an toàn lao động",
    summary: "Hội thảo về nâng cao sức khỏe và an toàn lao động sẽ diễn ra vào ngày 20/09. Mời toàn thể nhân viên tham dự để nâng cao nhận thức và kỹ năng về an toàn lao động.",
    image: "https://img.upanh.tv/2024/07/18/download.jpg",
    date: "10-09-2024",
    details: [
      {
        time: "Ngày 20/09",
        activities: [
          "Chủ đề: Nâng cao sức khỏe và an toàn lao động",
          "Thời gian: 8h00 - 12h00",
          "Diễn giả: Dr. Mai Anh",
          "Địa điểm: Hội trường A, tầng 5"
        ]
      }
    ],
    sender: 'Phòng An toàn lao động',
  }
];

const NewsScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<NewsItem[]>(newsData);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleItemPress = (item: NewsItem) => {
    navigation.navigate("NewsDetail", { newsItem: item });
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = newsData.filter(
      (item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.summary.toLowerCase().includes(text.toLowerCase()) ||
        item.date.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm"
        inputContainerStyle={{ backgroundColor: "white" }}
        value={search}
        onChangeText={handleSearch}
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSummary}>{truncateText(item.summary, 100)}</Text>
              <View style={styles.dateSenderContainer}>
                <Text style={styles.itemDate}>{item.date}</Text>
                <Text style={styles.itemSender}>By: {item.sender}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorMain,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf:'center'
  },
  itemSummary: {
    color: "#666",
    marginTop: 5,
    fontSize:14,
    marginVertical:5,
  },
  dateSenderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  itemDate: {
    fontSize: 12,
    color: COLORS.date,
  },
  itemSender: {
    color: "#333",
    fontStyle: 'italic',
  },
});

export default NewsScreen;
