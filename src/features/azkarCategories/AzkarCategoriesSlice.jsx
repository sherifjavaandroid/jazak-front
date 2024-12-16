import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  allCategory: [],
  isLoading: false,
  error: [],
  isError: false,
  isRequestLoading: false,
  isRequestError: false,
};

//GET
export const fetchAllAzkarCategory = createAsyncThunk(
  "azkarCategory/all",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/azkar-categories/all`, {
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
export const postAzkarCategory = createAsyncThunk(
  "azkarCategory/post",
  async (formData) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/azkar-categories/add`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

//update

export const updateAzkarCategory = createAsyncThunk(
  "azkarCategory/update",
  async ({ data: formData, id }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/azkar-categories/update/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json()
    return responseData;
  }
);

//delete
export const deleteAzkarCategory = createAsyncThunk(
  "azkarCategory/delete",
  async (id) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/azkar-categories/delete/${id}`, {
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

//slice
const azkarCategoriesSlice = createSlice({
  name: "azkarCategories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(fetchAllAzkarCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchAllAzkarCategory.fulfilled, (state, action) => {
      state.allCategory = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(fetchAllAzkarCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //post one

    builder.addCase(postAzkarCategory.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(postAzkarCategory.fulfilled, (state, action) => {
      state.allCategory = [...state.allCategory, action.payload];
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(postAzkarCategory.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
    //update
    builder.addCase(updateAzkarCategory.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
      state.error = null;
    });

    builder.addCase(updateAzkarCategory.fulfilled, (state, action) => {
      state.allCategory = state.allCategory.map((category) =>
        category._id === action.payload._id
          ? { ...category, ...action.payload }
          : category
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(updateAzkarCategory.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    // Delete Category

    builder.addCase(deleteAzkarCategory.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(deleteAzkarCategory.fulfilled, (state, action) => {
      state.allCategory = state.allCategory.filter(
        (category) => category._id !== action.payload
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(deleteAzkarCategory.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export default azkarCategoriesSlice.reducer;
