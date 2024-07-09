import { combineReducers } from '@reduxjs/toolkit';
import overtimeReducer from './overtimeSlice'; 
import leaveReducer from './leaveSlice';
import emailReducer from './mailSlice';


const rootReducer = combineReducers({
  overtime: overtimeReducer,
  leave: leaveReducer,
  email: emailReducer,
});

export default rootReducer;
