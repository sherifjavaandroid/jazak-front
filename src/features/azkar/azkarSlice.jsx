import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  allAzkar: [],
  isLoading: false,
  isError: false,
  error: null,
  isRequestLoading: false,
  isRequestError: false,
};

// Async Thunks
export const fetchAllAzkars = createAsyncThunk(
  "azkar/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/azkars/all`, {
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
export const fetchOneAzkar = createAsyncThunk("azkar/fetchOne", async (id) => {
  const token = localStorage.getItem("jazakAuthToken")?.toString();
  const response = await fetch(`${baseUrl}/azkars/find/${id}`, {
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
});

//post
export const postAzkar = createAsyncThunk("azkar/post", async (formData) => {
  const token = localStorage.getItem("jazakAuthToken")?.toString();
  const response = await fetch(`${baseUrl}/azkars/add`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
});

//update

export const updateAzkar = createAsyncThunk(
  "azkar/update",
  async ({ data, id }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/azkars/update/${id}`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }
);
//delete
export const deleteAzkar = createAsyncThunk("azkar/delete", async (id) => {
  const token = localStorage.getItem("jazakAuthToken")?.toString();
  const response = await fetch(`${baseUrl}/azkars/delete/${id}`, {
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
});

const azkarSlice = createSlice({
  name: "azkar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch All Azkars
    builder.addCase(fetchAllAzkars.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllAzkars.fulfilled, (state, action) => {
      state.allAzkar = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllAzkars.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Fetch One Azkar
    builder.addCase(fetchOneAzkar.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchOneAzkar.fulfilled, (state, action) => {
      // Handle the result for a single Azkar
      // Update state as needed
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchOneAzkar.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Post Azkar
    builder.addCase(postAzkar.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(postAzkar.fulfilled, (state, action) => {
      state.allAzkar.push(action.payload);
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(postAzkar.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    // Update Azkar
    builder.addCase(updateAzkar.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(updateAzkar.fulfilled, (state, action) => {
      state.allAzkar = state.allAzkar.map((azkar) =>
        azkar._id === action.payload._id
          ? { ...azkar, ...action.payload }
          : azkar
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(updateAzkar.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    // Delete Azkar

    builder.addCase(deleteAzkar.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });

    builder.addCase(deleteAzkar.fulfilled, (state, action) => {
      state.allAzkar = state.allAzkar.filter(
        (Azkar) => Azkar._id !== action.payload
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });

    builder.addCase(deleteAzkar.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export default azkarSlice.reducer;
