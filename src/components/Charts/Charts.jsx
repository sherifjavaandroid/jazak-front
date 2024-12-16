import React from "react";
import ChartArea from "./ChartTypes/ChartArea";
import ChartLine from "./ChartTypes/ChartLine";
const Charts = ({ data }) => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 items-stretch justify-around gap-6">
      <div className="bg-whiteHigh rounded-xl">
        <ChartArea data={data?.userChart} title="User Growth"></ChartArea>
      </div>
      <div className="bg-whiteHigh rounded-xl flex-1">
        <ChartLine data={data?.wallpaperChart} title="Wallpapers"></ChartLine>
      </div>
    </section>
  );
};

export default Charts;
