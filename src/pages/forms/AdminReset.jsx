import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordResetInput from "../../components/shared/ui/PasswordResetInput";
import { updateAdminPassword } from "../../features/auth/authSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";
import showPassword from "../../util/showPassword";
function AdminReset() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowConfirmIcon, setIsShowConfirmIcon] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { payload: email } = state || {};
  const { isRequestLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const handleOtp = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 4); // Remove non-numeric characters
    setOtp(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    if (!newPassword || !confirmPassword || !email || !otp) {
      errorNotify("Incomplete Input");
      return;
    } else if (otp?.length < 4) {
      errorNotify("Otp must be 4 digit");
      return;
    } else if (newPassword !== confirmPassword) {
      errorNotify("Password does not match");
      return;
    } else {
      const data = {
        email,
        newPassword,
        otp: parseInt(otp),
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      dispatch(updateAdminPassword(formData))
        .unwrap()
        .then((res) => {
          navigate(`/login`);
          infoNotify("Succssfully updated");
        })
        .catch((error) => {
          errorNotify("Something went wrong");
        });
    }
  };
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
                  onInput={(e) => showPassword(setIsShowIcon, e)}
                  name="newPassword"
                  placeholder={"Enter new password"}
                ></PasswordResetInput>
                {/* {!isStrong && (
                  <p className="text-[10px] text-fadeColor md:mt-1">
                    Must contain more than 6 character with uppercase,
                    lowercase, symble and number
                  </p>
                )} */}
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
                  onInput={(e) => showPassword(setIsShowConfirmIcon, e)}
                  name="confirmPassword"
                  placeholder={"Confirm password"}
                ></PasswordResetInput>
              </div>
            </div>
            <div className="mt-8 w-full">
              <button
                className={`btn-main w-full`}
                disabled={isRequestLoading}
                type="submit"
              >
                {isRequestLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Reset"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default AdminReset;
