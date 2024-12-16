import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
const initialState = {
  allZakat: {},
  isLoading: true,
  isError: false,
  isRequestLoading: false,
  isRequestError: false,
};

// Async Thunks
export const fetchZakat = createAsyncThunk("zakat/fetchAll", async () => {
  const response = await fetch(`${baseUrl}/zakats/find`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
});

export const addZakat = createAsyncThunk("zakat/addZakat", async (formData) => {
  const response = await fetch(`${baseUrl}/zakats/add`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
});

const zakatSlice = createSlice({
  name: "zakat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchZakat.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchZakat.fulfilled, (state, action) => {
      state.allZakat = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchZakat.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(addZakat.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(addZakat.fulfilled, (state, action) => {
      state.allZakat = action.payload;
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(addZakat.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export default zakatSlice.reducer;
