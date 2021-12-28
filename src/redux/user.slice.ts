import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface UserState {
  name: string,
  email: string,
  first_name:string,
  last_name : string,
  userId: string,
}

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  email: '',
  first_name:'',
  last_name : '',
  userId: '',
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, { payload}: PayloadAction<any>) => {
      state =  payload
      return state;
    },
    resetUser: state => {
      state = { ...initialState };
      return state;
    },
  }
})

export const { resetUser, setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.users

export default userSlice.reducer;