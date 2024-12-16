import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  alleventPrayers: [],
  isLoading: true,
  isError: false,
  error: null,
};

// Async Thunks
export const fetchAllEventPrayers = createAsyncThunk(
  "eventPrayers/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/event-prayers/all`, {
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
    } else if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      return data;
    }
  }
);

//get
export const fetchOnEeventPrayers = createAsyncThunk(
  "eventPrayers/fetchOne",
  async (id) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/eventPrayerss/find/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      return data;
    }
  }
);
//post
export const postEventPrayers = createAsyncThunk(
  "eventPrayers/post",
  async ({ eventPrayersData }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(eventPrayersData));

    const response = await fetch(`${baseUrl}/event-prayers/add`, {
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
        toast.info("Event prayer added", {
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
      toast.error("Failed to add Event Prayer", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed to add Event Prayer");
    }
  }
);

//update

export const updateEventPrayers = createAsyncThunk(
  "eventPrayers/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    const response = await fetch(`${baseUrl}/event-prayers/update/${id}`, {
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
      toast.success("Event prayer updated", {
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
    } else {
      toast.error("Failed to update Event Prayer", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed to update Event Prayer");
    }
  }
);
//delete
export const deleteEventPrayers = createAsyncThunk(
  "eventPrayers/delete",
  async ({ id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/event-prayers/delete/${id}`, {
      method: "DELETE",
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
      if (responseData.deletedCount > 0) {
        toast.error("Event prayer deleted", {
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
      toast.error("Failed to delete Event Prayer", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed to delete Event Prayer");
    }
  }
);

const eventPrayersSlice = createSlice({
  name: "eventPrayers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch All eventPrayerss
    builder.addCase(fetchAllEventPrayers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllEventPrayers.fulfilled, (state, action) => {
      state.alleventPrayers = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllEventPrayers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Fetch One eventPrayers
    builder.addCase(fetchOnEeventPrayers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchOnEeventPrayers.fulfilled, (state, action) => {
      // Handle the result for a single eventPrayers
      // Update state as needed
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchOnEeventPrayers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Post eventPrayers
    builder.addCase(postEventPrayers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postEventPrayers.fulfilled, (state, action) => {
      state.alleventPrayers.push(action.payload);
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postEventPrayers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Update eventPrayers
    builder.addCase(updateEventPrayers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateEventPrayers.fulfilled, (state, action) => {
      // Find the eventPrayers to update and replace it with the new data
      state.alleventPrayers = state.alleventPrayers.map((eventPrayers) =>
        eventPrayers._id === action.payload.id
          ? { ...eventPrayers, ...action.payload.responseData }
          : eventPrayers
      );
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateEventPrayers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Delete eventPrayers

    builder.addCase(deleteEventPrayers.fulfilled, (state, action) => {
      state.alleventPrayers = state.alleventPrayers.filter(
        (eventPrayers) => eventPrayers._id !== action.payload
      );
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteEventPrayers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default eventPrayersSlice.reducer;
