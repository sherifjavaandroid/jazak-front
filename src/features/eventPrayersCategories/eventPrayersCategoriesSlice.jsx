import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  allCategory: [],
  isLoading: true,
  error: [],
  isError: false,
};

//GET
export const fetchAllEventPrayersCategory = createAsyncThunk(
  "eventCategory/all",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/event-prayer-categories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Set the Bearer token
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
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      return data;
    }
  }
);
//post
export const postEventPrayersCategory = createAsyncThunk(
  "eventCategory/post",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await fetch(`${baseUrl}/event-prayer-categories/add`, {
      method: "POST",
      body: formData,
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
      const responseData = await response.json();
      if (responseData._id) {
        toast.info("Category added", {
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
    } else {
      toast.error("Failed to add category", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed To Post Category");
    }
  }
);
//update
export const updateEventPrayersCategory = createAsyncThunk(
  "eventCategory/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await fetch(
      `${baseUrl}/event-prayer-categories/update/${id}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
      const responseData = await response.json();
      toast.success("Category updated", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return { responseData, id };
    } else if (response.status == 500) {
      toast.error("Internal server error, refresh now", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Failed to update category", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed to update category");
    }
  }
);
//delete
export const deleteEventPrayersCategory = createAsyncThunk(
  "eventCategory/delete",
  async ({ id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(
      `${baseUrl}/event-prayer-categories/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
      const responseData = await response.json();
      if (responseData.deletedCount > 0) {
        toast.error("Category has been deleted", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return id;
      }
    } else {
      toast.error("Failed to delete category", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed To Delete category");
    }
  }
);

//slice
const eventPrayersCategoriesSlice = createSlice({
  name: "eventPrayersCategories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(fetchAllEventPrayersCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchAllEventPrayersCategory.fulfilled, (state, action) => {
      state.allCategory = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(fetchAllEventPrayersCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //post one

    builder.addCase(postEventPrayersCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postEventPrayersCategory.fulfilled, (state, action) => {
      state.allCategory = [...state.allCategory, action.payload];
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(postEventPrayersCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //update
    builder.addCase(updateEventPrayersCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(updateEventPrayersCategory.fulfilled, (state, action) => {
      state.allCategory = state.allCategory.map((category) =>
        category._id === action.payload.id
          ? { ...category, ...action.payload.responseData }
          : category
      );
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(updateEventPrayersCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Delete Category

    builder.addCase(deleteEventPrayersCategory.fulfilled, (state, action) => {
      // Filter out the deleted category
      state.allCategory = state.allCategory.filter(
        (category) => category._id !== action.payload
      );
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteEventPrayersCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default eventPrayersCategoriesSlice.reducer;
