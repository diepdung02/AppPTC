import { combineReducers } from '@reduxjs/toolkit';
import overtimeReducer from './overtimeSlice'; 
import leaveReducer from './leaveSlice';
import emailReducer from './mailSlice';
import productsReducer from './productSlice';


const rootReducer = combineReducers({
  overtime: overtimeReducer,
  leave: leaveReducer,
  email: emailReducer,
  products: productsReducer,

});

export default rootReducer;
