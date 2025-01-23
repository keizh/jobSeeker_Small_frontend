/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  JobArr: [],
  status: "idle", // loading , error , successfull , failed
  error: null,
};

export const postJob = createAsyncThunk(
  "Post/job",
  async (DATA, { _, rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DATA),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return resData.JobPosting;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "DELETE/job",
  async (id, { _, rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job/${id}`, {
        method: "DELETE",
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchJob = createAsyncThunk(
  "FETCH/job",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/job`, {
        method: "GET",
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      return resData.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const JobSlice = createSlice({
  name: "JobSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.status = "successfull";
        state.JobArr.push(action.payload);
      })
      .addCase(postJob.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });

    builder
      .addCase(deleteJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.status = "successfull";
        state.JobArr = state.JobArr.filter((ele) => ele._id != action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });

    builder
      .addCase(fetchJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "successfull";
        state.JobArr = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default JobSlice;
