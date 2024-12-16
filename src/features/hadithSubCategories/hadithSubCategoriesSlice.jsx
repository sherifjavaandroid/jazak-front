import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  allHadithSubCategory: [],
  hadithSubCategory: [],
  isLoading: true,
  error: [],
  isError: false,
};

//GET
export const fetchAllSubCategory = createAsyncThunk(
  "subcategory/all",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/hadith-subcategories/all`, {
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
//GET
export const fetchSubCategoryByCategory = createAsyncThunk(
  "subcategory/category",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(
      `${baseUrl}/hadith-subcategories/category/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Set the Bearer token
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
export const postSubCategory = createAsyncThunk(
  "subcategory/post",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await fetch(`${baseUrl}/hadith-subcategories/add`, {
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
        toast.info("Sub Category added", {
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
      toast.error("Failed to add SubCategory", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed To Post SubCategory");
    }
  }
);
//update
export const updateSubCategory = createAsyncThunk(
  "subcategory/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await fetch(
      `${baseUrl}/hadith-subcategories/update/${id}`,
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

      toast.success("SubCategory updated", {
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
      toast.error("Failed to update SubCategory", {
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
export const deleteSubCategory = createAsyncThunk(
  "subcategory/delete",
  async ({ id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(
      `${baseUrl}/hadith-subcategories/delete/${id}`,
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
        toast.error("Sub Category has been deleted", {
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
      return id;
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

const hadithSubCategoriesSlice = createSlice({
  name: "hadithSubCategories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(fetchAllSubCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchAllSubCategory.fulfilled, (state, action) => {
      state.allHadithSubCategory = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(fetchAllSubCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    // GET by category
    builder.addCase(fetchSubCategoryByCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchSubCategoryByCategory.fulfilled, (state, action) => {
      state.hadithSubCategory = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(fetchSubCategoryByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //post one

    builder.addCase(postSubCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postSubCategory.fulfilled, (state, action) => {
      state.allHadithSubCategory = [
        ...state.allHadithSubCategory,
        action.payload,
      ];
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(postSubCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //update
    builder.addCase(updateSubCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(updateSubCategory.fulfilled, (state, action) => {
      state.allHadithSubCategory = state.allHadithSubCategory.map(
        (subCategory) =>
          subCategory._id === action.payload.id
            ? { ...subCategory, ...action.payload.responseData }
            : subCategory
      );

      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(updateSubCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // Delete SubCategory

    builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
      // Filter out the deleted SubCategory
      state.allHadithSubCategory = state.allHadithSubCategory.filter(
        (subCategory) => subCategory._id !== action.payload
      );
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteSubCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default hadithSubCategoriesSlice.reducer;
