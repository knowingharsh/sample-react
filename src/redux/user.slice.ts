import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface UserState {
  name: string,
  email: string,
}

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  email: '',
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state = { ...action.payload };
    },
    resetUser: state => {
      state = { ...initialState };
    },
  }
})

export const { resetUser, setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users

export default userSlice.reducer;