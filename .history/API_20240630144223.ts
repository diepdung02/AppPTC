// api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const fetchData = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch('https://668100b656c2c76b495d38a8.mockapi.io/PTC');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, error: 'Error fetching data' };
  }
};

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginRequest): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch('https://668100b656c2c76b495d38a8.mockapi.io/PTC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: 'Error logging in' };
  }
};

export interface User{
  id:String;
  name: String;
  avatar: String;
  dept: Str
}