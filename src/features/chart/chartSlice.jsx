import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";

const initialState = {
  allProducts: [],
  data: {},
  isLoading: true,
  error: [],
  isError: false,
  isSuccess: false,
};

// Fetch all products
export const fetchUserChartData = createAsyncThunk(
  "data/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jazakAuthToken")?.toString();
      const userResponse = await fetch(`${baseUrl}/users/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const wallpaperResponse = await fetch(`${baseUrl}/wallpapers/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const users = await userResponse.json();
      const wallpapers = await wallpaperResponse.json();
      return {
        users,
        wallpapers,
      };
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch products", {
      //   position: "top-right",
      //   autoClose: 2500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      // throw error;
    }
  }
);

const chartSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   pending

    builder.addCase(fetchUserChartData.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
    });

    //   fulfilled

    builder.addCase(fetchUserChartData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = [];
      const users = action.payload?.users;
      const wallpapers = action.payload?.wallpapers;
      const totalUser = users?.length || 0;
      const totalWallpaper = wallpapers?.length || 0;
      const currentDate = new Date();
      const currentMonth = currentDate?.getMonth() + 1;
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const userChart = [];
      const wallpaperChart = [];
      let totalDonation = 0;
      let totalDonars = 0;

      users?.map((item) => {
        if (item?.totalDonation) {
          totalDonation += parseFloat(item?.totalDonation);
        }
      });

      users?.map((item) => {
        if (item?.totalDonation && item?.totalDonation > 0) {
          totalDonars += 1;
        }
      });

      // product count
      const userCounts = users?.reduce((acc, user) => {
        const date = new Date(user?.timestamp * 1000);
        const month = date?.getMonth() + 1;
        const day = date?.getDate();
        const dateString = `${month?.toString()?.padStart(2, "0")}-${day
          ?.toString()
          ?.padStart(2, "0")}`;
        if (!acc[dateString]) {
          acc[dateString] = 0;
        }
        acc[dateString] += 1;
        return acc;
      }, {});

      for (let day = 1; day <= 31; day++) {
        const dateString = `${currentMonth?.toString()?.padStart(2, "0")}-${day
          ?.toString()
          ?.padStart(2, "0")}`;
        const prevDateString = `${prevMonth?.toString()?.padStart(2, "0")}-${day
          ?.toString()
          ?.padStart(2, "0")}`;

        const usersCount = userCounts[dateString] || 0;
        const prevUserCount = userCounts[prevDateString] || 0;

        userChart.push({
          date: day?.toString()?.padStart(2, "0"),
          Current: usersCount,
          Previous: prevUserCount,
        });
      }


      const wallpaperCounts = wallpapers?.reduce((acc, user) => {
        const date = new Date(user?.timestamp * 1000);
        const month = date?.getMonth() + 1;
        const day = date?.getDate();
        const dateString = `${month?.toString()?.padStart(2, "0")}-${day
          ?.toString()
          ?.padStart(2, "0")}`;
        if (!acc[dateString]) {
          acc[dateString] = 0;
        }
        acc[dateString] += 1;
        return acc;
      }, {});

      for (let day = 1; day <= 31; day++) {
        const dateString = `${currentMonth?.toString()?.padStart(2, "0")}-${day
          ?.toString()
          ?.padStart(2, "0")}`;
        const prevDateString = `${prevMonth?.toString()?.padStart(2, "0")}-${day
          ?.toString()
          ?.padStart(2, "0")}`;

        const usersCount = wallpaperCounts[dateString] || 0;
        const prevUserCount = wallpaperCounts[prevDateString] || 0;

        wallpaperChart.push({
          date: day?.toString()?.padStart(2, "0"),
          Current: usersCount,
          Previous: prevUserCount,
        });
      }

      state.data = {
        totalUser: totalUser || 0,
        totalDonation: totalDonation || 0,
        totalDonar: totalDonars || 0,
        totalWallpaper: totalWallpaper || 0,
        userChart: userChart || [],
        wallpaperChart: wallpaperChart || [],
      };
    });

    //   rejected

    builder.addCase(fetchUserChartData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = action.error.message;
    });
  },
});

export default chartSlice.reducer;
