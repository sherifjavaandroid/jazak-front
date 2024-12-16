import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../modals/ConfirmationModal";
import ViewModal from "../../modals/ViewModal";
import { Pagination } from "../../shared/pagination/Pagination";
import NoData from "../../shared/ui/NoData";

function WallpapersTable({ data }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const [selectedImage, setSelectedImage] = useState(null);

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
              <th className="bg-themeSemi text-base normal-case">Sl.</th>
              <th className="bg-themeSemi text-base normal-case p-2">Image</th>
              <th className="bg-themeSemi text-base normal-case">User Name</th>
              <th className="bg-themeSemi text-base normal-case">Email</th>
              <th className="bg-themeSemi text-base normal-case">Category</th>
              <th className="bg-themeSemi text-base normal-case">Downloaded</th>
              <th className="bg-themeSemi text-base normal-case">Date</th>
              <th className="bg-themeSemi text-base normal-case text-center">
                Actions
              </th>
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
              {currentRows?.map((wallpaper, i) => (
                <tr className=" bg-white text-blackSemi" key={i}>
                  <td className="py-3">
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">
                    <img
                      src={wallpaper?.fileUrl}
                      className="w-8 h-8 rounded-full mx-auto"
                      alt=""
                    />
                  </td>
                  <td className="py-3">{wallpaper?.name}</td>
                  <td className="py-3">{wallpaper?.email}</td>
                  <td className="py-3">{wallpaper?.category}</td>
                  <td className="py-3">{wallpaper?.downloaded}</td>
                  <td className="py-3">
                    {new Date(wallpaper?.timestamp * 1000).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  <td className="py-3 flex items-center justify-center gap-4">
                    <label
                      htmlFor="viewPopup"
                      className="cursor-pointer"
                      onClick={() => setSelectedImage(wallpaper?.fileUrl)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.8283 9.4186L20.8282 9.41843C18.5878 5.89788 15.3515 3.92999 12 3.92999C10.3204 3.92999 8.68041 4.42003 7.17256 5.34551C5.66421 6.2813 4.29615 7.65444 3.17172 9.4186H20.8283ZM20.8283 9.4186C21.2661 10.1059 21.5 11.0397 21.5 11.9987C21.5 12.958 21.266 13.8885 20.8291 14.5702L20.8284 14.5713C19.7039 16.3355 18.3358 17.7087 16.8273 18.6445C15.3195 19.57 13.6796 20.06 12 20.06C8.64787 20.06 5.41201 18.1015 3.17217 14.5721L3.17172 14.5714M20.8283 9.4186L3.17172 14.5714M3.17172 14.5714C2.7338 13.8838 2.5 12.9525 2.5 11.995M3.17172 14.5714L2.5 11.995M2.5 11.995C2.5 11.0375 2.73377 10.1063 3.17164 9.41873L2.5 11.995ZM7.46 12C7.46 14.5053 9.48305 16.54 12 16.54C14.5169 16.54 16.54 14.5053 16.54 12C16.54 9.49466 14.5169 7.45999 12 7.45999C9.48305 7.45999 7.46 9.49466 7.46 12Z"
                          fill="#54A0FF"
                          stroke="#54A0FF"
                        />
                        <path
                          d="M9.65039 12C9.65039 10.695 10.7077 9.64001 12.0004 9.64001C13.2942 9.64001 14.3604 10.7062 14.3604 12C14.3604 13.2916 13.2965 14.35 12.0004 14.35C10.7065 14.35 9.65039 13.2939 9.65039 12Z"
                          stroke="#54A0FF"
                        />
                      </svg>
                    </label>

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
                  </td>
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
        <ConfirmationModal title="wallpaper"></ConfirmationModal>
        <ViewModal url={selectedImage}></ViewModal>
      </div>
    </div>
  );
}

export default WallpapersTable;
