import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";
import { errorNotify, infoNotify } from "../../util/getNotify";
import { logout } from "../auth/authSlice";
const initialState = {
  allNotifications: [],
  isLoading: false,
  isError: false,
  error: null,
  isRequestLoading: false,
  isRequestError: false,
};

// GET All Notifications
export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("jazakAuthToken");
    const response = await fetch(`${baseUrl}/fetch_notification_history`, {
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
      throw new Error("Failed to fetch notifications");
    }
  }
);

// GET One Notification by ID
export const fetchOneNotification = createAsyncThunk(
  "notifications/fetchOne",
  async (id) => {
    const token = localStorage.getItem("jazakAuthToken");
    const response = await fetch(`${baseUrl}/notifications/find/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch notification by ID");
    }
  }
);

export const sendNotification = createAsyncThunk(
  "notification/send",
  async ({ data, player_ids }) => {
    const token = localStorage.getItem("jazakAuthToken");
    const response = await fetch(`${baseUrl}/create_notification_history`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    const pushNotification = {
      app_id: import.meta.env.VITE_NOTIFICATION_APP_ID,
      contents: {
        en: responseData?.message,
      },
      big_picture: responseData?.image,
      headings: {
        en: responseData?.title,
      },
      include_player_ids: player_ids,
    };

    const notifyResponse = await fetch(import.meta.env.VITE_NOTIFICATION_URL, {
      method: "POST",
      body: JSON.stringify(pushNotification),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (notifyResponse?.ok) {
      infoNotify("Successfully sent");
    } else {
      errorNotify("Something went wrong");
    }
    return responseData;
  }
);

// POST New Notification
export const postNotification = createAsyncThunk(
  "notifications/post",
  async (
    { title, message, file, selectedUser, selectedItems },
    { dispatch, rejectWithValue }
  ) => {
    const token = localStorage.getItem("jazakAuthToken");
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title,
        message,
        user_type: selectedUser,
      })
    );
    formData.append("image", file);
    const response = await fetch(`${baseUrl}/create_notification_history`, {
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
        // create push notification
        const pushNotification = {
          app_id: import.meta.env.VITE_NOTIFICATION_APP_ID,
          contents: {
            en: responseData?.notificationMessage,
          },
          big_picture: responseData?.fileUrl,
          headings: {
            en: responseData?.notificationTitle,
          },
          include_player_ids: selectedItems,
        };
        //make request to one signal
        const oneSignalRes = await fetch(
          import.meta.env.VITE_NOTIFICATION_URL,
          {
            method: "POST",
            body: JSON.stringify(pushNotification),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (oneSignalRes.ok) {
          toast.info("Notifaction  Added", {
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
        return responseData;
      }
    } else {
      toast.error("Failed To Post Notification", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error("Failed To Post Notification");
    }
  }
);

// DELETE Notification by ID
export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (id) => {
    const token = localStorage.getItem("jazakAuthToken");
    const response = await fetch(`${baseUrl}/notification_history/${id}`, {
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

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all
    builder.addCase(fetchAllNotifications.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
      state.allNotifications = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(fetchAllNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    // post a notification
    builder.addCase(postNotification.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(postNotification.fulfilled, (state, action) => {
      state.allNotifications = [...state.allNotifications, action.payload];
      state.isLoading = false;
      state.isError = false;
      state.error = [];
    });
    builder.addCase(postNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });

    //send notification

    builder.addCase(sendNotification.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(sendNotification.fulfilled, (state, action) => {
      // state.allNotifications = [...state.allNotifications, action.payload];
      state.isRequestLoading = false;
      state.isRequestError = false;
      state.allNotifications = [...state.allNotifications, action.payload];
    });
    builder.addCase(sendNotification.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });

    //delete a notifcation
    builder.addCase(deleteNotification.pending, (state) => {
      state.isRequestLoading = true;
      state.isRequestError = false;
    });
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      // Find and remove the deleted notification by ID
      state.allNotifications = state.allNotifications.filter(
        (notification) => notification._id !== action.payload
      );
      state.isRequestLoading = false;
      state.isRequestError = false;
    });
    builder.addCase(deleteNotification.rejected, (state, action) => {
      state.isRequestLoading = false;
      state.isRequestError = true;
    });
  },
});

export default notificationsSlice.reducer;
