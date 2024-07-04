
export type DetailItem = {
    key: string;
    info: string;
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
    sender: string;
    subject: string;
    date: string;
  };
  

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Product: undefined;
    LeaveRequest: undefined;
    RequestMain:undefined;
    Overtime:undefined;
    Schedule:undefined;
    News:undefined;
    Notifications:undefined;
    Mail:undefined;
    SendMail:undefined;
    DetailOvertime:{ item: DataItem };
    DetailRequest:{ item: DataItem };
    ProductDetail: { item: DataItem };
    NewsDetail: { newsItem: NewsItem };
    MailDetail: { emailItem: EmailItem };
    NotificationDetail: { notification: NotificationItem };
  };
  