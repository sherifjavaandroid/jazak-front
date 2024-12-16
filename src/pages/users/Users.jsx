import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import UserTable from "../../components/tables/users/UsersTable";
import { getAllUsers } from "../../features/users/usersSlice";
function Users() {
  const dispatch = useDispatch();

  const [isAscending, setIsAscending] = useState(false);
  const users = useSelector((state) => state.users);
  const usersData = users?.allUsers || [];

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const sortByTime = (a, b) => {
    if (isAscending) {
      return a.timestamp - b.timestamp;
    } else {
      return b.timestamp - a.timestamp;
    }
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.fullName?.toLowerCase().includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  let content = null;

  if (users.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!users.isLoading && users.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!users.isLoading && !users.isError && usersData?.length === 0) {
    content = <NoData></NoData>;
  } else if (!users.isLoading && !users.isError && usersData?.length > 0) {
    const newData = [...usersData]?.sort(sortByTime)?.filter(filterBySearch);
    content = (
      <UserTable data={newData} setIsAscending={setIsAscending}></UserTable>
    );
  }

  return (
    <section className="h-full w-full px-8 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Users"
          path=""
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
        ></SearchBar>

        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
}

export default Users;
