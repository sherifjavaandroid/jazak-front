/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import NotificationUsersTable from "../../components/tables/notificationUser/NotificationUsersTable";
import { getAllUsers } from "../../features/users/usersSlice";
import NotificationForm from "../forms/NotificationForm";

function NotificationAdd() {
  const [selectedUser, setSelectedUser] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.users);
  const usersData = users?.allUsers;
  useEffect(() => {
    if (usersData.length > 0) {
      setSelectedItems(usersData.map((user) => user));
    }
  }, [usersData]);
  const handleChange = (value) => {
    setSelectedUser(value);
  };

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
      return data?.fullName?.toLowerCase().includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  const handleSelectAllCheckbox = (items, e) => {
    const selectedItemList = [];
    if (e?.target?.checked) {
      items?.map((item) => {
        return selectedItemList?.push(item);
      });
    } else {
      setSelectedItems([]);
    }
    setSelectedItems(selectedItemList);
  };

  const handleAllCheckbox = (items) => {
    const selectedItemList = items?.map((item) => item);
    setSelectedItems(selectedItemList);
  };

  const handleSelectCheckbox = (item, e) => {
    const selectedItemList = [...selectedItems];
    if (e?.target?.checked) {
      selectedItemList?.push(item);
    } else {
      const index = selectedItemList?.indexOf(item);
      if (index !== -1) {
        selectedItemList?.splice(index, 1);
      }
    }
    setSelectedItems(selectedItemList);
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
      <NotificationUsersTable
        data={newData}
        handleSelectAllCheckbox={handleSelectAllCheckbox}
        handleSelectCheckbox={handleSelectCheckbox}
        selectedItems={selectedItems}
        selectedUser={selectedUser}
      ></NotificationUsersTable>
    );
  }

  useEffect(() => {
    if (selectedUser === "all") {
      handleAllCheckbox(usersData);
    } else {
      setSelectedItems([]);
    }
  }, [selectedUser]);

  return (
    <section className="px-8 py-6 h-full overflow-auto">
      <BackToPrev path="/notifications" title="Back"></BackToPrev>

      <div className="bg-white p-6 rounded-2xl">
        <div>
          <h4 className="text-xl font-poppins font-bold text-blackMediumEmp">
            Send Notification
          </h4>
        </div>
        <div className="mt-6">
          <NotificationForm
            selectedUser={selectedUser}
            handleChange={handleChange}
            selectedItems={selectedItems}
          ></NotificationForm>
        </div>
      </div>
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden mt-6">
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

export default NotificationAdd;
