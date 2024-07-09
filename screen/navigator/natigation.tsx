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
  startDate: string; // ISO string
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
type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
};
type NotificationItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
};

type EmailItem = {
  id: string;
  to: string;
  subject: string;
  message: string;
  timestamp: string;
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
  DetailOvertime: { item: OvertimeRequest };
  DetailRequest: { item: LeaveRequest };
  ProductDetail: { item: DataItem };
  NewsDetail: { newsItem: NewsItem };
  MailDetail: { emailItem: EmailItem };
  NotificationDetail: { notification: NotificationItem };
};
