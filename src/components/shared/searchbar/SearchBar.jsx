import React from "react";
import { Link } from "react-router-dom";
import AddSvg from "../../Svg/AddSvg";

function SearchBar({
  title,
  value,
  onChange,
  path,
  isNotAddable,
  children,
  isWallpaperSearchBar,
  modalId,
}) {
  return (
    <div className="bg-maincolor px-3 py-4 sm:p-4 flex items-center justify-between rounded-t-2xl">
      <div className="flex items-center gap-8">
        <h4 className=" text-white text-lg sm:text-xl font-bold">{title}</h4>
        {children}
      </div>
      <div
        className={`flex items-center justify-end ${
          isNotAddable ? "" : "gap-2 md:gap-6"
        } `}
      >
        <div className="flex gap-6 items-center">
          <div className="relative">
            <label
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2"
              htmlFor="search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                  fill="#9E9FA7"
                />
                <path
                  d="M21.9999 22.7499C21.8099 22.7499 21.6199 22.6799 21.4699 22.5299L19.4699 20.5299C19.1799 20.2399 19.1799 19.7599 19.4699 19.4699C19.7599 19.1799 20.2399 19.1799 20.5299 19.4699L22.5299 21.4699C22.8199 21.7599 22.8199 22.2399 22.5299 22.5299C22.3799 22.6799 22.1899 22.7499 21.9999 22.7499Z"
                  fill="#9E9FA7"
                />
              </svg>
            </label>
            <input
              id="search"
              value={value}
              onChange={onChange}
              className="pl-10 sm:pl-11 p-3 h-[46px] w-[160px] sm:w-[320px] text-xs sm:text-sm md:text-base text-blackLow rounded-lg border-none focus:outline-none bg-white font-poppins"
              type="text"
              name="searchInput"
              placeholder="Search"
            />
          </div>
          <div>
            {!isNotAddable && (
              <Link to={path} className="cursor-pointer">
                <AddSvg />
              </Link>
            )}
            {isWallpaperSearchBar && (
              <label className="cursor-pointer" htmlFor={modalId}>
                <AddSvg />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
