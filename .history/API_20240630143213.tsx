// api.ts

export interface LoginResponse {
     success: boolean;
     message?: string;
     token?: string;
    
   }
   
   export const fetchData = async (): Promise<any> => {
     try {
       const response = await fetch('https://668100b656c2c76b495d38a8.mockapi.io/PTC');
       if (!response.ok) {
         throw new Error('Phản hồi của mạng không ổn');
       }
       const data = await response.json();
       return data;
     } catch (error) {
       console.error('Lỗi tìm nạp dữ liệu:', error);
       throw error;
     }
   };
   
   export const login = async (username: string, password: string): Promise<LoginResponse> => {
     try {
       const response = await fetch('https://668100b656c2c76b495d38a8.mockapi.io/PTC', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username, password }),
       });
       if (!response.ok) {
         throw new Error('Phản hồi của mạng không ổn');
       }
       const data: LoginResponse = await response.json();
       return data;
     } catch (error) {
       console.error('Lỗi đăng nhập:', error);
       throw error;
     }
   };
   