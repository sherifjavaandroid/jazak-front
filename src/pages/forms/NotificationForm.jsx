import { Select } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { sendNotification } from "../../features/notifications/notificationsSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";

function NotificationForm({ selectedUser, handleChange, selectedItems }) {
  const { isRequestLoading } = useSelector((state) => state.notifications);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const fileRef = useRef();
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setTypeError(false);
    } else {
      setFile("");
      setImagePreview("");
      setTypeError(true);
      fileRef.current.value = "";
    }
  };

  const handleFileDelete = () => {
    setImagePreview(null);
    setFile(null);
    setTypeError(false);
    fileRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedOneSignalIds = selectedItems.map((item) => item?.oneSignalId);
    const form = event.target;
    const title = form.title.value;
    const message = form.message.value;

    if (
      !title ||
      !message ||
      !selectedUser ||
      !file ||
      selectedOneSignalIds?.length === 0
    ) {
      errorNotify("Incomplete Input");
      return;
    }
    const data = {
      title,
      message,
      user_type: selectedUser,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("image", file);
    dispatch(
      sendNotification({ data: formData, player_ids: selectedOneSignalIds })
    )
      .unwrap()
      .then((res) => {
        const objKey = Object.keys(res)[0];
        if (objKey === "error") {
          errorNotify("Something went wrong");
        } else {
          navigate("/notifications");
          infoNotify("Successfully sent notification");
        }
        navigate("/notifications");
      })
      .catch((error) => {
        errorNotify("Something went wrong");
      });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-poppins font-bold text-blackMediumEmp">
            Title
          </span>
          <input
            type="text"
            placeholder="Title here"
            required
            name="title"
            className={`w-full font-poppins border border-neutralColorTwoHundrea rounded-lg outline-none p-4`}
          />
        </div>
        {/* Message */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-poppins font-bold text-blackMediumEmp">
            Message
          </span>
          <input
            type="text"
            placeholder="Message body here"
            required
            name="message"
            className={`w-full font-poppins border border-neutralColorTwoHundrea rounded-lg outline-none p-4`}
          />
        </div>
        {/* user */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-poppins font-bold text-blackMediumEmp">
            Select Users
          </span>
          <div className="w-full">
            <Select
              className="w-full font-poppins border border-neutralColorTwoHundrea rounded-lg outline-none adSetting"
              defaultValue={selectedUser}
              onChange={handleChange}
              aria-required
            >
              <Select.Option value="all" className="mb-[1px]">
                <span>All</span>
              </Select.Option>
              <Select.Option value="custom">
                <span>Custom</span>
              </Select.Option>
            </Select>
          </div>
        </div>
        {/* image  */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-poppins font-bold text-blackMediumEmp">
            Image
          </span>
          <div>
            <label htmlFor="imageId" className="w-full relative cursor-pointer">
              <input
                type="file"
                id="imageId"
                className="absolute opacity-0"
                onChange={(e) => handleFileChange(e)}
                required
                ref={fileRef}
                //   className="font-poppins border border-neutralColorTwoHundrea px-2 py-[9px] w-full rounded-lg outline-none"
              />
              <div className="flex items-center gap-2 py-[10px] px-2 font-poppins border border-neutralColorTwoHundrea rounded-lg ">
                <span className="inline-block px-4 py-2 bg-maincolor text-white text-sm rounded-lg ">
                  Chose File
                </span>
                <span className="text-xs text-blackSemi ">Upload Image</span>
              </div>
            </label>
            {typeError && (
              <p className="text-xs text-errorColor mt-1 font-medium">
                Only JPG, JPEG or PNG file are supported
              </p>
            )}
          </div>
        </div>
        {/* image preview */}
        {imagePreview && (
          <div className="flex flex-col gap-1">
            <span className="text-base font-poppins font-bold text-blackMediumEmp">
              Image Preview
            </span>
            <div className="w-full font-poppins border border-neutralColorTwoHundrea rounded-lg outline-none p-2 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2">
                <img
                  src={imagePreview}
                  alt=""
                  className="w-10 h-10 rounded-sm bg-center object-cover"
                />
                <p className="text-blackSemi text-base">
                  {file?.name?.length > 25
                    ? file?.name?.slice(0, 25) + "..."
                    : file?.name}
                </p>
              </div>
              <div>
                <button
                  className="flex-1 flex items-center justify-center"
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
        )}
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className={`w-52 h-14 bg-maincolor py-[20px] px-4 rounded-lg capitalize text-white font-semibold flex justify-center items-center`}
          disabled={isRequestLoading}
        >
          {isRequestLoading ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </form>
  );
}

export default NotificationForm;
