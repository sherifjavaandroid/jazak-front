import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { logout } from "../auth/authSlice";
const initialState = {
  allDuaCategory: [],
  isLoading: true,
  error: [],
  isError: false,
  requestIsLoading: false,
};

//GET
export const fetchAllDuaCategory = createAsyncThunk(
  "duaCategory/all",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/dua-categories/all`, {
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
export const postDuaCategory = createAsyncThunk(
  "duaCategory/post",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await fetch(`${baseUrl}/dua-categories/add`, {
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
      if(response.status == 404){
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
      }else{
          toast.error("Failed to post category", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        throw new Error("Failed To post Category");
        }
    }
  }
);
//update
export const updateDuaCategory = createAsyncThunk(
  "duaCategory/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await fetch(`${baseUrl}/dua-categories/update/${id}`, {
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
    } else {
      if(response.status == 404){
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
      }else{
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
        throw new Error("Failed To update Category");
        }
    }
  }
);
//delete
export const deleteDuaCategory = createAsyncThunk(
  "duaCategory/delete",
  async ({ id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/dua-categories/delete/${id}`, {
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
    } else {
      if(response.status == 404){
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
      }else{
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
        throw new Error("Failed To delete Category");
        }
    }
  }
);

//slice
const duaCategoriesSlice = createSlice({
  name: "duaCategories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(fetchAllDuaCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.requestIsLoading=true;
    });

    builder.addCase(fetchAllDuaCategory.fulfilled, (state, action) => {
      state.allDuaCategory = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = [];
      state.requestIsLoading=false;
    });
    builder.addCase(fetchAllDuaCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    //post one

    builder.addCase(postDuaCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.requestIsLoading=true;
    });
    builder.addCase(postDuaCategory.fulfilled, (state, action) => {
      state.allDuaCategory = [...state.allDuaCategory, action.payload];
      state.isLoading = false;
      state.isError = false;
      state.error = [];
      state.requestIsLoading=false;
    });
    builder.addCase(postDuaCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.requestIsLoading=false;
      state.error = action.error.message;
    });
    //update
    builder.addCase(updateDuaCategory.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
      state.requestIsLoading=true;
    });

    builder.addCase(updateDuaCategory.fulfilled, (state, action) => {
      state.allDuaCategory = state.allDuaCategory.map((category) =>
        category._id === action.payload.id
          ? { ...category, ...action.payload.responseData }
          : category
      );
      state.isLoading = false;
      state.isError = false;
      state.error = [];
      state.requestIsLoading=false;
    });
    builder.addCase(updateDuaCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = action.error.message;
      state.requestIsLoading=false;
    });

    // Delete Category

    builder.addCase(deleteDuaCategory.fulfilled, (state, action) => {
      // Filter out the deleted category
      state.allDuaCategory = state.allDuaCategory.filter(
        (category) => category._id !== action.payload
      );
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.requestIsLoading=false;
    });
    builder.addCase(deleteDuaCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = action.error.message;
      state.requestIsLoading=false;
    });
  },
});

export default duaCategoriesSlice.reducer;
