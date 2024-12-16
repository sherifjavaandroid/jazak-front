import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { setAuth } from "../../features/auth/authSlice";
import { loginAdmin } from "../../util/api";
import showPassword from "../../util/showPassword";

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Check if both email and password are entered
    if (!email || !password) {
      toast.error("Please enter both email and password", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    setIsLoading(true);
    setIsButtonDisabled(true);

    const response = await fetch(loginAdmin, requestOptions);

    if (!response.ok && response.status === 401) {
      // Handle authentication failure
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false);
      setIsButtonDisabled(false);
    } else if (response.status === 404) {
      // Handle other failure cases
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false);
      setIsButtonDisabled(false);
    } else {
      // Handle successful login
      const responseData = await response.json();
      if (responseData?.user?._id) {
        setIsLoading(false);
        dispatch(
          setAuth({
            token: responseData?.user?.token || "",
            email: responseData?.user?.email,
            _id: responseData?.user?._id,
          })
        );
        localStorage.setItem(
          "jazakAuth",
          JSON.stringify({
            token: responseData?.user?.token || "",
            email: responseData?.user?.email,
            _id: responseData?.user?._id,
          })
        );
        navigate("/");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (email) {
      navigate("/");
    }
  }, [navigate, email]);
  return (
    <section className="h-screen bg-whiteLow bg-authBg bg-bottom bg-no-repeat bg-cover flex flex-col items-center justify-center w-full">
      <div className="flex flex-col">
        <div className="text-center mb-10">
          <h4 className="text-3xl text-primaryMain">Welcome back!</h4>
          <h1 className="text-5xl text-pureBlackColor font-bold">
            Login to continue
          </h1>
        </div>
        <div className="flex items-center justify-center py-12 px-10 bg-white shadow-md shadow-whiteLow rounded-lg w-[476px]">
          <form className="flex flex-col w-full gap-4 " onSubmit={handleLogin}>
            {/* Email Address */}
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
            {/* Password */}
            <div className="flex flex-col gap-1">
              <span className="text-blackHigh">Password</span>
              <PasswordInput
                isShowPassword={isShowPassword}
                setIsShowPassword={setIsShowPassword}
                isShowIcon={isShowIcon}
                onInput={(e) => showPassword(setIsShowIcon, e)}
                name="password"
                placeholder={"Enter your password"}
              ></PasswordInput>
            </div>

            <button
              className="py-4 normal-case mt-4 mb-6 rounded-lg bg-maincolor text-white font-semibold"
              type="submit"
              disabled={isButtonDisabled}
            >
              {/* <img className="w-12" src={loginBtn} alt="login button" /> */}
              {isLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center">
              <Link
                to="/forgot_password"
                className="text-lg text-slate-400 font-medium"
              >
                Forgot Password?
              </Link>
              {/* <p className="my-3">
                Don&apos;t Have an account?{" "}
                <Link to="/register" className=" text-slate-500 font-semibold">
                  Register
                </Link>
              </p> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
