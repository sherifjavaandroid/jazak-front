import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  link: "",
  isLoading: false,
  isError: false,
  isRequestLoading: false,
};

// Get
export const fetchLink = createAsyncThunk(
  "dua/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/link`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  }
);

//post
export const postLink = createAsyncThunk(
  "mokka/post",
  async ({ data }, { dispatch, rejectWithValue }) => {
    console.log(data);
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    const response = await fetch(`${baseUrl}/link`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  }
);

const mokkaSlice = createSlice({
  name: "mokka",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Link
    builder.addCase(fetchLink.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchLink.fulfilled, (state, action) => {
      state.link = action.payload;
      state.isLoading = false;
      state.isError = false;
    });

    // Post Link
    builder.addCase(postLink.pending, (state) => {
      state.isError = false;
      state.isRequestLoading = true;
    });
    builder.addCase(postLink.fulfilled, (state, action) => {
      state.isError = false;
      state.isRequestLoading = false;
      state.link = action.payload;
    });
  },
});

export default mokkaSlice.reducer;
