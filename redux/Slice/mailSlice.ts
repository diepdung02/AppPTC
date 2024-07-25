import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

type Email = {
  id: string;
  to: string;
  subject: string;
  message: string;
  timestamp: string; 
};

type EmailState = {
  emails: Email[];
};

const initialState: EmailState = {
  emails: [],
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    addEmail: (state, action: PayloadAction<Omit<Email, 'id'>>) => {
      const newEmail: Email = {
        ...action.payload,
        id: uuidv4(),
        timestamp: new Date().toLocaleString(), // Generate timestamp
      };
      state.emails.unshift(newEmail);
    },
  },
});

export const { addEmail } = emailSlice.actions;
export default emailSlice.reducer;
