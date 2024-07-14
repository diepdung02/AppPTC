// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers'; // Tạo reducer của bạn và nhập vào đây

const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
    return undefined;
  }
};

const saveState = async (state) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('reduxState', serializedState);
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu vào AsyncStorage:', error);
  }
};

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    products: store.getState().products, // Thay đổi 'products' thành phần bạn cần lưu trữ
    // Các trạng thái khác nếu cần
  });
});

export default store;
