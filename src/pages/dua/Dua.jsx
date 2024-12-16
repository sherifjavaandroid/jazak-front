import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import SearchLoader from "../../components/loaders/SearchLoader";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DuaTable from "../../components/tables/dua/DuaTable";
import { fetchAllDuas } from "../../features/dua/duaSlice";

const Dua = () => {
  const dispatch = useDispatch();
  const dua = useSelector((state) => state.dua);
  const duaData = dua?.allDua;

  useEffect(() => {
    if (duaData?.length === 0) {
      dispatch(fetchAllDuas());
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
      return data?.duaArabic
        ?.toLowerCase()
        .startsWith(searchValue.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;

  if (dua.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!dua.isLoading && dua.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!dua.isLoading && !dua.isError && duaData?.length === 0) {
    content = <NoData></NoData>;
  } else if (!dua.isLoading && !dua.isError && duaData?.length > 0) {
    const newData = [...duaData]?.sort(sortByTime)?.filter(filterBySearch);
    content = <DuaTable data={newData}></DuaTable>;
  }

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Dua"
          path="/dua-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>
        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
};

export default Dua;
