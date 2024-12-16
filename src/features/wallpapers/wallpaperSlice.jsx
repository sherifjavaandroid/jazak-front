import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
// Define the initial state
const initialState = {
  allWallpapers: [],
  isLoading: false,
  isError: false,
  error: null,
  isRequestLoading: false,
  isRequestError: false,
};
// Fetch wallpapers using createAsyncThunk
export const fetchWallpapers = createAsyncThunk(
  "wallpapers/fetchWallpapers",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken");
    const response = await fetch(`${baseUrl}/wallpapers/all`, {
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
      const data= await response.json()
      return data;
    } else {
      throw new Error("Failed to fetch wallpapers");
    }
  }
);
// Define the async thunk for adding a new wallpaper
export const addWallpaper = createAsyncThunk(
  "wallpapers/addWallpaper",
  async (formData) => {
    const token = localStorage.getItem("jazakAuthToken");
    const response = await fetch(`${baseUrl}/wallpapers/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  }
);

// Define the async thunk for updating a wallpaper by ID
export const updateWallpaper = createAsyncThunk(
  "wallpapers/updateWallpaper",
  async ({ id, wallpaperName, file, fileName }, { getState }) => {
    const token = localStorage.getItem("jazakAuthToken");

    const formData = new FormData();
    formData.append("data", JSON.stringify({ wallpaperName }));
    formData.append("file", file, fileName);

    const response = await fetch(
      `https://jazakallahbackend.onrender.com/wallpapers/update/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
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
      throw new Error("Something went wrong");
    }
  }
);

// Define the async thunk for deleting a wallpaper by ID
export const deleteWallpaper = createAsyncThunk(
  "wallpapers/deleteWallpaper",
  async ({ id }) => {
    const token = localStorage.getItem("jazakAuthToken");

    const response = await fetch(`${baseUrl}/wallpapers/delete/${id}`, {
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

// Create the wallpaper slice
const wallpaperSlice = createSlice({
  name: "wallpapers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch

    builder.addCase(fetchWallpapers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchWallpapers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allWallpapers = action.payload;
    });
    builder.addCase(fetchWallpapers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //post
    builder.addCase(addWallpaper.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(addWallpaper.fulfilled, (state, action) => {
      state.allWallpapers = [...state.allWallpapers, action.payload];
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(addWallpaper.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
    //update
    builder.addCase(updateWallpaper.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateWallpaper.fulfilled, (state, action) => {
      const updatedWallpaper = state.allWallpapers.find(
        (w) => w.id === action.payload.id
      );
      if (updatedWallpaper) {
        // Update the specific wallpaper
        updatedWallpaper.name = action.payload.name;
      }
      state.isLoading = false;
    });
    builder.addCase(updateWallpaper.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //delete
    builder.addCase(deleteWallpaper.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(deleteWallpaper.fulfilled, (state, action) => {
      state.allWallpapers = state.allWallpapers.filter(
        (w) => w._id !== action.payload
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(deleteWallpaper.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export const selectAllWallpapers = (state) => state.wallpapers.allWallpapers;

export default wallpaperSlice.reducer;
