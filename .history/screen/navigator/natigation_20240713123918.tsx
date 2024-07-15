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

export type Component = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export type Product = {
  id: string;
  name: string;
  components: Component[];
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
  Detail: { item: DataItem };
  DetailOvertime: { overtimeRequest: OvertimeRequest };
  DetailLeave: { leaveRequest: LeaveRequest };
  MailScreen: undefined;
  SendEmailScreen: undefined;
  OutputScreen: { product: Product; productId: string; components: Component[]; productName: string };
  OutputList: { completedProducts: number };
};
