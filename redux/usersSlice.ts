import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state: any, action: any) => {
      state.users = action.payload;
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;