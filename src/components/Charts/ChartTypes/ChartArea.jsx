import React, { useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartArea = ({ title, data }) => {
  // Memoize the chart component based on the data prop
  const memoizedChart = useMemo(() => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
          }}
        >
          {/* <defs>
              <linearGradient
                id="gradientColor"
                x1="250.907"
                y1="-60.8982"
                x2="255.512"
                y2="156.531"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3790FA" />
                <stop offset="1" stopColor="white" stopOpacity="0.25" />
              </linearGradient>
            </defs> */}
          <defs>
            <linearGradient
              id="gradientColor"
              x1="250.907"
              y1="-60.8982"
              x2="255.512"
              y2="156.531"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3790FA" />
              <stop offset="1" stopColor="white" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E8E8E8" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Current"
            fill="none"
            stroke="#F93A6E"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Previous"
            fill="url(#gradientColor)"
            stroke="#3790FA"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }, [data]);
  const [defaultText, setDefaultText] = useState("monthly");

  return (
    <div className="flex flex-col justify-between bg-white p-6 rounded-2xl ">
      <div className="flex items-center justify-between">
        <p className="text-base font-poppins font-semibold text-blackMediumEmp">
          {title}
        </p>
        {/* dropdown */}
        <div className="dropdown dropdown-end bg-backgroundPrimary py-[4px] px-3 rounded">
          <div tabIndex={0} role="button" className="w-full">
            <div className="flex justify-between items-center gap-1">
              <span className="font-poppins text-sm text-blackMediumEmp capitalize">
                {defaultText}
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.00001 11.2004C7.53335 11.2004 7.06668 11.0204 6.71335 10.6671L2.36668 6.32042C2.17335 6.12708 2.17335 5.80708 2.36668 5.61375C2.56001 5.42042 2.88001 5.42042 3.07335 5.61375L7.42001 9.96042C7.74001 10.2804 8.26001 10.2804 8.58001 9.96042L12.9267 5.61375C13.12 5.42042 13.44 5.42042 13.6333 5.61375C13.8267 5.80708 13.8267 6.12708 13.6333 6.32042L9.28668 10.6671C8.93335 11.0204 8.46668 11.2004 8.00001 11.2004Z"
                    fill="#5E6064"
                  />
                </svg>
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[500]  p-4  bg-base-100 rounded-box w-[157px] shadow-dropShadow"
          >
            <li
              onClick={() => setDefaultText("today")}
              className="py-3 px-4 text-base font-poppins border-b border-neutral-100 cursor-pointer text-center"
            >
              <span
                className={
                  defaultText == "today"
                    ? "text-blackMediumEmp"
                    : "text-whiteLowEmp"
                }
              >
                Today
              </span>
            </li>
            <li
              onClick={() => setDefaultText("week")}
              className="py-3 px-4 text-base font-poppins  border-b border-neutral-100 cursor-pointer text-center"
            >
              <span
                className={
                  defaultText == "week"
                    ? "text-blackMediumEmp"
                    : "text-whiteLowEmp"
                }
              >
                This Week
              </span>
            </li>
            <li
              onClick={() => setDefaultText("monthly")}
              className="py-3 px-4 text-base font-poppins  border-b border-neutral-100 cursor-pointer text-center"
            >
              <span
                className={
                  defaultText == "monthly"
                    ? "text-blackMediumEmp"
                    : "text-whiteLowEmp"
                }
              >
                This Month
              </span>
            </li>
            <li
              onClick={() => setDefaultText("yearly")}
              className="py-3 px-4 text-base font-poppins cursor-pointer text-center"
            >
              <span
                className={
                  defaultText == "yearly"
                    ? "text-blackMediumEmp"
                    : "text-whiteLowEmp"
                }
              >
                This Year
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-start gap-6 my-6 text-xs sm:text-base">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-infoHigh"></div>
          <p className="font-poppins text-sm text-blackMediumEmp">This Month</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-errorHigh"></div>
          <p className="font-poppins text-sm text-blackMediumEmp">Last Month</p>
        </div>
      </div>
      <section className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
        {memoizedChart}
      </section>
    </div>
  );
};

export default ChartArea;
