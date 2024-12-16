import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import Azkar from "../pages/azkar/Azkar";
import AzkarCategories from "../pages/azkarCategories/AzkarCategories";
import Dua from "../pages/dua/Dua";
import DuaCategories from "../pages/duaCategories/DuaCategories";
import EventPrayers from "../pages/eventPrayers/EventPrayers";
import EventPrayersCategories from "../pages/eventPrayersCategories/EventPrayersCategories";
import AdminReset from "../pages/forms/AdminReset";
import AzkarCategoriesForm from "../pages/forms/AzkarCategoriesForm";
import AzkarCategoriesUpdateForm from "../pages/forms/AzkarCategoriesUpdateForm";
import AzkarForm from "../pages/forms/AzkarForm";
import AzkarUpdateForm from "../pages/forms/AzkarUpdateForm";
import DuaAddForm from "../pages/forms/DuaAddForm";
import DuaCategoriesAddForm from "../pages/forms/DuaCategoriesAddForm";
import DuaCategoriesUpdateForm from "../pages/forms/DuaCategoriesUpdateForm";
import DuaUpdateForm from "../pages/forms/DuaUpdateForm";
import EventPrayersCategoriesForm from "../pages/forms/EventPrayersCategoriesForm";
import EventPrayersForm from "../pages/forms/EventPrayersForm";
import ForgetPasword from "../pages/forms/ForgotPassword";
import HadithCategoriesForm from "../pages/forms/HadithCategoriesForm";
import HadithCategoriesUpdateForm from "../pages/forms/HadithCategoriesUpdateForm";
import HadithForm from "../pages/forms/HadithForm";
import HadithSubCategoriesForm from "../pages/forms/HadithSubCategoriesForm";
import HadithUpdateForm from "../pages/forms/HadithUpdateForm";
import UserProfileForm from "../pages/forms/UserProfileForm";
import Hadith from "../pages/hadith/Hadith";
import HadithCategories from "../pages/hadithCategories/HadithCategories";
import HadithSubCategories from "../pages/hadithSubCategories/HadithSubCategories";
import Home from "../pages/home/Home";
import NotificationAdd from "../pages/notifications/NotificationAdd";
import Notifications from "../pages/notifications/Notifications";
import Profile from "../pages/profile/Profile";
import Users from "../pages/users/Users";
import Wallpapers from "../pages/wallpapers/Wallpapers";
import Zakat from "../pages/zakat/Zakat";
import PrivateRouter from "./PrivateRouter";
import MokkaLiveForm from "../pages/forms/MokkaLiveForm";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Layout></Layout>
      </PrivateRouter>
    ),
    children: [
      //pages
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/users",
        element: <Users></Users>,
      },
      {
        path: "/hadith",
        element: <Hadith></Hadith>,
      },

      {
        path: "/hadith-categories",
        element: <HadithCategories></HadithCategories>,
      },
      {
        path: "/hadith-subcategories",
        element: <HadithSubCategories></HadithSubCategories>,
      },
      {
        path: "/zakat",
        element: <Zakat></Zakat>,
      },
      // {
      //   path: "/dhikr",
      //   element: <Dhikr></Dhikr>,
      // },
      {
        path: "/dua",
        element: <Dua></Dua>,
      },
      {
        path: "/dua-categories",
        element: <DuaCategories></DuaCategories>,
      },
      {
        path: "/azkar",
        element: <Azkar></Azkar>,
      },
      {
        path: "/azkar-categories",
        element: <AzkarCategories></AzkarCategories>,
      },
      {
        path: "/event-prayers",
        element: <EventPrayers></EventPrayers>,
      },
      {
        path: "/event-prayers-categories",
        element: <EventPrayersCategories></EventPrayersCategories>,
      },
      {
        path: "/wallpapers",
        element: <Wallpapers></Wallpapers>,
      },

      {
        path: "/notifications",
        element: <Notifications></Notifications>,
      },
      // forms

      // hadith
      {
        path: "/hadith-add",
        element: <HadithForm></HadithForm>,
      },
      {
        path: "/hadith-edit",
        element: <HadithUpdateForm></HadithUpdateForm>,
      },
      {
        path: "/hadith-categories-add",
        element: <HadithCategoriesForm></HadithCategoriesForm>,
      },
      {
        path: "/hadith-categories-edit",
        element: <HadithCategoriesUpdateForm></HadithCategoriesUpdateForm>,
      },
      {
        path: "/hadith-subcategories-add",
        element: <HadithSubCategoriesForm></HadithSubCategoriesForm>,
      },
      {
        path: "/hadith-subcategories-edit",
        element: <HadithSubCategoriesForm></HadithSubCategoriesForm>,
      },
      //dua
      {
        path: "/dua-add",
        element: <DuaAddForm></DuaAddForm>,
      },
      {
        path: "/dua-edit",
        element: <DuaUpdateForm></DuaUpdateForm>,
      },
      {
        path: "/dua-categories-add",
        element: <DuaCategoriesAddForm></DuaCategoriesAddForm>,
      },
      {
        path: "/dua-categories-edit",
        element: <DuaCategoriesUpdateForm></DuaCategoriesUpdateForm>,
      },

      // dhikr
      // {
      //   path: "/dhikr-add",
      //   element: <DhikrForm></DhikrForm>,
      // },
      // {
      //   path: "/dhikr-edit",
      //   element: <DhikrForm></DhikrForm>,
      // },

      //azkar
      {
        path: "/azkar-add",
        element: <AzkarForm></AzkarForm>,
      },
      {
        path: "/azkar-edit",
        element: <AzkarUpdateForm></AzkarUpdateForm>,
      },
      {
        path: "/azkar-categories-add",
        element: <AzkarCategoriesForm></AzkarCategoriesForm>,
      },
      {
        path: "/azkar-categories-edit",
        element: <AzkarCategoriesUpdateForm></AzkarCategoriesUpdateForm>,
      },

      {
        path: "/event-prayers-add",
        element: <EventPrayersForm></EventPrayersForm>,
      },
      {
        path: "/mokka-life",
        element: <MokkaLiveForm></MokkaLiveForm>,
      },
      {
        path: "/event-prayers-edit",
        element: <EventPrayersForm></EventPrayersForm>,
      },
      {
        path: "/event-prayers-categories-add",
        element: <EventPrayersCategoriesForm></EventPrayersCategoriesForm>,
      },
      {
        path: "/event-prayers-categories-edit",
        element: <EventPrayersCategoriesForm></EventPrayersCategoriesForm>,
      },

      {
        path: "/user-edit",
        element: <UserProfileForm></UserProfileForm>,
      },
      {
        path: "/notification-add",
        element: <NotificationAdd></NotificationAdd>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: `/register/${import.meta.env.VITE_REGISTRATION_RANDOM_STRING}`,
    element: <Registration></Registration>,
  },
  {
    path: "/forgot_password",
    element: <ForgetPasword />,
  },
  {
    path: "/admin_reset",
    element: <AdminReset />,
  },
  {
    path: "*",
    element: (
      <h2 className="font-black py-6 text-3xl text-red-600 text-center">
        404 Page Not Found!
      </h2>
    ),
  },
]);
