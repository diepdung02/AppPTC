import { combineReducers } from '@reduxjs/toolkit';
import overtimeReducer from './overtimeSlice'; 
import leaveReducer from './leaveSlice';
import emailReducer from './mailSlice';
import productsReducer from './productSlice';
import leftDeptReducer from './leftDeptSlice';
import notificationsReducer from './notificationsSlice'


const rootReducer = combineReducers({
  overtime: overtimeReducer,
  leave: leaveReducer,
  email: emailReducer,
  products: productsReducer,
  leftDept: leftDeptReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
