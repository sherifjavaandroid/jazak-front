import React from "react";

const ViewModal = ({ url }) => {
  return (
    <section>
      <input type="checkbox" id="viewPopup" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-[550px] gap-6 p-0 bg-transparent shadow-none">
          <div className="text-end mb-4">
            <label
              htmlFor="viewPopup"
              className="inline-flex items-center justify-center w-8 h-8 bg-errorColor rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.2431 7.75738L7.75781 16.2427M16.2431 16.2426L7.75781 7.75732"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          </div>
          <div>
            <img src={url} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewModal;
