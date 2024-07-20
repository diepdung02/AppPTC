import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../constants/Color'; 
import { RootStackParamList } from '../navigator/navigation';

import { SearchBar } from "@rneui/themed";

// Define the ActivityDetail type
type ActivityDetail = {
  time: string;
  activities: string[];
};

// Define the NewsItem type using the ActivityDetail type
type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  details: ActivityDetail[];
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "News">;
};

// Sample news data
const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Cập nhật chương trình du lịch Long Hải",
    summary: "Theo thông báo số 11 ban hành ngày 3 tháng 5 năm 2024, công ty sẽ tổ chức chuyến du lịch đến Long Hải. Nay phòng Nhân sự xin cập nhật lại chương trình như sau: Địa điểm: khu du lịch bãi tắm An Bình – Long Hải, Thời gian: Chủ nhật ngày 02/06/2024, Tập trung lúc 5h00 tại PTC1, khởi hành đi Long Hải lúc 5h30; dự tính chiều 18h30 về đến PTC1",
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
    image: "https://lh5.googleusercontent.com/p/AF1QipPyCRaq4Oi0amzVgAhEI7nLYLzcgN48zW2pMQ0x=w426-h240-k-no",
    date: "30-06-2024"
  },
  {
  id: '2',
  image: 'https://example.com/image.jpg',
  title: 'Hội nghị Người Lao Động 2024',
  summary: `Hội nghị Người Lao Động được tổ chức hàng năm nhằm tạo cơ hội để toàn thể nhân viên và Ban giám đốc chia sẻ về tình hình kinh doanh, chính sách lương, thưởng, phúc lợi, việc thực hiện Thỏa ước lao động tập thể.`,
  date: '27-03-2024',
  details: [
    {
      time: '',
      activities: [
        `Thân gởi toàn thể nhân viên,\n\nHội nghị Người Lao Động được tổ chức hàng năm nhằm tạo cơ hội để toàn thể nhân viên và Ban giám đốc chia sẻ về tình hình kinh doanh, chính sách lương, thưởng, phúc lợi, việc thực hiện Thỏa ước lao động tập thể.\nBan Giám đốc công ty nhận thức sâu sắc rằng Hội nghị Người Lao Động là một sự kiện quan trọng đối với tất cả cán bộ công nhân viên, nhằm phát huy quyền dân chủ trực tiếp và tạo điều kiện dễ dàng để người lao động được biết, được tham gia ý kiến, được quyết định và giám sát những vấn đề liên quan được nêu ở trên, xây dựng mối quan hệ lao động hài hòa ổn định góp phần xây dựng công ty phát triển bền vững.\nVì tính chất quan trọng của Hội nghị, Ban Giám đốc Công ty và Ban chấp hành Công đoàn thân mời toàn thể anh chị em đến dự Hội nghị người lao động năm 2024 với thông tin như sau:\n\nNgày: Thứ Tư, ngày 27 tháng 03 năm 2024\nThời gian: Từ 15h00 đến 16h30 (thân mời toàn thể nhân viên có mặt tại canteen lúc 14h50 để ổn định chỗ ngồi)\nĐịa điểm: Nhà Ăn xưởng 1 của công ty\nThành phần tham dự:\nBan Giám đốc công ty\nBan Chấp hành công đoàn\nTrưởng bộ phận, Quản Đốc, nhân viên văn phòng và công nhân viên, tổng số lượng 600 nhân viên thâm niên\n- Các trưởng bộ phận, quản lý trực tiếp sắp xếp nhân viên tham dự hội nghị theo danh sách đính kèm (gồm 700 nhân viên thâm niên). Ghi chú: bộ phận có thể thay đổi người tham dự\n- Sự có mặt của các Trưởng bộ phận, Quản đốc, nhân viên văn phòng và công nhân viên các Phòng ban sẽ góp phần đáng kể cho thành công của Hội nghị, vì thế Ban Giám đốc công ty đề nghị các anh chị em tham dự đầy đủ và nghiêm túc.\nCám ơn sự hợp tác của toàn thể anh chị em công nhân viên. Trân trọng!`,
        `Dear all,\n\nThe Employee Conference is organized annually to create an opportunity for all employees BOD to share on business situation, the salary and benefit policy, the implementation of the collective labour agreement.\nThe Board of Directors is acutely aware that the Employee Conference is an important event for all employees, in order to promote democracy and create an easy conditions for employees to know, to be able to contribute ideas, to decide and to supervise the above-mentioned matters, to build a stable and harmonious labor relationship, thus contributing to building a sustainable development company.`,
        `Ban Giám đốc cũng xin nhấn mạnh rằng việc tham gia Hội nghị Người Lao Động không chỉ là quyền lợi mà còn là trách nhiệm của mỗi nhân viên trong việc xây dựng và phát triển công ty. Sự đóng góp ý kiến và sự hiện diện của quý vị sẽ giúp công ty hiểu rõ hơn về nhu cầu và mong muốn của người lao động, từ đó cải thiện môi trường làm việc và chính sách phúc lợi.\nHội nghị cũng là dịp để tôn vinh những nỗ lực và đóng góp của từng cá nhân và tập thể trong suốt năm qua. Chúng tôi sẽ có những phần thưởng và khen thưởng cho các cá nhân và tập thể có thành tích xuất sắc, ghi nhận sự cống hiến và tinh thần làm việc của mọi người.\nRất mong sự hiện diện đông đủ của toàn thể anh chị em để Hội nghị thành công tốt đẹp.\nTrân trọng cảm ơn!\n\nBan Giám đốc công ty`,
        `The Board of Directors would also like to emphasize that attending the Employee Conference is not only a right but also a responsibility of each employee in building and developing the company. Your contributions and presence will help the company better understand the needs and desires of the employees, thereby improving the working environment and welfare policies.\nThe conference is also an opportunity to honor the efforts and contributions of each individual and team throughout the past year. We will have rewards and recognitions for individuals and teams with outstanding achievements, acknowledging their dedication and work spirit.\nWe look forward to the full attendance of all to ensure the success of the conference.\nThank you very much!\n\nThe Board of Directors`,
      ],
    },
  ],
},
{
  id: '3',
  image: 'https://example.com/image2.jpg',
  title: 'Thông báo về Khảo sát Giá trị cốt lõi lần 2',
  date: '21-03-2024',
  summary: `Công ty đã tiến hành nhiều đợt tuyên truyền thông tin về “Giá trị cốt lõi” qua nhiều hình thức: treo băng rôn, gởi thông tin qua các phương tiện email, zalo, đào tạo định hướng ...`,
  details: [
    {
      time: '',
      activities: [
        `Thân gởi: Tập thể công nhân viên công ty Phúc Thắng,\n\nCông ty đã tiến hành nhiều đợt tuyên truyền thông tin về “Giá trị cốt lõi” qua nhiều hình thức: treo băng rôn, gởi thông tin qua các phương tiện email, zalo, đào tạo định hướng ... Mục tiêu là giúp cho mọi thành viên của công ty không chỉ áp dụng “Giá trị cốt lõi” vào công việc mà còn “sống theo các Giá trị cốt lõi” của công ty. Chúng ta có thể làm được điều đó bằng cách thực hiện những điều sau:\n1. Hãy dẫn đầu tập thể bằng cách mình hãy là người làm gương.\n2. Luôn nhắc đến các “Giá trị cốt lõi” trong mọi hoạt động giao tiếp\n3. Ghi nhận và khen thưởng các thành viên thực hiện tốt “Giá trị cốt lõi”\n4. Kết hợp các Giá trị cốt lõi vào tất cả các quá trình làm việc\n5. Thống nhất nội dung “Giá trị cốt lõi” trong tất cả các thông điệp ban hành trong nội bộ và bên ngoài.\n6. Đưa việc áp dụng “Giá trị cốt lõi” vào “Hệ thống Đánh giá Hiệu quả làm việc” của công nhân viên.\n7. Tiến hành các cuộc khảo sát thường xuyên để kiểm tra việc thực hiện đồng bộ của công nhân viên với các Giá trị cốt lõi của công ty\n\nVì những mục đích trên, Phòng Nhân sự thông báo như sau:\n+ Toàn bộ nhân viên văn phòng và trưởng bộ phận (quản lý), giám sát sản xuất: sẽ được khảo sát lần 2 vào 2 ngày 21 + 22 /3/2024 tại Studio theo lịch đính kèm thông báo này.\n\nNội dung khảo sát như sau:\n+ Nêu đầy đủ 5 định nghĩa của 5 giá trị cốt lõi của công ty (C-R-A-F-T).\n+ Nêu “tầm nhìn” của công ty\n+ Nêu “Sứ mệnh” của công ty\n+ Nêu Slogan/khẩu hiệu của công ty\n\nGợi ý:\n1) Toàn thể nhân viên tiếp tục ôn lại, nhân viên mới cần ghi nhớ các Giá trị cốt lõi mà công ty đã ban hành để thực hiện.\n2) Các cấp quản lý (quản lý, trưởng nhóm, trưởng bộ phận, v.v.) nên thường xuyên nhắc đến Giá trị cốt lõi như một hình thức hướng dẫn cho nhân viên, đồng thời, ban lãnh đạo phải là người gương mẫu áp dụng giá trị này.\n\nĐề nghị toàn thể nhân viên nghiêm túc thực hiện theo thông báo!\n\nTrân trọng!\n\nPhòng Nhân sự`,
      ],
    },
  ],
},
{
  id: '4',
  image: 'https://img.upanh.tv/2024/07/18/4b8ef4c7ac8c09d2509d.jpg',
  title: 'Thông báo về Khóa học Kiểm soát Stress',
  date: '22-05-2024',
  summary: `Nhằm chăm sóc sức khỏe tinh thần cho nhân viên, công ty sẽ tổ chức khóa học “Kiểm soát stress - dinh dưỡng thông minh và cân bằng cuộc sống”.`,
  details: [
    {
      time: '',
      activities: [
        `Thân gởi các anh chị và các bạn,\n\nAn xin nhắc lịch lớp “Kiểm soát stress” sẽ diễn ra vào chiều thứ Năm tuần này (27.6) từ 1h đến 5h tại Showroom.\n\nHiện lớp có khoảng 30 bạn tham dự và còn chỗ nên các anh chị và các bạn có thể đăng ký thêm.\n\nLưu ý: lớp bố trí thảm ngồi như hình dưới đây nên các anh chị và các bạn chọn trang phục phù hợp nhé!\n\nTrân trọng,\nThúy An\n\n---\n\nFrom: An HR PTC \nSent: Wednesday, May 22, 2024 5:23 PM\nTo: PTCVN Fine Furniture <phucthangvn@ptcvn.com>\nCc: Long HR ASST PTC <longhh@ptcvn.com>\nSubject: Đăng ký khóa học: Kiểm soát stress\n\nThân gởi các anh chị và các bạn,\n\nNhằm chăm sóc sức khỏe tinh thần cho nhân viên, công ty sẽ tổ chức khóa học “Kiểm soát stress - dinh dưỡng thông minh và cân bằng cuộc sống”.\n\nKhóa học dự tính tổ chức vào Thứ Năm ngày 27.06.2024 từ 13h-17h tại Showroom PTC1\n\nĐối tượng tham dự: nhân viên khối văn phòng và các quản đốc sản xuất – những ai có mong muốn tham dự khóa học này.\n\nNội dung khóa học như dưới đây:\n\n\nĐể chuẩn bị cho việc tổ chức, các anh chị và các bạn đăng ký tham dự với em Long (HR) trước 17h00 Thứ Sáu 24.05.2024 nhé.\n\nTrân trọng!\nThúy An`,
      ],
    },
  ],
},
{
  id: '5',
  image: 'https://img.upanh.tv/2024/07/18/download.jpg',
  title: 'Thông báo về Lịch nghỉ Tết Dương Lịch và Tết Nguyên Đán 2024',
  date: '10-02-2024',
  summary: 'Ban Giám Đốc thông báo lịch nghỉ Tết Dương Lịch năm 2024 và Tết Nguyên Đán nhằm đảm bảo kế hoạch sản xuất và tạo thuận lợi cho nhân viên ở xa có kế hoạch về quê ăn Tết.',
  details: [
    {
      time: '',
      activities: [
        `Dear all,

I would inform the Tet holiday schedule as below:

Based on Viet Nam Labor Code, in order to ensure timely Production and allow anyone to organize your travel to hometown for the New Year 2024 & the Traditional Tet Holidays next year, the BOD is happy to confirm the following holiday schedule:
Căn cứ theo Luật Lao Động Việt Nam, nhằm vừa đảm bảo kế hoạch sản xuất vừa tạo thuận lợi cho nhân viên ở xa có kế hoạch mua vé tàu xe về quê ăn Tết và nghỉ Tết Dương Lịch, nay Ban Giám Đốc thông báo lịch Nghỉ Tết Dương Lịch năm 2024 và Tết Nguyên Đán như sau:

Ngày | Dương lịch | Âm lịch | Diễn giải | Ghi chú
-----|-------------|---------|-----------|---------
NEW YEAR 2024
Tết Dương lịch 2024 | Monday | Thứ Hai | 01/01/2024 | | Solar New year | Nghỉ Tết Dương lịch | New year holiday | Nghỉ lễ có hưởng lương

Sunday | Chủ Nhật | 04/02/2024 | 25 Tết | Company closed | Công ty không làm việc | Weekly day off | Ngày nghỉ hàng tuần
Monday | Thứ Hai | 05/02/2024 | 26 Tết | Company closed | Annual Leave/Unpaid Leave | Nghỉ phép năm hoặc nghỉ phép không hưởng lương
Tuesday | Thứ Ba | 06/02/2024 | 27 Tết | Company closed | Công ty không làm việc
Wednesday | Thứ Tư | 07/02/2024 | 28 Tết | Company closed | Công ty không làm việc
Thursday | Thứ Năm | 08/02/2024 | 29 Tết | Company closed | Công ty không làm việc

LUNAR NEW YEAR
Friday | Thứ Sáu | 09/02/2024 | 30 Tết | Tet holiday | Nghỉ Tết | Official Paid Public Holidays | Nghỉ tết có hưởng lương
Saturday | Thứ Bảy | 10/02/2024 | Mùng 1 | Tet holiday | Nghỉ Tết
Sunday | Chủ Nhật | 11/02/2024 | Mùng 2 | Tet holiday | Nghỉ Tết
Monday | Thứ Hai | 12/02/2024 | Mùng 3 | Tet holiday | Nghỉ Tết
Tuesday | Thứ Ba | 13/02/2024 | Mùng 4 | Tet holiday | Nghỉ Tết
Wednesday | Thứ Tư | 14/02/2024 | Mùng 5 | Company closed | Công ty không làm việc | Leave compensation for Sunday 11/02/2024 | Nghỉ bù ngày Chủ Nhật 11/02/2024 (Mùng 1 Tết)
Thursday | Thứ Năm | 15/02/2024 | Mùng 6 | Company closed | Công ty không làm việc | Annual Leave/Unpaid Leave | Nghỉ phép năm hoặc nghỉ phép không hưởng lương
Friday | Thứ Sáu | 16/02/2024 | Mùng 7 | Company closed | Công ty không làm việc | Annual Leave/Unpaid Leave | Nghỉ phép năm hoặc nghỉ phép không hưởng lương
Saturday | Thứ Bảy | 17/02/2024 | Mùng 8 | Company closed | Công ty không làm việc
Sunday | Chủ Nhật | 18/02/2024 | Mùng 9 | Company closed | Công ty không làm việc | Weekly day off | Ngày nghỉ hàng tuần

BACK TO WORK
Monday | Thứ Hai | 19/02/2024 | Mùng 10 | ALL EMPLOYEES RETURN TO WORK | Đi làm lại | TRỞ LẠI LÀM VIỆC

 CALCULATING SALARY FOR TET HOLIDAYS/ TÍNH LƯƠNG TRONG NHỮNG NGÀY NGHỈ TẾT`,
      ],
    },
  ],
},
];

const NewsScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<NewsItem[]>(newsData);

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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBack}
        >
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tin Tức Nhân Viên</Text>
      </View>
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
              <Text style={styles.itemSummary}>{item.summary}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
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
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  goBack: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
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
  },
  itemSummary: {
    color: "#666",
    marginTop: 5,
  },
  itemDate: {
    color: "#000",
    marginTop: 5,
  },
});

export default NewsScreen;
