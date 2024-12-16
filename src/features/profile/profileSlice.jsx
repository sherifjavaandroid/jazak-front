import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";

const initialState = {
  fullName: "",
  email: "",
  img: "",
  _id: "",
  isLoading: true,
  isError: false,
  error: "",
  isRequestLoading: false,
  isRequestError: false,
};
const token = localStorage.getItem("jazakAuthToken")?.toString();
export const getAdminProfile = createAsyncThunk(
  "admin/get",
  async ({ id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/admins/find/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();

    if (response.status === 403) {
      toast.error("You are not authorized", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(logout());
    }

    return responseData;
  }
);

export const updateAdminById = createAsyncThunk(
  "admin/updateAdminById",
  async ({ id, data }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/admins/update/${id}`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  }
);

export const updateAdminPasswordByOldPassword = createAsyncThunk(
  "admin/reset",
  async ({ email, oldPassword, newPassword, dispatch }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ oldPassword, newPassword }));
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/admins/reset-password/${email}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.status === 403) {
      toast.error("You are not authorized", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(logout());
    }

    if (response.status == 401) {
      toast.error("Invalid Password", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    if (response.ok) {
      const responseData = await response.json();
      toast.success("Profile updated", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return responseData;
    }
  }
);
//send password reset link
export const sendAdminPasswordResetLink = createAsyncThunk(
  "auth/sendAdminPasswordResetLink",
  async ({ email }) => {
    const formData = new FormData();
    formData.append("email", email);
    const config = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(`${baseUrl}/admins/reset`, config);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  }
);
//reset admin password
export const resetAdminPassword = createAsyncThunk(
  "auth/resetAdminPassword",
  async ({ email, newPassword }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString(); // Get the token from localStorage
    const formData = new FormData();
    formData.append("data", { email, newPassword });

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(`${baseUrl}/admins/reset`, config);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminProfile.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getAdminProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.img = action.payload.fileUrl;
      state._id = action.payload._id;
    });
    builder.addCase(getAdminProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    builder.addCase(updateAdminById.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(updateAdminById.fulfilled, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = false;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.img = action.payload.fileUrl;
      state._id = action.payload._id;
    });
    builder.addCase(updateAdminById.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    builder.addCase(
      updateAdminPasswordByOldPassword.pending,
      (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      }
    );
    builder.addCase(
      updateAdminPasswordByOldPassword.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      }
    );
    builder.addCase(
      updateAdminPasswordByOldPassword.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      }
    );
    //send reset link
    builder
      .addCase(sendAdminPasswordResetLink.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(sendAdminPasswordResetLink.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(sendAdminPasswordResetLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
    //reset admin password
    builder
      .addCase(resetAdminPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(resetAdminPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(resetAdminPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
