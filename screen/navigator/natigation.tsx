
export type DetailItem = {
    key: string;
    info: string;
  };

  export type DataItem = {
    id: number;
    imageUrl: string;
    title: string;
    detail: DetailItem[];
  };

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Product: undefined;
    LeaveRequest: undefined;
    RequestMain:undefined;
    Overtime:undefined;
    Schedule:undefined;
    DetailOvertime:{ item: DataItem };
    DetailRequest:{ item: DataItem };
    ProductDetail: { item: DataItem };
  };
  