import { createSlice } from '@reduxjs/toolkit';


const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookingId: null,
  },
  reducers: {
    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    },
  },
});

export const { setBookingId } = bookingSlice.actions;
export default bookingSlice.reducer;