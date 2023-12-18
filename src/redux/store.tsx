import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/Astrologer";
// ...

export const store = configureStore({
  reducer: {
    astrologer: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
