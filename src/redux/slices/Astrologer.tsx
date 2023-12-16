import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/Axios";

interface ApiState {
  data: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define a thunk to fetch data from the API
export const gellAllAstrologer = createAsyncThunk<string, void>(
  "api/gell-all-astrologer",
  async () => {
    const response = await API.get("/astrologers");
    console.log("response", response);
    return response.data; // Assuming response has a 'data' property
  }
);

export const addAstrologer = createAsyncThunk<string, void>(
  "api/add-astrologer",
  async () => {
    const response = await fetch("https://api.example.com/data");
    return response.json();
  }
);

export const deleteAstrologer = createAsyncThunk<string, void>(
  "api/delete-astrologer",
  async () => {
    const response = await fetch("https://api.example.com/data");
    return response.json();
  }
);

export const updateAstrologer = createAsyncThunk<string, void>(
  "api/update-astrologer",
  async () => {
    const response = await fetch("https://api.example.com/data");
    return response.json();
  }
);

// Create a slice with the API thunk
const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  } as ApiState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAstrologer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addAstrologer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(addAstrologer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(gellAllAstrologer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        gellAllAstrologer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(gellAllAstrologer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(deleteAstrologer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteAstrologer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(deleteAstrologer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(updateAstrologer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateAstrologer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(updateAstrologer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default apiSlice.reducer;
