import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
const initialState = {
  allHadithCategory: [],
  isLoading: false,
  error: [],
  isError: false,
  isRequestLoading: false,
  isRequestError: false,
};

//GET
export const fetchAllHadithCategory = createAsyncThunk(
  "hadithCategory/all",
  async () => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/hadith-categories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Set the Bearer token
      },
    });
    const data = await response.json();
    return data;
  }
);
//post
export const postHadithCategory = createAsyncThunk(
  "hadithCategory/post",
  async (formData) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/hadith-categories/add`, {
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
export const updateHadithCategory = createAsyncThunk(
  "hadithCategory/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/hadith-categories/update/${id}`, {
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
//delete
export const deleteCategory = createAsyncThunk(
  "hadithCategory/delete",
  async (id) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/hadith-categories/delete/${id}`, {
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

const hadithCategoriesSlice = createSlice({
  name: "hadithCategories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(fetchAllHadithCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchAllHadithCategory.fulfilled, (state, action) => {
      state.allHadithCategory = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(fetchAllHadithCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //post one

    builder.addCase(postHadithCategory.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(postHadithCategory.fulfilled, (state, action) => {
      state.allHadithCategory = [...state.allHadithCategory, action.payload];
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(postHadithCategory.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
    //update
    builder.addCase(updateHadithCategory.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });

    builder.addCase(updateHadithCategory.fulfilled, (state, action) => {
      state.allHadithCategory = state.allHadithCategory.map((category) =>
        category._id === action.payload._id
          ? { ...category, ...action.payload }
          : category
      );

      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(updateHadithCategory.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    // Delete Category
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      // Filter out the deleted category
      state.allHadithCategory = state.allHadithCategory.filter(
        (category) => category._id !== action.payload
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export default hadithCategoriesSlice.reducer;
