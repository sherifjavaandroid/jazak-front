import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import HadithCategoriesTable from "../../components/tables/hadithCategories/HadithCategoriesTable";
import { fetchAllHadithCategory } from "../../features/hadithCategories/hadithCategoriesSlice";

function HadithCategories() {
  const dispatch = useDispatch();

  const hadithCategories = useSelector((state) => state.hadithCategories);
  const categoriesData = hadithCategories?.allHadithCategory;

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchAllHadithCategory());
  }, []);

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
  if (hadithCategories.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!hadithCategories?.isLoading && hadithCategories?.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (
    !hadithCategories?.isLoading &&
    !hadithCategories?.isError &&
    categoriesData?.length === 0
  ) {
    content = <NoData></NoData>;
  } else if (
    !hadithCategories.isLoading &&
    !hadithCategories.isError &&
    categoriesData?.length > 0
  ) {
    const newData = [...categoriesData]
      ?.sort(sortByTime)
      ?.filter(filterBySearch);
    content = <HadithCategoriesTable data={newData}></HadithCategoriesTable>;
  }

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Hadith Categories"
          path="/hadith-categories-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>

        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
}

export default HadithCategories;
