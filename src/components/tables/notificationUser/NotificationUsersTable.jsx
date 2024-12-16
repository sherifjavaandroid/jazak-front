import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { Pagination } from "../../shared/pagination/Pagination";
import NoData from "../../shared/ui/NoData";
import { profileDummy } from "../../../assets/getAssets";

function NotificationUsersTable({
  data,
  handleSelectAllCheckbox,
  handleSelectCheckbox,
  selectedItems,
  selectedUser,
}) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  const handleNavigate = (item) => {
    navigate("/customer-edit", {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className=" overflow-x-auto">
        <table className="table w-full table-pin-rows table-pin-cols">
          <thead className=" p-0">
            <tr className="font-bold  text-3xl text-blackHigh">
              <th className="bg-themeSemi text-base normal-case flex items-center gap-2 py-5">
                <span>Sl.</span>
              </th>
              <th className="bg-themeSemi text-base normal-case py-5">Image</th>
              <th className="bg-themeSemi text-base normal-case py-5">Name</th>
              <th className="bg-themeSemi text-base normal-case py-5">Email</th>
              <th className="bg-themeSemi text-base normal-case py-5">
                Gender
              </th>
              <th className="bg-themeSemi text-base normal-case py-5">Date</th>
              {/* <th className="bg-themeSemi text-base normal-case py-5 text-center">
                Actions
              </th> */}
            </tr>
          </thead>
          {currentRows?.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="10" className="">
                  <NoData></NoData>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="">
              {currentRows?.map((user, i) => (
                <tr className=" bg-white text-blackSemi" key={i}>
                  <td className="py-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-error rounded border-blackSemi hover:border-blackSemi checked:hover:border-errorColor"
                      // checked={selectedItems?.includes(user?._id) ? true : false}
                      checked={selectedItems?.includes(user) ? true : false}
                      onChange={(e) => handleSelectCheckbox(user, e)}
                      disabled={selectedUser === "all" ? true : false}
                    />
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">
                    <img
                      src={user?.fileUrl?.thumbnailUrl || profileDummy}
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />
                  </td>

                  <td className="py-3">{user?.fullName}</td>
                  <td className="py-3">{user?.email}</td>
                  <td className="py-3">{user?.gender}</td>
                  <td className="py-3">
                    {new Date(user?.timestamp * 1000).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  {/* <td className="py-3 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleNavigate(customer)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2599 3.59924L5.04985 12.2892C4.73985 12.6192 4.43985 13.2692 4.37985 13.7192L4.00985 16.9592C3.87985 18.1292 4.71985 18.9292 5.87985 18.7292L9.09985 18.1792C9.54985 18.0992 10.1799 17.7692 10.4899 17.4292L18.6999 8.73924C20.1199 7.23924 20.7598 5.52924 18.5499 3.43924C16.3499 1.36924 14.6799 2.09924 13.2599 3.59924Z"
                          fill="#FF9F43"
                          stroke="#FF9F43"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.8901 5.05078C12.3201 7.81078 14.5601 9.92078 17.3401 10.2008L11.8901 5.05078Z"
                          fill="#FF9F43"
                        />
                        <path
                          d="M11.8901 5.05078C12.3201 7.81078 14.5601 9.92078 17.3401 10.2008"
                          stroke="#FF9F43"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 22H21"
                          stroke="#FF9F43"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <label
                      htmlFor="confirmationPopup"
                      className="cursor-pointer"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.49 7.80863V7.81V16.19C21.49 17.9106 20.9791 19.2238 20.0964 20.1064C19.2138 20.9891 17.9006 21.5 16.18 21.5H7.81C6.08945 21.5 4.77634 20.9891 3.89377 20.1054C3.01114 19.2217 2.5 17.9059 2.5 16.18V7.81C2.5 6.08944 3.01093 4.77618 3.89355 3.89355C4.77618 3.01093 6.08944 2.5 7.81 2.5H16.19C17.9107 2.5 19.2237 3.01097 20.105 3.89333C20.9861 4.77559 21.4947 6.08838 21.49 7.80863ZM15.7136 15.7136C16.1988 15.2283 16.1988 14.4317 15.7136 13.9464L13.7671 12L15.7136 10.0536C16.1988 9.56829 16.1988 8.77171 15.7136 8.28645C15.2283 7.80118 14.4317 7.80118 13.9464 8.28645L12 10.2329L10.0536 8.28645C9.56829 7.80118 8.77171 7.80118 8.28645 8.28645C7.80118 8.77171 7.80118 9.56829 8.28645 10.0536L10.2329 12L8.28645 13.9464C7.80118 14.4317 7.80118 15.2283 8.28645 15.7136C8.53516 15.9623 8.85455 16.08 9.17 16.08C9.48545 16.08 9.80484 15.9623 10.0536 15.7136L12 13.7671L13.9464 15.7136C14.1952 15.9623 14.5145 16.08 14.83 16.08C15.1455 16.08 15.4648 15.9623 15.7136 15.7136Z"
                          fill="#FF6B6B"
                          stroke="#FF6B6B"
                        />
                      </svg>
                    </label>
                  </td> */}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={data?.length}
        ></Pagination>
        <ConfirmationModal title="user"></ConfirmationModal>
      </div>
    </div>
  );
}

export default NotificationUsersTable;
