import React from "react";

function Card({ data }) {
  const { background, svgBg, number, title, svg, borderColor, type } =
    data || {};
  return (
    <div
      className={`p-6 ${background} border ${borderColor} rounded-2xl w-full`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${svgBg}`}
      >
        {svg}
      </div>
      <div className="mt-6">
        <p className="text-2xl font-semibold text-blackMediumEmp font-poppins">
          {type == "numbers" ? "$" : ""}
          {number}
          {type == "users" ? "" : ""}
        </p>
        <p className="font-poppins font-medium text-blackSemi">{title}</p>
      </div>
    </div>
  );
}

export default Card;
