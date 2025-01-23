import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "../features/JobSlice";

const store = configureStore({
  reducer: {
    Job: JobSlice.reducer,
  },
});

export default store;
