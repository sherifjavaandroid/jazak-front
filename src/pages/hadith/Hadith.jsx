import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import HadithTable from "../../components/tables/hadith/HadithTable";
import { fetchAllHadith } from "../../features/hadith/hadithSlice";

// ... (imports)

const Hadith = () => {
  const dispatch = useDispatch();
  const hadith = useSelector((state) => state.hadith);
  const hadithData = hadith.allHadith;

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // Fetch data on initial component mount
    dispatch(fetchAllHadith());
  }, [dispatch]);

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    // If the component is unmounted, do not dispatch the fetchAllHadith action
    let isMounted = true;

    // Fetch data when the component is mounted and searchValue changes
    if (isMounted && hadith.isLoading) {
      dispatch(fetchAllHadith());
    }

    return () => {
      // Set the component as unmounted when it unmounts
      isMounted = false;
    };
  }, [dispatch, hadith.isLoading]);

  const fetchDataAfterAction = () => {
    dispatch(fetchAllHadith());
  };

  const sortByTime = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.hadithArabic
        ?.toLowerCase()
        .startsWith(searchValue.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;

  if (hadith.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!hadith.isLoading && hadith.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!hadith.isLoading && !hadith.isError && hadithData?.length === 0) {
    content = <NoData></NoData>;
  } else if (!hadith.isLoading && !hadith.isError && hadithData?.length > 0) {
    const newData = [...hadithData]?.sort(sortByTime)?.filter(filterBySearch);
    content = <HadithTable data={newData}></HadithTable>;
  }

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Hadith"
          path="/hadith-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>

        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
};

export default Hadith;
