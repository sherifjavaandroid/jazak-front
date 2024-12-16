import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackToPrev from "../../components/shared/back/BackToPrev";
import {
  fetchAllDuaCategory,
  postDuaCategory,
  updateDuaCategory,
} from "../../features/duaCategories/duaCategoriesSlice";

function DuaCategoriesUpdateForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const duaCategories = useSelector((state) => state.duaCategories);
  const categoriesData = duaCategories?.allDuaCategory;

  useEffect(() => {
    if (categoriesData.length === 0) {
      dispatch(fetchAllDuaCategory());
    }
  }, [dispatch, categoriesData.length]);

  const [myCategories, setMyCategories] = useState({
    categoryArabic: payload?.categoryArabic || "",
    categoryEnglish: payload?.categoryEnglish || "",
    categoryTurkish: payload?.categoryTurkish || "",
    categoryUrdu: payload?.categoryUrdu || "",
    categoryBangla: payload?.categoryBangla || "",
    categoryHindi: payload?.categoryHindi || "",
    categoryFrench: payload?.categoryFrench || "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  //redirect if no payload and want to edit
  useEffect(() => {
    // Check if the current location is /category-edit and there's no payload in the URL
    if (window.location.pathname === "/dua-categories-edit" && !payload) {
      navigate("/dua-cateory");
    }
  }, [payload, navigate]);

  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled =
      myCategories.categoryArabic &&
      myCategories.categoryEnglish &&
      myCategories.categoryTurkish &&
      myCategories.categoryUrdu &&
      myCategories.categoryBangla &&
      myCategories.categoryHindi &&
      myCategories.categoryFrench;

    // Enable or disable the button based on the condition
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

  const handleUpdateCategory = (e) => {
    e.preventDefault();
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
      dispatch(updateDuaCategory({ data: myCategories, id: payload._id }))
        .unwrap()
        .then((originalPromiseResult) => {
          navigate("/dua-categories");
        })
        .catch((rejectedValueOrSerializedError) => {
          setIsButtonDisabled(false);
        });
    } else {
      notify();
    }
  };

  return (
    <section className="py-6 px-8">
      <div>
        <BackToPrev path="/dua-categories" title={`Back`}></BackToPrev>
        <div className="bg-white p-6 rounded-2xl">
          <form action="">
            <div className="flex flex-col gap-8">
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
              {/* Turkish */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Turkish)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in turkish"
                  defaultValue={myCategories?.categoryTurkish}
                  required
                  onChange={(e) =>
                    setMyCategories((prevState) => ({
                      ...prevState,
                      categoryTurkish: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Urdu */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Urdu)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in urdu"
                  defaultValue={myCategories?.categoryUrdu}
                  required
                  onChange={(e) =>
                    setMyCategories((prevState) => ({
                      ...prevState,
                      categoryUrdu: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Bangla */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Bangla)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in bangla"
                  defaultValue={myCategories?.categoryBangla}
                  required
                  onChange={(e) =>
                    setMyCategories((prevState) => ({
                      ...prevState,
                      categoryBangla: e.target.value,
                    }))
                  }
                />
              </div>

              {/* hindi */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Hindi)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in hindi"
                  defaultValue={myCategories?.categoryHindi}
                  required
                  onChange={(e) =>
                    setMyCategories((prevState) => ({
                      ...prevState,
                      categoryHindi: e.target.value,
                    }))
                  }
                />
              </div>

              {/* french */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (French)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in french"
                  defaultValue={myCategories?.categoryFrench}
                  required
                  onChange={(e) =>
                    setMyCategories((prevState) => ({
                      ...prevState,
                      categoryFrench: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            {/* submit button  */}
            {/* button components - index.css */}
            <div className="mt-8">
              <button
                className={`btn-main`}
                onClick={(e) => handleUpdateCategory(e)}
                disabled={isButtonDisabled}
              >
                {duaCategories?.requestIsLoading ? (
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

export default DuaCategoriesUpdateForm;
