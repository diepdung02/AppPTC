
export type DetailItem = {
  key: string;
  info: string;
};

export type OvertimeRequest = {
  id: number;
  startDate: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: "Đang chờ duyệt" | "Đã được duyệt" | "Đã bị từ chối";
  code:string;
  // createdAt:string;
};

export type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: "Đang chờ duyệt" | "Đã được duyệt" | "Đã bị từ chối";
  code:string;
  createdAt:string;
  dayOffs:string,
  usedDaysOff: string; 
  remainingDaysOff: string; 
};
export type CreateLeftDept = {
  id: number;
  startDate: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: "Đang chờ duyệt" | "Đã được duyệt" | "Đã bị từ chối";
  code: string;
};

export type DataRequest = {
  id: number;
  imageUrl: string;
  title: string;
  detail: DetailItem[];
};
type Dimension = {
  height: number;  // Height in cm
  width: number;   // Width in cm
  length: number;  // Length in cm
};

export type DataItem = {
  id: number;
  collectionName:string;
  pdfUri: string;
  image:string;
  PTCcode:string;
  ClientCode:string;
  productGroup:string;
  description:string;
  colorCode:string;
  cbm:string;
  Dimensions:Dimension[];
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  details:ActivityDetail[];
  sender: string;
  link:string;
};
export type ActivityDetail = {
  time: string;
  activities: string[];
};

export type NotificationItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  icon: string;
  sender:string;
  link:string;
  vote:string;
};
export type ManagerNotificationItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  icon: string;
  code:string;
  startDate: string;
};

export type EmailItem = {
  id: string;
  to: string;
  subject: string;
  message: string;
  timestamp: string;
  image:string;
};

export type Product = {
  id: number;
  image: string;
  collectionName: string;
  pdfUri: string;
  PTCcode: string;
  ClientCode: string;
  components: Component[];
  remainingComponents: Component[];
};

export type Component = {
  id: number;
  name: string;
  components?: Component[];
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ManagerHomeScreen: undefined;
  Product: undefined;
  LeaveRequest: undefined;
  OvertimeRequest: undefined;
  RequestMain: undefined;
  Overtime: undefined;
  Schedule: undefined;
  News: undefined;
  Notifications: undefined;
  ManagerNotificationDetail: { notification: ManagerNotificationItem };
  ManagerNotification: undefined;
  Mail: undefined;
  ManagerMailScreen: undefined;
  SendMail: undefined;
  LeftDeptScreen: undefined;
  DetailLeftDept: {item: CreateLeftDept};
  CreateLeftDept: undefined;
  ApproveLeaveScreen: undefined;
  OutputList: undefined;
  EvaluateScreen: undefined;
  VoteScreen: undefined;
  BenefitScreen: undefined;
  SalaryScreen: undefined;
  ErrorScreen: undefined;
  ErrorDetailScreen: undefined;
  CheckDetailScreen: undefined;
  CheckGoodsScreen: undefined;
  CheckGoodsDetailScreen: undefined;
  ManagerEvaluteScreen: undefined;
  Output: undefined;
  OutputScreen: {
    product: Product;
    productId: number;
    components: Component[];
    productName: string;
    productClient: string;
    productCode: string;
    productImage: string;
    productPDF: string;
    remainingComponents: Component[];
  };
 
  DetailOvertime: { item: OvertimeRequest };
  DetailRequest: { item: LeaveRequest };
  ProductDetail: { item: DataItem };
  NewsDetail: { newsItem: NewsItem };
  MailDetail: { emailItem: EmailItem };
  ManagerMailDetail: { emailItem: EmailItem };
  NotificationDetail: { notification: NotificationItem };
  ProductScreen: { products: Product[] };
};
