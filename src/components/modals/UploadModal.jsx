import React from "react";
import { toast } from "react-toastify";
import { uploadIcon } from "../../assets/getAssets";
const UploadModal = ({
  handleStatus,
  modalClose,
  imagePreview,
  handleFileDelete,
  fileRef,
  file,
  handleWallPaperName,
  handleFileUpload,
  wallpaperName,
}) => {
  return (
    <section>
      <input type="checkbox" id="uploadPopUp" className="modal-toggle" />
      <div className="modal modal-middle ">
        <div className="modal-box w-8/12 max-w-5xl bg-white ">
          <div className="flex flex-col justify-center gap-6 px-4">
            <div className="w-full flex justify-end">
              <label
                htmlFor="uploadPopUp"
                className="cursor-pointer"
                data-hs-overlay={modalClose || ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="rounded-full"
                >
                  <path
                    d="M21.49 7.80863V7.81V16.19C21.49 17.9106 20.9791 19.2238 20.0964 20.1064C19.2138 20.9891 17.9006 21.5 16.18 21.5H7.81C6.08945 21.5 4.77634 20.9891 3.89377 20.1054C3.01114 19.2217 2.5 17.9059 2.5 16.18V7.81C2.5 6.08944 3.01093 4.77618 3.89355 3.89355C4.77618 3.01093 6.08944 2.5 7.81 2.5H16.19C17.9107 2.5 19.2237 3.01097 20.105 3.89333C20.9861 4.77559 21.4947 6.08838 21.49 7.80863ZM15.7136 15.7136C16.1988 15.2283 16.1988 14.4317 15.7136 13.9464L13.7671 12L15.7136 10.0536C16.1988 9.56829 16.1988 8.77171 15.7136 8.28645C15.2283 7.80118 14.4317 7.80118 13.9464 8.28645L12 10.2329L10.0536 8.28645C9.56829 7.80118 8.77171 7.80118 8.28645 8.28645C7.80118 8.77171 7.80118 9.56829 8.28645 10.0536L10.2329 12L8.28645 13.9464C7.80118 14.4317 7.80118 15.2283 8.28645 15.7136C8.53516 15.9623 8.85455 16.08 9.17 16.08C9.48545 16.08 9.80484 15.9623 10.0536 15.7136L12 13.7671L13.9464 15.7136C14.1952 15.9623 14.5145 16.08 14.83 16.08C15.1455 16.08 15.4648 15.9623 15.7136 15.7136Z"
                    fill="#FF6B6B"
                    stroke="#FF6B6B"
                  />
                </svg>
              </label>
            </div>
            <div className="w-full flex flex-col gap-1 text-blackHigh">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Artist Name
              </span>
              <input
                type="text"
                ref={fileRef}
                required
                className="p-4 border border-neutralColorTwoHundread rounded-lg outline-none"
                placeholder="Enter Artist Name"
                onChange={(e) => handleWallPaperName(e.target.value)}
              />
            </div>
            <div>
              {/* image preview */}
              {imagePreview ? (
                <div className="flex flex-col gap-1">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Image Preview
                  </span>
                  <div className="w-full mx-auto">
                    <div className=" text-whiteLowEmp font-poppins border border-neutralColorTwoHundread rounded-lg outline-noneflex p-2 items-start h-[340px] ">
                      <div className="flex items-start gap-2 w-full h-full">
                        <div className="flex flex-col items-start w-full h-full">
                          <img
                            src={imagePreview}
                            alt=""
                            className="h-full w-full rounded-sm bg-center object-contain"
                          />
                        </div>
                        {/* */}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-blackSemi text-base ml-4">
                        {file?.name?.length > 35
                          ? file?.name?.slice(0, 35) + "..."
                          : file?.name}
                      </p>
                      <button
                        className="flex items-center justify-center"
                        onClick={handleFileDelete}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21.49 7.80863V7.81V16.19C21.49 17.9106 20.9791 19.2238 20.0964 20.1064C19.2138 20.9891 17.9006 21.5 16.18 21.5H7.81C6.08945 21.5 4.77634 20.9891 3.89377 20.1054C3.01114 19.2217 2.5 17.9059 2.5 16.18V7.81C2.5 6.08944 3.01093 4.77618 3.89355 3.89355C4.77618 3.01093 6.08944 2.5 7.81 2.5H16.19C17.9107 2.5 19.2237 3.01097 20.105 3.89333C20.9861 4.77559 21.4947 6.08838 21.49 7.80863ZM15.7136 15.7136C16.1988 15.2283 16.1988 14.4317 15.7136 13.9464L13.7671 12L15.7136 10.0536C16.1988 9.56829 16.1988 8.77171 15.7136 8.28645C15.2283 7.80118 14.4317 7.80118 13.9464 8.28645L12 10.2329L10.0536 8.28645C9.56829 7.80118 8.77171 7.80118 8.28645 8.28645C7.80118 8.77171 7.80118 9.56829 8.28645 10.0536L10.2329 12L8.28645 13.9464C7.80118 14.4317 7.80118 15.2283 8.28645 15.7136C8.53516 15.9623 8.85455 16.08 9.17 16.08C9.48545 16.08 9.80484 15.9623 10.0536 15.7136L12 13.7671L13.9464 15.7136C14.1952 15.9623 14.5145 16.08 14.83 16.08C15.1455 16.08 15.4648 15.9623 15.7136 15.7136Z"
                            fill="#FF6B6B"
                            stroke="#FF6B6B"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="wallpaperImage"
                  className="w-full h-[250px] rounded-lg border border=slate-900 flex flex-col justify-center items-center gap-2 px-5 py-5 cursor-pointer"
                >
                  <div className="w-full ">
                    <img
                      src={uploadIcon}
                      alt=""
                      className="w-[100px] h-[80px] mx-auto"
                    />
                  </div>
                  <p className="font-semibold font-poppins text-2xl text-[#3399DB]">
                    Upload Image
                  </p>
                  <input
                    type="file"
                    id="wallpaperImage"
                    className="hidden"
                    required
                    onChange={handleStatus}
                  />
                </label>
              )}
            </div>
            <div className="flex justify-center py-5">
              <label
                onClick={() => {
                  if (imagePreview && wallpaperName) {
                    handleFileUpload();
                  } else {
                    toast.error("Please Add Name & File", {
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }
                }}
                htmlFor={`${wallpaperName && "uploadPopUp"}`}
                data-hs-overlay={modalClose || ""}
                className=" text-center cursor-pointer w-[200px] bg-maincolor  py-[10px] px-4 rounded-full text-white font-semibold"
              >
                Add Wallpaper
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadModal;
