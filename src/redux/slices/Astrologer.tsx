import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/Axios";
interface AstrologerState {
  data: [] | null;
  loading: boolean;
  error: string | null;
  meAstrologer: {} | null;
}

const initialState: AstrologerState = {
  data: [],
  loading: false,
  error: "",
  meAstrologer: {},
};

interface values {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}
interface id {
  id: string;
}

interface AddAstrologerArguments {
  values: values;
}

interface UpdateAstrologerArguments extends AddAstrologerArguments {
  id: string;
}

export const getAstrologer = createAsyncThunk(
  "astrologer/getAstrologer",
  async () => {
    try {
      const response = await API.get("/astrologers");
      console.log("api response", response.data.astrologerData);
      return response.data.astrologerData;
    } catch (error) {
      throw error;
    }
  }
);

export const getMyAstrologer = createAsyncThunk(
  "astrologer/getMyAstrologer",
  async ({ id }: id) => {
    try {
      const response = await API.get(`/my-astrologers/${id}`);
      console.log("me astro api response", response.data.astrologerData);
      return response.data.astrologerData;
    } catch (error) {
      throw error;
    }
  }
);

export const addAstrologer = createAsyncThunk(
  "astrologer/addAstrologer",
  async ({ values }: AddAstrologerArguments) => {
    try {
      // Your asynchronous logic here
      console.log("values in add", values);
      const response = await API.post("/astrologers/register", { values });
      console.log("api response", response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAstrologer = createAsyncThunk(
  "astrologer/updateAstrologer",
  async ({ values, id }: UpdateAstrologerArguments) => {
    try {
      console.log("values in edit", values, id);
      const response = await API.patch(`/astrologers/${id}`, { values });
      console.log("api response", response.data);
      return response.data; // Assuming response has an 'astrologer' property
    } catch (error) {
      throw error; // Throw the error to be handled by the rejected case
    }
  }
);
export const deleteAstrologer = createAsyncThunk(
  "astrologer/deleteAstrologer",
  async ({ id }: id) => {
    try {
      const response = await API.delete(`/astrologers/${id}`);
      console.log("api response delete", response.data.astrologerData);
      return response.data.astrologerData; // Assuming response has an 'astrologer' property
    } catch (error) {
      throw error; // Throw the error to be handled by the rejected case
    }
  }
);

export const astrologerSlice = createSlice({
  name: "Astrologer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAstrologer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAstrologer.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(state);
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getAstrologer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(addAstrologer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAstrologer.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(state);
        state.loading = false;
        state.error = null;
        // Assuming `action.payload` is the updated data after adding
        state.data = action.payload;
      })
      .addCase(addAstrologer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(updateAstrologer.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateAstrologer.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log(state);
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(
        updateAstrologer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.data = [];
        }
      )
      .addCase(deleteAstrologer.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteAstrologer.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log(state);
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteAstrologer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.data = [];
        }
      )
      .addCase(getMyAstrologer.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getMyAstrologer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = null;
          state.meAstrologer = action.payload;
        }
      )
      .addCase(
        getMyAstrologer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.data = [];
        }
      );
  },
});

export default astrologerSlice.reducer;
