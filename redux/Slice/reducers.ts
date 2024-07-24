import { combineReducers } from '@reduxjs/toolkit';
import overtimeReducer from './overtimeSlice'; 
import leaveReducer from './leaveSlice';
import emailReducer from './mailSlice';
import productsReducer from './productSlice';
import leftDeptReducer from './leftDeptSlice';
import notificationsReducer from './notificationsSlice'
import ManagerNotificationsReducer from '../managerSlice/managerNotificationSlice'

const rootReducer = combineReducers({
  overtime: overtimeReducer,
  leave: leaveReducer,
  email: emailReducer,
  products: productsReducer,
  leftDept: leftDeptReducer,
  notifications: notificationsReducer,
  managerNotification: ManagerNotificationsReducer,
});

export default rootReducer;
