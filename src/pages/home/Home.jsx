import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Charts from "../../components/Charts/Charts";
import Card from "../../components/shared/cards/Card";
import { fetchUserChartData } from "../../features/chart/chartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state?.chartData?.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchUserChartData());
  }, [dispatch]);

  useEffect(() => {
    setData([
      {
        id: 1,
        title: "Registered Users",
        number: chartData?.totalUser || 0,
        background: "bg-secondaryColor",
        svgBg: "bg-errorHigh",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z"
              fill="white"
            />
            <path
              d="M5.6 8.38H4C3.45 8.38 3 8.83 3 9.38V18C3 18.55 3.45 19 4 19H5.6C6.15 19 6.6 18.55 6.6 18V9.38C6.6 8.82 6.15 8.38 5.6 8.38Z"
              fill="white"
            />
            <path
              d="M12.8002 5.18994H11.2002C10.6502 5.18994 10.2002 5.63994 10.2002 6.18994V17.9999C10.2002 18.5499 10.6502 18.9999 11.2002 18.9999H12.8002C13.3502 18.9999 13.8002 18.5499 13.8002 17.9999V6.18994C13.8002 5.63994 13.3502 5.18994 12.8002 5.18994Z"
              fill="white"
            />
            <path
              d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z"
              fill="white"
            />
          </svg>
        ),
        borderColor: "border-[#F93A6E]",
        type: "users",
      },
      {
        id: 2,
        title: "Total Donars",
        number: chartData?.totalDonar || 0,
        background: "bg-orangeLight",
        svgBg: "bg-orangeColor",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 3H6C3.79 3 2 4.78 2 6.97V17.03C2 19.22 3.79 21 6 21H18C20.21 21 22 19.22 22 17.03V6.97C22 4.78 20.21 3 18 3ZM8.5 7.17C9.77 7.17 10.81 8.21 10.81 9.48C10.81 10.75 9.77 11.79 8.5 11.79C7.23 11.79 6.19 10.75 6.19 9.48C6.19 8.21 7.23 7.17 8.5 7.17ZM12.37 16.66C12.28 16.76 12.14 16.82 12 16.82H5C4.86 16.82 4.72 16.76 4.63 16.66C4.54 16.56 4.49 16.42 4.5 16.28C4.67 14.6 6.01 13.27 7.69 13.11C8.22 13.06 8.77 13.06 9.3 13.11C10.98 13.27 12.33 14.6 12.49 16.28C12.51 16.42 12.46 16.56 12.37 16.66ZM19 16.75H17C16.59 16.75 16.25 16.41 16.25 16C16.25 15.59 16.59 15.25 17 15.25H19C19.41 15.25 19.75 15.59 19.75 16C19.75 16.41 19.41 16.75 19 16.75ZM19 12.75H15C14.59 12.75 14.25 12.41 14.25 12C14.25 11.59 14.59 11.25 15 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75ZM19 8.75H14C13.59 8.75 13.25 8.41 13.25 8C13.25 7.59 13.59 7.25 14 7.25H19C19.41 7.25 19.75 7.59 19.75 8C19.75 8.41 19.41 8.75 19 8.75Z"
              fill="white"
            />
          </svg>
        ),
        borderColor: "border-[#FF8155]",
        type: "text",
      },
      {
        id: 3,
        title: "Total Donation",
        number: chartData?.totalDonation || 0,
        background: "bg-infoLight",
        svgBg: "bg-infoHigh",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM7.63 18.15C7.63 18.56 7.29 18.9 6.88 18.9C6.47 18.9 6.13 18.56 6.13 18.15V16.08C6.13 15.67 6.47 15.33 6.88 15.33C7.29 15.33 7.63 15.67 7.63 16.08V18.15ZM12.75 18.15C12.75 18.56 12.41 18.9 12 18.9C11.59 18.9 11.25 18.56 11.25 18.15V14C11.25 13.59 11.59 13.25 12 13.25C12.41 13.25 12.75 13.59 12.75 14V18.15ZM17.87 18.15C17.87 18.56 17.53 18.9 17.12 18.9C16.71 18.9 16.37 18.56 16.37 18.15V11.93C16.37 11.52 16.71 11.18 17.12 11.18C17.53 11.18 17.87 11.52 17.87 11.93V18.15ZM17.87 8.77C17.87 9.18 17.53 9.52 17.12 9.52C16.71 9.52 16.37 9.18 16.37 8.77V7.8C13.82 10.42 10.63 12.27 7.06 13.16C7 13.18 6.94 13.18 6.88 13.18C6.54 13.18 6.24 12.95 6.15 12.61C6.05 12.21 6.29 11.8 6.7 11.7C10.07 10.86 13.07 9.09 15.45 6.59H14.2C13.79 6.59 13.45 6.25 13.45 5.84C13.45 5.43 13.79 5.09 14.2 5.09H17.13C17.17 5.09 17.2 5.11 17.24 5.11C17.29 5.12 17.34 5.12 17.39 5.14C17.44 5.16 17.48 5.19 17.53 5.22C17.56 5.24 17.59 5.25 17.62 5.27C17.63 5.28 17.63 5.29 17.64 5.29C17.68 5.33 17.71 5.37 17.74 5.41C17.77 5.45 17.8 5.48 17.81 5.52C17.83 5.56 17.83 5.6 17.84 5.65C17.85 5.7 17.87 5.75 17.87 5.81C17.87 5.82 17.88 5.83 17.88 5.84V8.77H17.87Z"
              fill="white"
            />
          </svg>
        ),
        borderColor: "border-[#3790FA]",
        type: "numbers",
      },
      {
        id: 4,
        title: "Wallpapers",
        number: chartData?.totalWallpaper || 0,
        background: "bg-successLight",
        svgBg: "bg-successColor",
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.6702 6.95003C21.0302 4.78003 19.2202 2.97003 17.0502 2.33003C15.4002 1.85003 14.2602 1.89003 13.4702 2.48003C12.5202 3.19003 12.4102 4.47003 12.4102 5.38003V7.87003C12.4102 10.33 13.5302 11.58 15.7302 11.58H18.6002C19.5002 11.58 20.7902 11.47 21.5002 10.52C22.1102 9.74003 22.1602 8.60003 21.6702 6.95003Z"
              fill="white"
            />
            <path
              d="M18.9104 13.36C18.6504 13.06 18.2704 12.89 17.8804 12.89H14.3004C12.5404 12.89 11.1104 11.46 11.1104 9.70003V6.12003C11.1104 5.73003 10.9404 5.35003 10.6404 5.09003C10.3504 4.83003 9.95039 4.71003 9.57039 4.76003C7.22039 5.06003 5.06039 6.35003 3.65039 8.29003C2.23039 10.24 1.71039 12.62 2.16039 15C2.81039 18.44 5.56039 21.19 9.01039 21.84C9.56039 21.95 10.1104 22 10.6604 22C12.4704 22 14.2204 21.44 15.7104 20.35C17.6504 18.94 18.9404 16.78 19.2404 14.43C19.2904 14.04 19.1704 13.65 18.9104 13.36Z"
              fill="white"
            />
          </svg>
        ),
        borderColor: "border-[#7FC767]",
        type: "wallpapers",
      },
    ]);
  }, [
    chartData?.totalDonar,
    chartData?.totalDonation,
    chartData?.totalUser,
    chartData?.totalWallpaper,
  ]);

  return (
    <section className="h-full relative overflow-auto p-6 ">
      <div className="flex flex-col gap-8">
        {/* cards  */}
        <div className="w-full bg-white p-6 rounded-2xl">
          {/* title  */}
          <div>
            <h4 className="text-[20px] text-blackMediumEmp font-bold font-poppins">
              Dashboard
            </h4>
            <p className="mt-2 text-base font-normal font-poppins">
              All the overview is here
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-8 mt-12">
              {/* card one  */}
              {data?.map((item, i) => (
                <Card data={item} key={i}></Card>
              ))}
            </div>
          </div>

          {/* charts  */}
        </div>

        <div>
          <Charts data={chartData}></Charts>
        </div>
      </div>
    </section>
  );
}
