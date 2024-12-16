import React from "react";

function RequestLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-overlay flex items-center justify-center z-[999]">
      <div className="w-20 h-20 rounded-md flex items-center justify-center bg-whiteHigh">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primaryMainDarkest border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </div>
    </div>
  );
}

export default RequestLoader;
