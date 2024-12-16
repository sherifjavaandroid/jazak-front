import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { fetchAllHadithCategory } from "../../features/hadithCategories/hadithCategoriesSlice";
import {
  postSubCategory,
  updateSubCategory,
} from "../../features/hadithSubCategories/hadithSubCategoriesSlice";

function HadithSubCategoriesForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllHadithCategory());
  }, [dispatch]);
  const categories = useSelector((state) => state.hadithCategories);
  const categoriesData = categories?.allHadithCategory;
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    payload?.categoryEnglish || null
  );
  const [mySubCategories, setMySubCategories] = useState({
    categoryEnglish:
      payload?.categoryEnglish || categoriesData[0]?.categoryEnglish || "",
    subCategoryArabic: payload?.subCategoryArabic || "",
    subCategoryEnglish: payload?.subCategoryEnglish || "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [defaultCategory, setDefaultCategory] = useState(
    payload?.categoryEnglish || categoriesData[0]?.categoryEnglish
  );

  useEffect(() => {
    // Check if the current location is /hadith-SubCategories-edit and there's no payload in the URL
    if (window.location.pathname === "/hadith-SubCategories-edit" && !payload) {
      navigate("/SubCategories");
    }
  }, [payload, navigate]);
  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled =
      mySubCategories.subCategoryArabic && mySubCategories.subCategoryEnglish;

    // Enable or disable the button based on the condition
    setIsButtonDisabled(!allFieldsFilled);
  }, [mySubCategories]);

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

  const handleAddSubCategory = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    dispatch(postSubCategory(mySubCategories))
      .unwrap()
      .then((originalPromiseResult) => {
        setIsLoading(false);
        setIsButtonDisabled(false);
        navigate("/hadith-SubCategories");
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const handleCategory = (id) => {
    // find category
    const category = categoriesData.find((item) => item._id == id);
    setActiveCategory(category?.categoryEnglish);
    // update state
    setMySubCategories((prevState) => ({
      ...prevState,
      categoryEnglish: category?.categoryEnglish,
    }));
  };

  const handleUpdateSubCategory = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(false);
    const isDataUpdated = Object.keys(mySubCategories).some(
      (key) => mySubCategories[key] !== payload[key]
    );
    if (isDataUpdated) {
      const editedFields = {};
      // Compare each field with its original value and store the edited ones
      Object.keys(mySubCategories).forEach((key) => {
        const newValue = mySubCategories[key].trim(); // Remove leading/trailing spaces
        if (newValue !== payload[key] && newValue !== "") {
          editedFields[key] = newValue;
        }
      });
      setIsButtonDisabled(true);
      dispatch(updateSubCategory({ data: editedFields, id: payload._id }))
        .unwrap()
        .then((originalPromiseResult) => {
          setIsLoading(false);
          setIsButtonDisabled(false);
          navigate("/hadith-SubCategories");
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
        <BackToPrev path="/hadith-SubCategories" title={`Back`}></BackToPrev>
        <div className="bg-white p-6 rounded-2xl">
          <form action="">
            {/* category */}
            <div className="w-full mb-8">
              <div className="flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Category
                </span>
                {categoriesData && (
                  <Select
                    className="font-poppins border border-neutralColorTwoHundread rounded-lg outline-none adSetting w-2/4 "
                    defaultValue={defaultCategory}
                    onChange={(e) => handleCategory(e)}
                    aria-required
                  >
                    {categoriesData
                      ? [...categoriesData]
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .map((category, idx) => (
                            <Select.Option
                              key={category?._id}
                              value={category?._id}
                              className="mb-[1px]"
                            >
                              <span>{category?.categoryEnglish}</span>
                            </Select.Option>
                          ))
                      : null}
                  </Select>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-8 flex-wrap">
              {/* english */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (English)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter sub category in english"
                  defaultValue={mySubCategories?.subCategoryEnglish}
                  required
                  onChange={(e) =>
                    setMySubCategories((prevState) => ({
                      ...prevState,
                      subCategoryEnglish: e.target.value,
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
                  placeholder="Enter sub category in arabic"
                  defaultValue={mySubCategories?.subCategoryArabic}
                  required
                  onChange={(e) =>
                    setMySubCategories((prevState) => ({
                      ...prevState,
                      subCategoryArabic: e.target.value,
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
                  onClick={(e) => handleUpdateSubCategory(e)}
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
                  onClick={handleAddSubCategory}
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

export default HadithSubCategoriesForm;
