/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { registerAdmin } from "../../util/api";
import showPassword from "../../util/showPassword";

function Registration() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    //data
    const data = {
      fullName: firstName + " " + lastName,
      email,
      password,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      setIsLoading(true);
      setIsButtonDisabled(true);
      //making request
      const res = await fetch(registerAdmin, requestOptions);

      if (res.status === 201) {
        setIsLoading(false);
        toast.success("Successfully registered", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsButtonDisabled(false);
        navigate("/login");
      }
      if (!res.ok && res.status == 409) {
        setIsLoading(false);
        toast.error("Admin already exist", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsButtonDisabled(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.info(`${error?.message}`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (email) {
      navigate("/");
    }
  }, []);

  return (
    <section className="h-screen bg-authBg bg-bottom bg-no-repeat bg-cover bg-whiteLow flex flex-col items-center justify-center w-full">
      <div className="flex flex-col">
        <div className="text-center mb-10">
          <h4 className="text-3xl text-primaryMain">Welcome back!</h4>
          <h1 className="text-5xl text-pureBlackColor font-bold">
            Register to continue
          </h1>
        </div>
        <div className="flex items-center justify-center py-4 px-10 bg-white shadow-md shadow-whiteLow rounded-lg w-[476px]">
          <form className="flex flex-col w-full gap-4 " onSubmit={handleSignup}>
            <div className="flex flex-col gap-1">
              <span className="text-blackHigh">First Name</span>
              <input
                type="text"
                placeholder="Enter your first name"
                required
                name="firstName"
                className={`w-full border border-slateLow  rounded-lg outline-none p-4`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blackHigh">Last Name</span>
              <input
                type="text"
                placeholder="Enter your last name"
                required
                name="lastName"
                className={`w-full border border-slateLow  rounded-lg outline-none p-4`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blackHigh">Email</span>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                name="email"
                className={`w-full border border-slateLow  rounded-lg outline-none p-4`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blackHigh">Password</span>

              <div>
                <PasswordInput
                  isShowPassword={isShowPassword}
                  setIsShowPassword={setIsShowPassword}
                  isShowIcon={isShowIcon}
                  onInput={(e) => showPassword(setIsShowIcon, e)}
                  name="password"
                  placeholder={"Enter your password"}
                  required
                ></PasswordInput>
                {isStrong && (
                  <p className="text-xs text-fadeColor mt-1">
                    Must contain more than 7 character with uppercase,
                    lowercase, symble and number
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col ">
              <button
                className="py-4 normal-case mt-4 mb-6 rounded-lg bg-maincolor text-white font-semibold"
                type="submit"
                disabled={isButtonDisabled}
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
              <div className="text-center">
                Already Have an account?{" "}
                <Link to="/login" className=" text-slate-500 font-semibold">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Registration;
