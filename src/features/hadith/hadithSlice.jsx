/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";

const initialState = {
  allHadith: [],
  isLoading: false,
  error: [],
  isError: false,
  isRequestLoading: false,
  isRequestError: false,
};
const token = localStorage.getItem("jazakAuthToken")?.toString();

// async thunk to fetch all Hadith data from an API
export const fetchAllHadith = createAsyncThunk("hadith/all", async () => {
  const token = localStorage.getItem("jazakAuthToken")?.toString();
  const response = await fetch(`${baseUrl}/hadiths/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

//async thunk to fetch one hadith
export const fetchOneHadith = createAsyncThunk("hadith/one", async ({ id }) => {
  const token = localStorage.getItem("jazakAuthToken")?.toString();
  const response = await fetch(`${baseUrl}/hadiths/find/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

// async thunk to add a new Hadith
export const addNewHadith = createAsyncThunk("hadith/add", async (formData) => {
  const token = localStorage.getItem("jazakAuthToken")?.toString();
  const response = await fetch(`${baseUrl}/hadiths/add`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

//async thunk to update a hadith
export const updateHadith = createAsyncThunk(
  "hadith/update",
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();

    const response = await fetch(`${baseUrl}/hadiths/update/${id}`, {
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

//async thunk to delete a hadith
export const deleteHadith = createAsyncThunk("hadith/delete", async (id) => {
  const token = localStorage.getItem("jazakAuthToken")?.toString();
  const response = await fetch(`${baseUrl}/hadiths/delete/${id}`, {
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

const hadithSlice = createSlice({
  name: "hadith",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET DATA

    builder.addCase(fetchAllHadith.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllHadith.fulfilled, (state, action) => {
      state.allHadith = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(fetchAllHadith.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    //POST DATA
    builder.addCase(addNewHadith.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });

    builder.addCase(addNewHadith.fulfilled, (state, action) => {
      state.allHadith = [...state.allHadith, action.payload];
      state.isRequestLoading = false;
      state.isRequestError = false;
    });

    builder.addCase(addNewHadith.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    //update

    builder.addCase(updateHadith.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });

    builder.addCase(updateHadith.fulfilled, (state, action) => {
      state.allHadith = state.allHadith.map((category) =>
        category._id === action.payload.id
          ? { ...category, ...action.payload }
          : category
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(updateHadith.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    //delete
    builder.addCase(deleteHadith.pending, (state, action) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(deleteHadith.fulfilled, (state, action) => {
      state.allHadith = state.allHadith.filter(
        (item) => item._id !== action.payload
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });

    builder.addCase(deleteHadith.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export default hadithSlice.reducer;
