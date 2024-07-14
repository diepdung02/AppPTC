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
  name: string;
  pdfUri: string;
  PTCcode: string;
  ClientCode: string;
  completionCount: number;
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
  OutputScreen: { productId: number; components: { name: string; isCompleted: boolean; }[], productName:string };
  OutputList: {  completedProducts: { id: number, componentIndex: number }[] };
  DetailOvertime: { item: OvertimeRequest };
  DetailRequest: { item: LeaveRequest };
  ProductDetail: { item: DataItem };
  NewsDetail: { newsItem: NewsItem };
  MailDetail: { emailItem: EmailItem };
  NotificationDetail: { notification: NotificationItem };
  ProductScreen: { products: Product[] }; // Added ProductScreen with products prop
};
