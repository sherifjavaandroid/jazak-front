import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import AzkarCategoriesTable from "../../components/tables/azkarCategoriesTable/AzkarCategoriesTable";
import { fetchAllAzkarCategory } from "../../features/azkarCategories/AzkarCategoriesSlice";

const azkarCategories = () => {
  const dispatch = useDispatch();
  const azkarCategories = useSelector((state) => state.azkarCategories);
  const categoriesData = azkarCategories?.allCategory;

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
  if (azkarCategories.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!azkarCategories?.isLoading && azkarCategories?.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (
    !azkarCategories?.isLoading &&
    !azkarCategories?.isError &&
    categoriesData?.length === 0
  ) {
    content = <NoData></NoData>;
  } else if (
    !azkarCategories.isLoading &&
    !azkarCategories.isError &&
    categoriesData?.length > 0
  ) {
    const newData = [...categoriesData]
      ?.sort(sortByTime)
      ?.filter(filterBySearch);
    content = <AzkarCategoriesTable data={newData}></AzkarCategoriesTable>;
  }

  useEffect(() => {
    dispatch(fetchAllAzkarCategory());
  }, []);

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Azkar Categories"
          path="/azkar-categories-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>

        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
};

export default azkarCategories;
