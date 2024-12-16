import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordResetInput from "../../components/shared/ui/PasswordResetInput";
import CapitalizeFirstLetter from "../../util/CapitalizeFirstLetter";
import checkStrong from "../../util/CheckStrong";
import { handlePassword } from "../../util/showPasswordTwo";
function AdminReset() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowConfirmIcon, setIsShowConfirmIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isPasswordChangedButtonDisabled, setIsPasswordChangedButtonDisabled] =
    useState(true);
  // handleNewPassword
  const handleNewPassword = (value) => {
    const strong = checkStrong(setIsStrong, value);
    setNewPassword(value);
    setIsShowIcon(value?.trim()?.length > 0);
  };
  // handleConfirmPassword
  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
    setIsShowConfirmIcon(value?.trim()?.length > 0);
  };
  const handleOtp = (event) => {
    const cleanedValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setOtp(cleanedValue);
  };
  const { email } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match");
      setIsLoading(false);
      return;
    }
    const data = {
      email: email.replace(/:/g, "").trim(), // Remove colon from email
      newPassword,
      otp: parseInt(otp),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const config = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/admins/reset`,
      config
    );
    if (response.status === 200) {
      const responseData = response.json();
      setIsLoading(false);
      toast.info("Password Changed Successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate(`/login`);
    } else {
      const errorData = await response.json();
      setIsLoading(false);
      toast.error(`${CapitalizeFirstLetter(errorData?.message)}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (
      confrimPassword.length > 0 &&
      newPassword.length &&
      confrimPassword == newPassword &&
      isStrong
    ) {
      setIsPasswordChangedButtonDisabled(false);
    } else {
      setIsPasswordChangedButtonDisabled(true);
    }
  }, [newPassword, confrimPassword]);
  return (
    <section className="min-h-screen w-full bg-authBg bg-cover bg-center object-cover flex items-center justify-center overflow-auto px-6">
      <div className="w-[30rem] max-w-[30rem] py-12 px-10 rounded-lg bg-whiteHigh shadow-md mx-auto">
        <div className="w-full max-w-[400px] mx-auto ">
          <div className="text-center">
            <div className="text-center flex items-center justify-center lg:text-left mb-6"></div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black font-bold mt-2">
              Reset Password
            </h1>
          </div>
          <form action="" className="w-full mt-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <span className="font-poppins text-black-700 font-sm">OTP</span>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter your otp"
                  required
                  name="otp"
                  value={otp}
                  onChange={handleOtp}
                  className={`w-full border border-neutral-300 text-black-900 font-poppins text-base font-normal rounded-lg outline-none py-3 px-4`}
                />
              </div>
            </div>
            {/* NEW PASSWORD  */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-blackHigh">New Password</span>
              <div className="w-full">
                <PasswordResetInput
                  isShowPassword={isShowPassword}
                  setIsShowPassword={setIsShowPassword}
                  isShowIcon={isShowIcon}
                  onInput={(e) => handlePassword(handleNewPassword, e)}
                  name="newPassword"
                  placeholder={"Enter new password"}
                ></PasswordResetInput>
                {!isStrong && (
                  <p className="text-[10px] text-fadeColor md:mt-1">
                    Must contain more than 6 character with uppercase,
                    lowercase, symble and number
                  </p>
                )}
              </div>
            </div>
            {/* CONFIRM PASSWORD  */}
            <div className="flex flex-col gap-2">
              <span className="text-blackHigh">Confirm Password</span>
              <div className="w-full">
                <PasswordResetInput
                  isShowPassword={isShowConfirmPassword}
                  setIsShowPassword={setIsShowConfirmPassword}
                  isShowIcon={isShowConfirmIcon}
                  onInput={(e) => handlePassword(handleConfirmPassword, e)}
                  name="confirmPassword"
                  placeholder={"Confirm password"}
                ></PasswordResetInput>
              </div>
            </div>
            <div className="mt-8 w-full">
              <button
                className={`btn-main w-full h-[60px] disabled:bg-disabledColor disabled:cursor-default  ${
                  isPasswordChangedButtonDisabled
                    ? "disabled:bg-btndisabled disabled:cursor-default"
                    : "disabled:cursor-default bg-basecolor hover:bg-basecolor"
                }   text-white capitalize px-10 py-4 font-semibold flex justify-center items-center rounded-lg cursor-pointer `}
                disabled={isPasswordChangedButtonDisabled}
                type="submit"
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Reset"
                )}
              </button>
              {/* <button className="btn btn-main w-full">

              {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Reset"
                )}
                
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default AdminReset;
