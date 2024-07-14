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
};

export type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  leaveType: string;
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
};

export type Component = {
  id: number;
  name: string;
  isCompleted: boolean;
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
  OutputScreen: { product: Product; productId: number; components: Component[]; productName: string, productClient };
  OutputList: { completedComponents: Component[]; productName: string };
  DetailOvertime: { item: OvertimeRequest };
  DetailRequest: { item: LeaveRequest };
  ProductDetail: { item: DataItem };
  NewsDetail: { newsItem: NewsItem };
  MailDetail: { emailItem: EmailItem };
  NotificationDetail: { notification: NotificationItem };
  ProductScreen: { products: Product[] }; 
};
