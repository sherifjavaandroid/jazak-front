import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { errorNotify } from "../../util/getNotify";
import { logout } from "../auth/authSlice";
const initialState = {
  allUsers: [],
  isLoading: false,
  isError: false,
  error: null,
  chartsData: [],
  isRequestLoading: false,
  isRequestError: false,
};

// Fetch all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/users/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 403) {
      dispatch(logout());
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
    } else if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      toast.error("Failed to load users", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  }
);

// Update user by ID
export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async ({ data, file, id, dispatch, rejectWithValue }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/users/update/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 403) {
      dispatch(logout());
      errorNotify("You are not authorized");
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
    } else if (responseData) {
      toast.success("User updated successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getAllUsers();
      return id;
    } else {
      toast.error("Failed to updated user", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed to Update User");
    }
  }
);

// Update user password by old password
export const updateUserPasswordByOldPassword = createAsyncThunk(
  "users/updateUserPasswordByOldPassword",
  async ({ data, email, dispatch, rejectWithValue }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    try {
      const token = localStorage.getItem("jazakAuthToken")?.toString();
      const response = await fetch(`${baseUrl}/users/resetpassword/${email}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.status === 403) {
        dispatch(logout());
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
      }

      const responseData = await response.json();

      if (responseData.modifiedCount > 0) {
        toast.success("Password updated successfully", {
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
      } else {
        toast.error("Sorry password was not updated", {
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
    } catch (error) {
      toast.error("Something went wrong", {
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
  }
);

// Delete user by ID
export const deleteUserById = createAsyncThunk(
  "users/deleteUserById",
  async (id) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data?.message) {
      return id;
    } else {
      return data;
    }
  }
);

//reset password by id
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ data, id }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    // Get the token from localStorage
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(`${baseUrl}/users/update/${id}`, config);
    return response.json();
  }
);

// Define the async thunk for getting charts data
export const getChartsData = createAsyncThunk(
  "charts/getChartsData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jazakAuthToken")?.toString();
      const usersData = await fetch(`${baseUrl}/users/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;

      const usersChartsData = [];

      // Count users by date
      const usersCountByDate = usersData?.reduce((acc, user) => {
        const date = new Date(user.timestamp * 1000); // Convert timestamp to date
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();

        const dateString = `${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (!acc[dateString]) {
          acc[dateString] = 0;
        }

        acc[dateString] += 1;

        return acc;
      }, {});

      // Assign user counts to chart data
      for (let day = 1; day <= 31; day++) {
        const dateString = `${currentMonth.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
        const prevDateString = `${prevMonth.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        const userCount = usersCountByDate[dateString] || 0;
        const prevUserCount = usersCountByDate[prevDateString] || 0;

        usersChartsData.push({
          date: day.toString().padStart(2, "0"),
          current: userCount,
          previous: prevUserCount,
        });
      }

      return {
        data: usersChartsData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    // Get All Users - Fulfilled
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    });

    // Get All Users - Rejected
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Update User by ID - Pending
    builder.addCase(updateUserById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    // Update User by ID - Fulfilled
    builder.addCase(updateUserById.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    // Update User by ID - Rejected
    builder.addCase(updateUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Update User Password - Pending
    builder.addCase(updateUserPasswordByOldPassword.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    // Update User Password - Fulfilled
    builder.addCase(updateUserPasswordByOldPassword.fulfilled, (state) => {
      state.isLoading = false;
      // Handle successful password update
    });

    // Update User Password - Rejected
    builder.addCase(
      updateUserPasswordByOldPassword.rejected,
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      }
    );

    // Delete User by ID - Pending
    builder.addCase(deleteUserById.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });

    // Delete User by ID - Fulfilled
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });

    // Delete User by ID - Rejected
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    //reset password by id
    builder.addCase(resetPassword.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder
      .addCase(resetPassword.rejected, (state, action) => {
        state.isRequestLoading = false;
        state.isRequestError = true;
      })

      // Get Charts Data
      .addCase(getChartsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getChartsData.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming action.payload is an array of users
        state.chartsData = action.payload; // Adjust this according to your data structure
      })
      .addCase(getChartsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Access the error message from action.payload
      });
  },
});

export default userSlice.reducer;
