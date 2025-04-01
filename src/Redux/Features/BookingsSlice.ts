import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {bookingData} from '../../Context/Types/ozove';

interface BookingsState {
  bookings: bookingData[];
  perthLocation: {
    location: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    setStatus: boolean;
  };
}

const initialState: BookingsState = {
  bookings: [],
  perthLocation: {
    location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    setStatus: false,
  },
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<bookingData[]>) => {
      state.bookings = action.payload;
    },
    clearBookings: state => {
      state.bookings = [];
    },
    // Modified reducer to store location in state
    setPerthLocation: (
      state,
      action: PayloadAction<typeof initialState.perthLocation>,
    ) => {
      state.perthLocation = action.payload;
    },
  },
});

export const {setBookings, clearBookings, setPerthLocation} =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
