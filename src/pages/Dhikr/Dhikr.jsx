import React, { useEffect, useState } from "react";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import SearchLoader from "../../components/loaders/SearchLoader";
import { useSelector, useDispatch } from "react-redux";
import DhikrTable from "../../components/tables/dhikr/DhikrTable";
import { fetchAllDhikrs } from "../../features/dhikr/dhikrSlice";
import { ToastContainer } from "react-toastify";

const Dhikr = () => {
  const dispatch = useDispatch();

  const dhikr = useSelector((state) => state.dhikr);
  const dhikrData = dhikr?.allDhikr;

  useEffect(() => {
    if (dhikrData.length === 0) {
      dispatch(fetchAllDhikrs());
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
      return data?.dhikrEnglish
        ?.toLowerCase()
        .startsWith(searchValue?.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;

  if (dhikr.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!dhikr.isLoading && dhikr.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!dhikr.isLoading && !dhikr.isError && dhikrData?.length === 0) {
    content = <NoData></NoData>;
  } else if (!dhikr.isLoading && !dhikr.isError && dhikrData?.length > 0) {
    const newData = [...dhikrData]?.sort(sortByTime)?.filter(filterBySearch);
    content = <DhikrTable data={newData}></DhikrTable>;
  }

  return (
    <section className="h-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Dhikr"
          path="/dhikr-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>
        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
};

export default Dhikr;
