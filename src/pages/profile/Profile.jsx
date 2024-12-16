/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileDummy } from "../../assets/getAssets";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { updateAdminById } from "../../features/profile/profileSlice";
import { errorNotify, successNotify } from "../../util/getNotify";
import showPassword from "../../util/showPassword";

function Profile() {
  const { fullName, email, img, _id, isLoading, isError, isRequestLoading } =
    useSelector((state) => state.profile);
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowCurrentIcon, setIsShowCurrentIcon] = useState(false);
  const [isShowNewIcon, setIsShowNewIcon] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
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
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.fullName.value;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;

    if ((oldPassword || newPassword) && oldPassword !== newPassword) {
      errorNotify("Password does not match");
      return;
    }

    if (!imagePreview && !oldPassword && !newPassword && name === fullName) {
      errorNotify("You didn't change anything");
      return;
    }

    const data = {
      fullName: name,
    };
    if (newPassword) {
      data.password = newPassword;
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (file) {
      formData.append("file", file);
    }
    dispatch(updateAdminById({ id: _id, data: formData }))
      .unwrap()
      .then((res) => {
        successNotify("Successfully updated");
      })
      .catch((error) => {
        errorNotify("Something went wrong");
      });
  };

  useEffect(() => {
    if (location?.pathname === "/profile") {
      localStorage.setItem("activePath", "profile");
    }
  }, []);

  return isLoading ? (
    <SearchLoader></SearchLoader>
  ) : isError ? (
    <SomethingWrong></SomethingWrong>
  ) : (
    <section className="px-8 py-6 h-full overflow-auto">
      <BackToPrev path="/" title="Home"></BackToPrev>
      <div className="bg-white p-6 rounded-2xl">
        <div>
          <form action="" onSubmit={handleSubmit}>
            {/* user image */}
            <div className="relative max-w-max mb-6">
              <div className="">
                <img
                  src={imagePreview || img?.thumbnailUrl || profileDummy}
                  alt=""
                  className="w-[120px] h-[120px] rounded-full bg-center object-cover"
                />
              </div>
              <input
                type="file"
                id="profileImage"
                className="absolute opacity-0 w-0.5 h-0.5"
                onChange={handleFileChange}
              />
              <div className="max-w-max absolute right-3 bottom-0 rounded-full">
                <label
                  htmlFor="profileImage"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#75BFC0]  cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M14.3666 18.9587H5.63327C3.29994 18.9587 1.81661 17.567 1.68327 15.242L1.24994 8.36699C1.18327 7.32533 1.54161 6.32533 2.25827 5.56699C2.96661 4.80866 3.96661 4.37533 4.99994 4.37533C5.26661 4.37533 5.52494 4.21699 5.64994 3.96699L6.24994 2.77533C6.74161 1.80033 7.97494 1.04199 9.04994 1.04199H10.9583C12.0333 1.04199 13.2583 1.80033 13.7499 2.76699L14.3499 3.98366C14.4749 4.21699 14.7249 4.37533 14.9999 4.37533C16.0333 4.37533 17.0333 4.80866 17.7416 5.56699C18.4583 6.33366 18.8166 7.32533 18.7499 8.36699L18.3166 15.2503C18.1666 17.6087 16.7249 18.9587 14.3666 18.9587ZM9.04994 2.29199C8.43327 2.29199 7.64994 2.77533 7.36661 3.33366L6.76661 4.53366C6.41661 5.20866 5.74161 5.62533 4.99994 5.62533C4.29994 5.62533 3.64994 5.90866 3.16661 6.41699C2.69161 6.92533 2.44994 7.59199 2.49994 8.28366L2.93327 15.167C3.03327 16.8503 3.94161 17.7087 5.63327 17.7087H14.3666C16.0499 17.7087 16.9583 16.8503 17.0666 15.167L17.4999 8.28366C17.5416 7.59199 17.3083 6.92533 16.8333 6.41699C16.3499 5.90866 15.6999 5.62533 14.9999 5.62533C14.2583 5.62533 13.5833 5.20866 13.2333 4.55033L12.6249 3.33366C12.3499 2.78366 11.5666 2.30033 10.9499 2.30033H9.04994V2.29199Z"
                      fill="white"
                    />
                    <path
                      d="M11.25 7.29199H8.75C8.40833 7.29199 8.125 7.00866 8.125 6.66699C8.125 6.32533 8.40833 6.04199 8.75 6.04199H11.25C11.5917 6.04199 11.875 6.32533 11.875 6.66699C11.875 7.00866 11.5917 7.29199 11.25 7.29199Z"
                      fill="white"
                    />
                    <path
                      d="M9.99996 15.6247C8.15829 15.6247 6.66663 14.133 6.66663 12.2913C6.66663 10.4497 8.15829 8.95801 9.99996 8.95801C11.8416 8.95801 13.3333 10.4497 13.3333 12.2913C13.3333 14.133 11.8416 15.6247 9.99996 15.6247ZM9.99996 10.208C8.84996 10.208 7.91663 11.1413 7.91663 12.2913C7.91663 13.4413 8.84996 14.3747 9.99996 14.3747C11.15 14.3747 12.0833 13.4413 12.0833 12.2913C12.0833 11.1413 11.15 10.208 9.99996 10.208Z"
                      fill="white"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              {/* User Name  */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  Name
                </span>
                <div className="w-full">
                  <input
                    type="text"
                    defaultValue={fullName}
                    placeholder="Enter your name"
                    required
                    name="fullName"
                    className={`w-full border border-neutralColorTwoHundread text-blackLowEmp text-base font-normal rounded-lg outline-none p-4`}
                  />
                </div>
              </div>
              {/* Email Address */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  Email Address
                </span>
                <input
                  type="email"
                  defaultValue={email}
                  placeholder="Enter your email address"
                  readOnly
                  required
                  name="email"
                  className={`w-full border border-neutralColorTwoHundread text-blackLowEmp text-base font-normal rounded-lg outline-none p-4 bg-[#F2F8FD]`}
                />
              </div>
              {/* Current Password */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  Current Password
                </span>
                <PasswordInput
                  isShowPassword={isShowCurrentPassword}
                  setIsShowPassword={setIsShowCurrentPassword}
                  isShowIcon={isShowCurrentIcon}
                  onInput={(e) => showPassword(setIsShowCurrentIcon, e)}
                  name="oldPassword"
                  placeholder={"Current password"}
                ></PasswordInput>
              </div>
              {/* New Password*/}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  New Password
                </span>

                <PasswordInput
                  isShowPassword={isShowNewPassword}
                  setIsShowPassword={setIsShowNewPassword}
                  isShowIcon={isShowNewIcon}
                  onInput={(e) => showPassword(setIsShowNewIcon, e)}
                  name="newPassword"
                  placeholder={"Enter new password"}
                ></PasswordInput>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="btn-main"
                disabled={isRequestLoading}
              >
                {isRequestLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
