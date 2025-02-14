import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    gender: string;
    phoneNumber: string;
    dob: string;
    userType: string;
    deviceDetails?: any;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the user
    setUser: (state, action: PayloadAction<any>) => {
      const userState = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        gender: 'Male',
        phoneNumber: action.payload.phoneNumber,
        dob: action.payload.dob,
        userType: action.payload.userType,
        deviceDetails: action.payload?.deviceDetails,
      };

      state.user = userState; // Update the user state
    },

    // Action to clear the user
    clearUser: state => {
      state.user = null; // Clear the user state
    },
  },
});

export const {setUser, clearUser} = UserSlice.actions;
export default UserSlice.reducer;
