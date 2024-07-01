

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
    ProductDetail: { item: DataItem };
  };
  