import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  allDhikr: [],
  isLoading: true,
  isError: false,
  error: null,
};

// Async Thunks
export const fetchAllDhikrs = createAsyncThunk(
  "dhikr/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/dhikrs/all`, {
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
      throw new Error("Failed to fetch all dhikrs");
    }
  }
);

export const fetchOneDhikr = createAsyncThunk(
  "dhikr/fetchOne",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/dhikrs/find/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch dhikr by id");
    }
  }
);

export const fetchDhikrsByType = createAsyncThunk(
  "dhikr/fetchByType",
  async (type, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/dhikrs/type/${type}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch Dhikrs by type");
    }
  }
);

export const postDhikr = createAsyncThunk(
  "dhikr/post",
  async ({ dhikrData }, { dispatch, rejectWithValue }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(dhikrData));
    const token = localStorage.getItem("jazakAuthToken")?.toString();

    const response = await fetch(`${baseUrl}/dhikrs/add`, {
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
        toast.info("Dhikr added", {
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
      toast.error("Failed to post dhikr", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed to add dhikr");
    }
  }
);

export const updateDhikr = createAsyncThunk(
  "dhikr/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await fetch(`${baseUrl}/dhikrs/update/${id}`, {
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
      toast.success("Dhikr updated", {
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
      toast.error("Failed to update dhikr", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed to update dhikr");
    }
  }
);

export const deleteDhikr = createAsyncThunk(
  "dhikr/delete",
  async ({ id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/dhikrs/delete/${id}`, {
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
        toast.error("Dhikr deleted", {
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
      throw new Error("Failed To Delete Dhikr");
    }
  }
);

const dhikrSlice = createSlice({
  name: "dhikr",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all dhikrs
    builder.addCase(fetchAllDhikrs.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllDhikrs.fulfilled, (state, action) => {
      state.allDhikr = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllDhikrs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //fetch one dhikr
    builder
      .addCase(fetchOneDhikr.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchOneDhikr.fulfilled, (state, action) => {
        state.allDhikr = [action.payload];
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchOneDhikr.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
    //fetch dhikr by type
    builder
      .addCase(fetchDhikrsByType.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchDhikrsByType.fulfilled, (state, action) => {
        state.allDhikr = [action.payload]; // Wrap the single Dhikr object in an array
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchDhikrsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
    //add dhikr
    builder.addCase(postDhikr.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postDhikr.fulfilled, (state, action) => {
      state.allDhikr = [...state.allDhikr, action.payload];
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(postDhikr.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //update single dhikr
    builder.addCase(updateDhikr.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateDhikr.fulfilled, (state, action) => {
      state.allDhikr = state.allDhikr.map((dhikr) =>
        dhikr._id === action.payload.id
          ? { ...dhikr, ...action.payload.responseData }
          : dhikr
      );
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(updateDhikr.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //delete a dhikr

    builder.addCase(deleteDhikr.fulfilled, (state, action) => {
      state.allDhikr = state.allDhikr.filter(
        (dhikr) => dhikr._id !== action.payload
      );
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteDhikr.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default dhikrSlice.reducer;
