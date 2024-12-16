import { useState } from "react";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalRows,
}) => {
  const [isIncreament, setIsIncreament] = useState(true);
  const [isDecreament, setIsDecreament] = useState(false);
  const handleIncrement = () => {
    if (currentPage * rowsPerPage >= totalRows) {
      return;
    } else {
      setCurrentPage((prev) => prev + 1);
      setIsIncreament(true);
      setIsDecreament(false);
    }
  };

  const handleDecrement = () => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage((prev) => prev - 1);
      setIsIncreament(false);
      setIsDecreament(true);
    }
  };

  const handleItemsPerPage = (value) => {
    setCurrentPage(1);
    setRowsPerPage(value);
  };

  return (
    <section className="flex items-center justify-end gap-4 text-darkHigh w-full flex-nowrap whitespace-nowrap px-5 py-4 bg-white border-t border-slateLow">
      {/* <div>{renderPagination()}</div> */}

      <div className="flex items-center gap-2">
        <p className="font-normal text-sm font-poppins">Item per page :</p>
        <div className="dropdown dropdown-top dropdown-end">
          <label
            tabIndex={3}
            className="rounded-lg px-2 py-2 border border-neutralColorTwoHundread  cursor-pointer flex items-center"
          >
            {rowsPerPage} &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M14.9334 6.81689H9.7417H5.0667C4.2667 6.81689 3.8667 7.78356 4.43337 8.35023L8.75003 12.6669C9.4417 13.3586 10.5667 13.3586 11.2584 12.6669L12.9 11.0252L15.575 8.35023C16.1334 7.78356 15.7334 6.81689 14.9334 6.81689Z"
                fill="#9E9FA7"
              />
            </svg>
          </label>
          <ul
            tabIndex={3}
            className="dropdown-content menu p-1 mt-2 m-0.5 shadow bg-white rounded-md"
          >
            <li>
              <p onClick={() => handleItemsPerPage(10)} className="py-1">
                10
              </p>
            </li>
            <hr className="text-disabledColor opacity-10" />
            <li>
              <p onClick={() => handleItemsPerPage(25)} className="py-1">
                25
              </p>
            </li>
            <hr className="text-disabledColor opacity-10" />
            <li>
              <p onClick={() => handleItemsPerPage(50)} className="py-1">
                50
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="font-poppins text-sm text-blackMediumEmp">
          {currentPage} - {Math.min(rowsPerPage * currentPage, totalRows)} of{" "}
          {totalRows}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={handleDecrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 20.67C14.81 20.67 14.62 20.6 14.47 20.45L7.95003 13.93C6.89003 12.87 6.89003 11.13 7.95003 10.07L14.47 3.55002C14.76 3.26002 15.24 3.26002 15.53 3.55002C15.82 3.84002 15.82 4.32002 15.53 4.61002L9.01003 11.13C8.53003 11.61 8.53003 12.39 9.01003 12.87L15.53 19.39C15.82 19.68 15.82 20.16 15.53 20.45C15.38 20.59 15.19 20.67 15 20.67Z"
              className={`${
                isIncreament
                  ? "fill-[#C9C9CE]"
                  : "fill-[#2F2F2F]"
                  
              }`}
            />
          </svg>
        </button>
        <button type="button" onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.90998 20.67C8.71998 20.67 8.52998 20.6 8.37998 20.45C8.08998 20.16 8.08998 19.68 8.37998 19.39L14.9 12.87C15.38 12.39 15.38 11.61 14.9 11.13L8.37998 4.61002C8.08998 4.32002 8.08998 3.84002 8.37998 3.55002C8.66998 3.26002 9.14998 3.26002 9.43998 3.55002L15.96 10.07C16.47 10.58 16.76 11.27 16.76 12C16.76 12.73 16.48 13.42 15.96 13.93L9.43998 20.45C9.28998 20.59 9.09998 20.67 8.90998 20.67Z"
             
              className={`${
                isDecreament
                  ? "fill-[#C9C9CE]"
                  : "fill-[#2F2F2F] "
                  
              }`}
            />
          </svg>
        </button>
      </div>
    </section>
  );
};
