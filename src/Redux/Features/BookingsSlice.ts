import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {bookingData} from '../../Context/Types/ozove';
//import {Booking} from '../../Context/Types/ozove';
interface BookingsState {
  bookings: bookingData[];
}

const initialState: BookingsState = {
  bookings: [],
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
  },
});

export const {setBookings, clearBookings} = bookingsSlice.actions;
export default bookingsSlice.reducer;
