import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import SearchLoader from "../../components/loaders/SearchLoader";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllEventPrayers } from "../../features/eventPrayers/eventPrayersSlice";

import EventPrayersTable from "../../components/tables/eventPrayers/EventPrayersTable";

const EventPrayers = () => {
  const dispatch = useDispatch();

  const eventPrayers = useSelector((state) => state.eventPrayers);
  const eventPrayersData = eventPrayers?.alleventPrayers;

  useEffect(() => {
    if (eventPrayersData.length === 0) {
      dispatch(fetchAllEventPrayers());
    }
  }, []);

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
      return data?.eventPrayerEnglish
        ?.toLowerCase()
        .startsWith(searchValue.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;

  if (eventPrayers.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!eventPrayers.isLoading && eventPrayers.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (
    !eventPrayers.isLoading &&
    !eventPrayers.isError &&
    eventPrayersData?.length === 0
  ) {
    content = <NoData></NoData>;
  } else if (
    !eventPrayers.isLoading &&
    !eventPrayers.isError &&
    eventPrayersData?.length > 0
  ) {
    const newData = [...eventPrayersData]
      ?.sort(sortByTime)
      ?.filter(filterBySearch);
    content = <EventPrayersTable data={newData}></EventPrayersTable>;
  }
  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Event Prayers"
          path="/event-prayers-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>
        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
};

export default EventPrayers;
