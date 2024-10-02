import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  chatId: null, // Initialize chatId as null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
    setUserLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.chatId = null; // Reset chatId on logout
    },
    setChatId: (state, action) => {
      state.chatId = action.payload; // Update chatId
    },
  },
});

export const { setUserLoggedIn, setAdminStatus, setUserLoggedOut, setChatId } = userSlice.actions;

export default userSlice.reducer;
