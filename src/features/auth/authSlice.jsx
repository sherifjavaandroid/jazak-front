import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../util/api";

const initialState = {
  token: localStorage.getItem("jazakAuthToken") || null,
  email: null,
  _id: "",
  isRequestLoading: false,
  isRequestError: false,
};

export const updateAdminPassword = createAsyncThunk(
  "admin/updateAdminPassword",
  async (formData) => {
    const response = await fetch(`${baseUrl}/admins/reset`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to reset password");
    } else {
      const data = await response.json();
      return data;
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state._id = action.payload._id;
      localStorage.setItem("jazakAuthToken", state.token);
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state._id = null;
      localStorage.removeItem("jazakAuth");
      localStorage.removeItem("jazakAuthToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAdminPassword.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });

    builder.addCase(updateAdminPassword.fulfilled, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = false;
    });

    builder.addCase(updateAdminPassword.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;
