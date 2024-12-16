import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  postEventPrayersCategory,
  updateEventPrayersCategory,
} from "../../features/eventPrayersCategories/eventPrayersCategoriesSlice";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function EventPrayersCategoriesForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [myCategories, setMyCategories] = useState({
    categoryArabic: payload?.categoryArabic || "",
    categoryEnglish: payload?.categoryEnglish || "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  //redirect if no payload and want to edit
  useEffect(() => {
    if (
      window.location.pathname === "/event-prayers-categories-edit" &&
      !payload
    ) {
      navigate("/dua-cateory");
    }
  }, [payload, navigate]);

  useEffect(() => {
    const allFieldsFilled =
      myCategories.categoryArabic && myCategories.categoryEnglish;
    setIsButtonDisabled(!allFieldsFilled);
  }, [myCategories]);

  const notify = () => {
    toast.error("No valid data changes to update.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    dispatch(postEventPrayersCategory(myCategories))
      .unwrap()
      .then((originalPromiseResult) => {
        setIsLoading(false);
        setIsButtonDisabled(false);
        navigate("/event-prayers-categories");
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(false);
    const isDataUpdated = Object.keys(myCategories).some(
      (key) => myCategories[key] !== payload[key]
    );
    if (isDataUpdated) {
      const editedFields = {};
      // Compare each field with its original value and store the edited ones
      Object.keys(myCategories).forEach((key) => {
        const newValue = myCategories[key].trim(); // Remove leading/trailing spaces
        if (newValue !== payload[key] && newValue !== "") {
          editedFields[key] = newValue;
        }
      });
      setIsButtonDisabled(true);
      dispatch(
        updateEventPrayersCategory({ data: editedFields, id: payload._id })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          setIsLoading(false);
          setIsButtonDisabled(false);
          navigate("/event-prayers-categories");
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
    } else {
      notify();
      setIsLoading(false);
    }
  };

  return (
    <section className="py-6 px-8">
      <div>
        <BackToPrev
          path="/event-prayers-categories"
          title={`Back`}
        ></BackToPrev>
        <div className="bg-white p-6 rounded-2xl">
          <form action="">
            <div className="flex flex-col md:flex-row gap-8">
              {/* english */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (English)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in english"
                  defaultValue={myCategories?.categoryEnglish}
                  required
                  onChange={(e) =>
                    setMyCategories((prevState) => ({
                      ...prevState,
                      categoryEnglish: e.target.value,
                    }))
                  }
                />
              </div>
              {/* arabic */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Arabic)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in arabic"
                  defaultValue={myCategories?.categoryArabic}
                  required
                  onChange={(e) =>
                    setMyCategories((prevState) => ({
                      ...prevState,
                      categoryArabic: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* submit button  */}
            {/* button components - index.css */}
            <div className="mt-8">
              {type === "edit" ? (
                <button
                  className={`btn-main`}
                  onClick={(e) => handleUpdateCategory(e)}
                  disabled={isButtonDisabled}
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Update"
                  )}
                </button>
              ) : (
                <button
                  className={`btn-main`}
                  onClick={handleAddCategory}
                  disabled={isButtonDisabled}
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Save"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EventPrayersCategoriesForm;
