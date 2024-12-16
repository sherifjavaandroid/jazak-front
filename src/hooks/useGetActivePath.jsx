import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActivePath } from "../features/nav/navSlice";

export default function useGetActivePath() {
  const dispatch = useDispatch();
  const activePath = useSelector((state) => state.nav);
  const location = useLocation();

  const handleLocalstore = (path) => {
    dispatch(setActivePath(path));
    localStorage.setItem("activePath", path);

  };
  useEffect(() => {
    
    const localPath = localStorage.getItem("activePath");
    if (localPath) {
      dispatch(setActivePath(localPath));
    }
  }, []);


  


  useEffect(() => {
    if (
      location?.pathname === "/category-add" ||
      location?.pathname === "/category-edit"
    ) {
      dispatch(setActivePath("categories"));
    } else if (location?.pathname === "/user-edit") {
      dispatch(setActivePath("users"));
    } else if (location?.pathname === "/featured-add") {
      dispatch(setActivePath("featured"));
    } else if (location?.pathname === "/notification-add") {
      dispatch(setActivePath("notification"));
    } else if (location?.pathname === "/profile") {
      dispatch(setActivePath(""));
    } else if (location?.pathname === "/") {
      dispatch(setActivePath("/"));
    }
  }, []);

  return { handleLocalstore, activePath };
}
