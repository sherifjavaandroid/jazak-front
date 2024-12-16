import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  allDua: [],
  isLoading: true,
  isError: false,
  error: null,
  requestisLoading: false,
};

// Async Thunks
export const fetchAllDuas = createAsyncThunk(
  "dua/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/duas/all`, {
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
export const fetchOneDua = createAsyncThunk(
  "dua/fetchOne",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/duas/find/${id}`, {
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
export const postDua = createAsyncThunk(
  "dua/post",
  async ({ duaData }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(duaData));

    const response = await fetch(`${baseUrl}/duas/add`, {
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
        toast.info("Successfully added", {
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

//update

export const updateDua = createAsyncThunk(
  "dua/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    const response = await fetch(`${baseUrl}/duas/update/${id}`, {
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
      toast.success("Successfully updated", {
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
//delete
export const deleteDua = createAsyncThunk(
  "dua/delete",
  async ({ id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();

    const response = await fetch(`${baseUrl}/duas/delete/${id}`, {
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
    } else if (response.status === 200) {
      const responseData = await response.json();
      toast.error("Dua deleted", {
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
    } else {
      if (response.status == 404) {
        toast.error("Server Not Found", {
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
        toast.error("Failed To Delete Category", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        throw new Error("Failed To Delete Category");
      }
    }
  }
);

const duaSlice = createSlice({
  name: "dua",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch All Duas
    builder.addCase(fetchAllDuas.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllDuas.fulfilled, (state, action) => {
      state.allDua = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllDuas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Fetch One Dua
    builder.addCase(fetchOneDua.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.requestisLoading = true;
    });
    builder.addCase(fetchOneDua.fulfilled, (state, action) => {
      // Handle the result for a single Dua
      // Update state as needed
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.requestisLoading = false;
    });
    builder.addCase(fetchOneDua.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
      state.requestisLoading = false;
    });

    // Post Dua
    builder.addCase(postDua.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.requestisLoading = true;
    });
    builder.addCase(postDua.fulfilled, (state, action) => {
      state.allDua.push(action.payload);
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.requestisLoading = false;
    });
    builder.addCase(postDua.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = action.error.message;
      state.requestisLoading = false;
    });

    // Update Dua
    builder.addCase(updateDua.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.requestisLoading = true;
    });
    builder.addCase(updateDua.fulfilled, (state, action) => {
      // Find the Dua to update and replace it with the new data
      state.allDua = state.allDua.map((dua) =>
        dua._id === action.payload.id
          ? { ...dua, ...action.payload.responseData }
          : dua
      );
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.requestisLoading = false;
    });
    builder.addCase(updateDua.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = action.error.message;
      state.requestisLoading = false;
    });

    // Delete Dua

    builder.addCase(deleteDua.fulfilled, (state, action) => {
      state.allDua = state.allDua.filter((dua) => dua._id !== action.payload);
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.requestisLoading = false;
    });
    builder.addCase(deleteDua.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default duaSlice.reducer;
