const checkStrong = (setIsStrong, value) => {
  // setIsShowIcon(event.target.value.trim().length > 0);
  const password = value;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLength = password.length >= 8;
  const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasLength &&
    hasSpecialSymbol
  ) {
    setIsStrong(true);
  } else {
    setIsStrong(false);
  }
};

export default checkStrong;