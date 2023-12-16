// store.ts
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/Astrologer';

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

export default store;
