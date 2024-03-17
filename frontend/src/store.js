import { configureStore } from '@reduxjs/toolkit';

const initialState = {}; // You can keep your initial state here if needed

const store = configureStore({
  reducer: {}, // You can pass your combined reducers here
  // You can include additional middleware here if needed
});

export default store;
