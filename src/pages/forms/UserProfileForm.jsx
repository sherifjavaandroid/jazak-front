import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { profileDummy } from "../../assets/getAssets";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { resetPassword } from "../../features/users/usersSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";
import showPassword from "../../util/showPassword";

dayjs.extend(customParseFormat);

function UserProfileForm() {
  const { state } = useLocation();
  const { payload } = state || {};
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [gender, setGender] = useState("male");
  const [phoneValue, setPhoneValue] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const [timeLoading, setTimeLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { isRequestLoading } = users || {};

  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowNewIcon, setIsShowNewIcon] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowCurrentIcon, setIsShowCurrentIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myUser, setMyUser] = useState({
    fullName: payload?.fullName || "",
    phone: payload?.phone || phoneValue,
    email: payload?.email || "",
    gender: payload?.gender || gender,
  });

  const navigate = useNavigate();

  const handleChange = (value) => {
    setMyUser((prev) => ({ ...prev, gender: value }));
  };

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
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password === confirmPassword) {
      const data = {
        fullName: myUser?.fullName,
        password: confirmPassword,
      };
      dispatch(resetPassword({ data, id: payload?._id }))
        .unwrap()
        .then((res) => {
          setIsButtonDisabled(false);
          navigate("/users");
          infoNotify("Successfully updated");
        })
        .catch((error) => {
          setIsButtonDisabled(false);
          errorNotify("Something went wrong");
        });
    } else {
      setIsButtonDisabled(false);
      errorNotify("Password does not match");
    }
  };

  useEffect(() => {
    if (payload?._id) {
      setImagePreview(payload?.thumbnailUrl);
      setGender(payload?.gender);
      setPhoneValue(payload?.phone?.toString());
      setTimeLoading(false);
    }
  }, [payload]);

  useEffect(() => {
    setMyUser((prev) => ({ ...prev, phone: phoneValue }));
  }, [phoneValue]);

  return timeLoading ? (
    <SearchLoader></SearchLoader>
  ) : (
    <section className="px-8 py-6 h-full overflow-auto">
      <BackToPrev path="/users" title="My Profile"></BackToPrev>
      <div className="bg-white p-6 rounded-2xl">
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  Full Name
                </span>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  name="fullname"
                  defaultValue={myUser?.fullName}
                  onChange={(e) =>
                    setMyUser((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  disabled={isDisabled ? true : false}
                  className={`${
                    isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"
                  } w-full border border-neutralColorTwoHundread  rounded-lg outline-none p-4`}
                />
              </div>
              {/* Mobile Number */}

              {/* Email Address */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  Your Email
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  defaultValue={myUser?.email}
                  disabled={isDisabled ? true : false}
                  onChange={(e) =>
                    setMyUser((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className={`${
                    isDisabled ? "bg-[#f4f4f4]" : "bg-white text-black"
                  } w-full border border-neutralColorTwoHundread   rounded-lg outline-none p-4`}
                />
              </div>
              {/* Gender */}

              {/* Password */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  Password
                </span>
                <PasswordInput
                  isShowPassword={isShowPassword}
                  setIsShowPassword={setIsShowPassword}
                  isShowIcon={isShowCurrentIcon}
                  onInput={(e) => showPassword(setIsShowCurrentIcon, e)}
                  name="password"
                  placeholder={"Enter new password"}
                  required
                ></PasswordInput>
              </div>
              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <span className="font-poppins text-blackMediumEmp font-semibold">
                  Confirm Password
                </span>
                <PasswordInput
                  isShowPassword={isShowNewPassword}
                  setIsShowPassword={setIsShowNewPassword}
                  isShowIcon={isShowNewIcon}
                  onInput={(e) => showPassword(setIsShowNewIcon, e)}
                  name="confirmPassword"
                  placeholder={"Confirm new password"}
                  required
                ></PasswordInput>
              </div>
              {/* image picker */}
              <div className="flex flex-col gap-1">
                <div className="">
                  {
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : myUser?.thumbnailUrl
                          ? myUser?.thumbnailUrl
                          : profileDummy
                      }
                      alt=""
                      className="w-28 h-28 bg-center rounded-full object-cover"
                    />
                  }
                </div>
              </div>
            </div>
            {/* button components - index.css */}
            <div className="mt-8">
              <button
                type="submit"
                className={`btn-main`}
                disabled={isRequestLoading}
              >
                {isRequestLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfileForm;
