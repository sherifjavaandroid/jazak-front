const showPassword = (setIsShowIcon, event) => {
    setIsShowIcon(event.target.value.trim().length > 0);
  };
  const showConfirmPassword = (setIsShowIcon, event) => {
    setIsShowIcon(event.target.value.trim().length > 0);
  };
  const handlePassword = (handler, event) => {
    handler(event.target.value);
  };
  export default showPassword;
  export { handlePassword };