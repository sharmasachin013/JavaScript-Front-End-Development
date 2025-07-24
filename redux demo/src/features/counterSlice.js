import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    reset: (state) => {
      state.counter = 0;
    },
  },
});

export const { increment, decrement, reset } = CounterSlice.actions;
export default CounterSlice.reducer;
