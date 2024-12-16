import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import azkarSlice from "../features/azkar/azkarSlice";
import azkarCategoriesSlice from "../features/azkarCategories/AzkarCategoriesSlice";
import chartSlice from "../features/chart/chartSlice";
import dhikrSlice from "../features/dhikr/dhikrSlice";
import duaSlice from "../features/dua/duaSlice";
import duaCategoriesSlice from "../features/duaCategories/duaCategoriesSlice";
import eventPrayersSlice from "../features/eventPrayers/eventPrayersSlice";
import eventPrayersCategoriesSlice from "../features/eventPrayersCategories/eventPrayersCategoriesSlice";
import hadithSlice from "../features/hadith/hadithSlice";
import hadithCategoriesSlice from "../features/hadithCategories/hadithCategoriesSlice";
import hadithSubCategoriesSlice from "../features/hadithSubCategories/hadithSubCategoriesSlice";
import navSlice from "../features/nav/navSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";
import profileSlice from "../features/profile/profileSlice";
import usersSlice from "../features/users/usersSlice";
import wallpaperSlice from "../features/wallpapers/wallpaperSlice";
import zakatSlice from "../features/zakat/zakatSlice";
import mokkaSlice from "../features/mokka/mokkaSlice";

export const store = configureStore({
  reducer: {
    nav: navSlice,
    auth: authSlice,
    dhikr: dhikrSlice,
    hadith: hadithSlice,
    hadithCategories: hadithCategoriesSlice,
    hadithSubCategories: hadithSubCategoriesSlice,
    dua: duaSlice,
    duaCategories: duaCategoriesSlice,
    users: usersSlice,
    notifications: notificationsSlice,
    profile: profileSlice,
    azkar: azkarSlice,
    azkarCategories: azkarCategoriesSlice,
    eventPrayers: eventPrayersSlice,
    eventPrayersCategories: eventPrayersCategoriesSlice,
    chartData: chartSlice,
    wallpapers: wallpaperSlice,
    zakat: zakatSlice,
    mokka:mokkaSlice,
  },
});
