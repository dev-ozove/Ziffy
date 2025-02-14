import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import counterReducer from '../Features/CounterSlice';
import bookingReducer from '../Features/BookingsSlice';
import userReducer from '../Features/UserSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  bookings: bookingReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
