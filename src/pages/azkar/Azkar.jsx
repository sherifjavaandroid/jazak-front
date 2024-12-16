import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import AzkarTable from "../../components/tables/azkar/AzkarTable";
import { fetchAllAzkars } from "../../features/azkar/azkarSlice";

const Azkar = () => {
  const dispatch = useDispatch();

  const azkar = useSelector((state) => state.azkar);
  const azkarData = azkar?.allAzkar;
  useEffect(() => {
    dispatch(fetchAllAzkars());
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
      return data?.azkarEnglish
        ?.toLowerCase()
        .startsWith(searchValue?.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;

  if (azkar.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!azkar.isLoading && azkar.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!azkar.isLoading && !azkar.isError && azkarData?.length === 0) {
    content = <NoData></NoData>;
  } else if (!azkar.isLoading && !azkar.isError && azkarData?.length > 0) {
    const newData = [...azkarData]?.sort(sortByTime)?.filter(filterBySearch);
    content = <AzkarTable data={newData}></AzkarTable>;
  }

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Azkar"
          path="/azkar-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>
        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
};

export default Azkar;
