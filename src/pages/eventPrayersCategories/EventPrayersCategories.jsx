import React, { useState } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllEventPrayersCategory } from "../../features/eventPrayersCategories/eventPrayersCategoriesSlice";
import EventPrayersCategoriesTable from "../../components/tables/eventPrayersCategoriesTable/EventPrayersCategoriesTable";

function eventPrayersCategories() {
  const dispatch = useDispatch();

  const eventPrayersCategories = useSelector(
    (state) => state.eventPrayersCategories
  );
  const categoriesData = eventPrayersCategories?.allCategory;

  useEffect(() => {
    if (categoriesData.length === 0) {
      dispatch(fetchAllEventPrayersCategory());
    }
  }, [dispatch]);
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
      return data?.categoryEnglish
        ?.toLowerCase()
        .startsWith(searchValue.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;
  if (eventPrayersCategories.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (
    !eventPrayersCategories?.isLoading &&
    eventPrayersCategories?.isError
  ) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (
    !eventPrayersCategories?.isLoading &&
    !eventPrayersCategories?.isError &&
    categoriesData?.length === 0
  ) {
    content = <NoData></NoData>;
  } else if (
    !eventPrayersCategories.isLoading &&
    !eventPrayersCategories.isError &&
    categoriesData?.length > 0
  ) {
    const newData = [...categoriesData]
      ?.sort(sortByTime)
      ?.filter(filterBySearch);
    content = (
      <EventPrayersCategoriesTable data={newData}></EventPrayersCategoriesTable>
    );
  }

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Event Prayers Categories"
          path="/event-prayers-categories-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>

        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
}

export default eventPrayersCategories;
