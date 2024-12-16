import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import NotificationTable from "../../components/tables/notification/NotificationTable";
import { fetchAllNotifications } from "../../features/notifications/notificationsSlice";
import NotifyContainer from "../../util/getNotify";
function Notifications() {
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notifications);
  const notificationsData = notifications?.allNotifications;
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const sortByTime = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.notificationTitle
        ?.toLowerCase()
        .includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  let content = null;

  if (notifications?.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!notifications?.isLoading && notifications?.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (
    !notifications?.isLoading &&
    !notifications?.isError &&
    notificationsData?.length === 0
  ) {
    content = <NoData></NoData>;
  } else if (
    !notifications?.isLoading &&
    !notifications?.isError &&
    notificationsData?.length > 0
  ) {
    const newData = [...notificationsData]
      ?.sort(sortByTime)
      ?.filter(filterBySearch);
    content = <NotificationTable data={newData}></NotificationTable>;
  }

  useEffect(() => {
    if (notificationsData?.length === 0) {
      dispatch(fetchAllNotifications());
    }
  }, [dispatch, notificationsData?.length]);

  return (
    <section className="h-full w-full px-4 md:px-6 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Notifications History"
          path="/notification-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>

        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
      <NotifyContainer></NotifyContainer>
    </section>
  );
}

export default Notifications;
