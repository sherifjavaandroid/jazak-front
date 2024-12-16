import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApproveModal from "../../modals/ApproveModal";
import ConfirmationModal from "../../modals/ConfirmationModal";
import ViewModal from "../../modals/ViewModal";
import { Pagination } from "../../shared/pagination/Pagination";
import NoData from "../../shared/ui/NoData";

function WallpaperRequestTable({ data }) {
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
      <div className="w-full h-[calc(100%-75px)] overflow-auto">
        <table className="table w-full">
          <thead className=" p-0">
            <tr className="font-bold  text-3xl text-blackHigh">
              <th className="bg-themeSemi text-base normal-case">Sl.</th>
              <th className="bg-themeSemi text-base normal-case p-2">Image</th>
              <th className="bg-themeSemi text-base normal-case">User Name</th>
              <th className="bg-themeSemi text-base normal-case">Email</th>
              <th className="bg-themeSemi text-base normal-case">Category</th>
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
              {currentRows?.map((request, i) => (
                <tr className=" bg-white text-blackSemi" key={i}>
                  <td className="py-3">
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">
                    <img
                      src={request?.fileUrl}
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="py-3">{request?.name}</td>
                  <td className="py-3">{request?.email}</td>
                  <td className="py-3">{request?.category}</td>
                  <td className="py-3">
                    {new Date(request?.timestamp * 1000).toLocaleDateString(
                      "en-US"
                    )}
                  </td>
                  <td className="py-3 flex items-center justify-center gap-4">
                    <label
                      htmlFor="viewPopup"
                      className="cursor-pointer"
                      onClick={() => setSelectedImage(request?.fileUrl)}
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
                    <label htmlFor="approvePopup" className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                      >
                        <path
                          opacity="0.4"
                          d="M-5.24537e-07 16L-2.09815e-06 4C-2.38784e-06 1.79086 1.79086 2.12557e-06 4 1.83588e-06L11 9.17939e-07L18 7L18 16C18 18.2091 16.2091 20 14 20L4 20C1.79086 20 -2.34843e-07 18.2091 -5.24537e-07 16Z"
                          fill="#2CC672"
                        />
                        <path
                          d="M11 3L11 -3.57352e-08L18 7L15 7C12.7909 7 11 5.20914 11 3Z"
                          fill="#2CC672"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.4939 9.43558C12.8056 9.70834 12.8372 10.1822 12.5645 10.4939L9.69455 13.7738C9.07786 14.4786 8.01561 14.5729 7.28433 13.9879L5.53151 12.5857C5.20806 12.3269 5.15562 11.8549 5.41438 11.5315C5.67313 11.208 6.1451 11.1556 6.46855 11.4144L8.22137 12.8166C8.32584 12.9002 8.47759 12.8867 8.56569 12.786L11.4356 9.50613C11.7084 9.1944 12.1822 9.16282 12.4939 9.43558Z"
                          fill="#2CC672"
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
        <ConfirmationModal title="wallpaper request"></ConfirmationModal>
        <ApproveModal></ApproveModal>
        <ViewModal url={selectedImage}></ViewModal>
      </div>
    </div>
  );
}

export default WallpaperRequestTable;
