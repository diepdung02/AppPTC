
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
  createdAt:string;
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
};

export type DataRequest = {
  id: number;
  imageUrl: string;
  title: string;
  detail: DetailItem[];
};

export type DataItem = {
  id: number;
  imageUrl: string;
  title: string;
  detail: DetailItem[];
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  details:ActivityDetail[];
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
};

export type EmailItem = {
  id: string;
  to: string;
  subject: string;
  message: string;
  timestamp: string;
};

export type Product = {
  id: number;
  image: string;
  name: string;
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
  Product: undefined;
  LeaveRequest: undefined;
  OvertimeRequest: undefined;
  RequestMain: undefined;
  Overtime: undefined;
  Schedule: undefined;
  News: undefined;
  Notifications: undefined;
  Mail: undefined;
  SendMail: undefined;
  LeftDeptScreen: undefined;
  DetailLeftDept: {item: CreateLeftDept};
  CreateLeftDept: undefined;
  ApproveLeaveScreen: undefined;
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
  OutputList: undefined;
  DetailOvertime: { item: OvertimeRequest };
  DetailRequest: { item: LeaveRequest };
  ProductDetail: { item: DataItem };
  NewsDetail: { newsItem: NewsItem };
  MailDetail: { emailItem: EmailItem };
  NotificationDetail: { notification: NotificationItem };
  ProductScreen: { products: Product[] };
};
