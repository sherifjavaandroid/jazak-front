import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import HadithSubCategoriesTable from "../../components/tables/hadithSubCategories/HadithSubCategoriesTable";
import { fetchAllSubCategory } from "../../features/hadithSubCategories/hadithSubCategoriesSlice";

function HadithSubCategories() {
  const dispatch = useDispatch();

  const hadithSubCategories = useSelector((state) => state.hadithSubCategories);
  const subCategoriesData = hadithSubCategories?.allHadithSubCategory;
  useEffect(() => {
    dispatch(fetchAllSubCategory());
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
      return data?.subCategoryEnglish
        ?.toLowerCase()
        .startsWith(searchValue.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;
  if (hadithSubCategories.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!hadithSubCategories?.isLoading && hadithSubCategories?.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (
    !hadithSubCategories?.isLoading &&
    !hadithSubCategories?.isError &&
    subCategoriesData?.length === 0
  ) {
    content = <NoData></NoData>;
  } else if (
    !hadithSubCategories.isLoading &&
    !hadithSubCategories.isError &&
    subCategoriesData?.length > 0
  ) {
    const newData = [...subCategoriesData]
      ?.sort(sortByTime)
      ?.filter(filterBySearch);
    content = (
      <HadithSubCategoriesTable data={newData}></HadithSubCategoriesTable>
    );
  }

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Hadith Sub Categories"
          path="/hadith-subcategories-add"
          value={searchValue}
          onChange={onChange}
        ></SearchBar>

        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
}

export default HadithSubCategories;
