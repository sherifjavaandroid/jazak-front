import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { postDua, updateDua } from "../../features/dua/duaSlice";
import { fetchAllDuaCategory } from "../../features/duaCategories/duaCategoriesSlice";
function DuaUpdateForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.duaCategories);
  const categoriesData = categories?.allDuaCategory;

  const dua = useSelector((state) => state.dua);

  const [defaultCategory, setDefaultCategory] = useState(
    payload?.categoryEnglish || null
  );
  const [myDua, setDua] = useState({
    duaArabic: payload?.duaArabic,
    duaEnglish: payload?.duaEnglish,
    duaTurkish: payload?.duaTurkish,
    duaUrdu: payload?.duaUrdu,
    duaBangla: payload?.duaBangla,
    duaHindi: payload?.duaHindi,
    duaFrench: payload?.duaFrench,

    categoryArabic: payload?.categoryArabic,
    categoryEnglish: payload?.categoryEnglish,
    categoryTurkish: payload?.categoryTurkish,
    categoryUrdu: payload?.categoryUrdu,
    categoryBangla: payload?.categoryBangla,
    categoryHindi: payload?.categoryHindi,
    categoryFrench: payload?.categoryFrench,

    titleArabic: payload?.titleArabic,
    titleEnglish: payload?.titleEnglish,
    titleTurkish: payload?.titleTurkish,
    titleUrdu: payload?.titleUrdu,
    titleBangla: payload?.titleBangla,
    titleHindi: payload?.titleHindi,
    titleFrench: payload?.titleFrench,

    category_id: payload?.category_id,
  });

  // Check if the current location is /dau-edit and there's no payload in the URL
  useEffect(() => {
    if (window.location.pathname === "/dua-edit" && !payload) {
      navigate("/dua");
    }
  }, [payload, navigate]);

  useEffect(() => {
    dispatch(fetchAllDuaCategory());
  }, [dispatch]);

  // Check if the current location is /dua-edit and there's no payload in the URL
  useEffect(() => {
    if (window.location.pathname === "/dua-edit" && !payload) {
      navigate("/dua");
    }
  }, [payload, navigate]);

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

  //handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    const isDataUpdated = Object.keys(myDua).some(
      (key) => myDua[key]?.trim() !== payload[key]?.trim()
    );

    if (isDataUpdated) {
      const editedFields = {};

      // Include all fields, using the original values if they haven't changed
      Object.keys(myDua).forEach((key) => {
        const newValue = myDua[key]?.trim();
        editedFields[key] = newValue !== "" ? newValue : payload[key];
      });

      dispatch(updateDua({ data: editedFields, id: payload._id }))
        .unwrap()
        .then(() => {
          navigate("/dua");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      notify();
    }
  };

  //handle category
  const handleCategory = (id) => {
    // find category
    const category = categoriesData.find((item) => item._id == id);
    setDefaultCategory(category?.categoryEnglish);
    // update state
    setDua((prevState) => ({
      ...prevState,
      categoryEnglish: category?.categoryEnglish,
      categoryArabic: category?.categoryArabic,
      categoryTurkish: category?.categoryTurkish,
      categoryUrdu: category?.categoryUrdu,
      categoryBangla: category?.categoryBangla,
      categoryHindi: category?.categoryHindi,
      categoryFrench: category?.categoryFrench,
      category_id: category?._id,
    }));
  };

  return categories.isLoading ? (
    <SearchLoader></SearchLoader>
  ) : (
    <section className="py-6 px-8">
      <div>
        <BackToPrev path="/dua" title={`Back`}></BackToPrev>

        <div className="bg-white p-6 rounded-2xl">
          <form action="">
            <div className="">
              <div className="grid md:grid-cols-2 gap-x-8 gap-8">
                {/* category */}
                <div className="w-full">
                  <div className="flex flex-col gap-1 ">
                    <span className="text-base font-poppins font-bold text-blackMediumEmp">
                      Category
                    </span>
                    {categoriesData && (
                      <Select
                        className="font-poppins border border-neutralColorTwoHundread rounded-lg outline-none adSetting w-2/4"
                        value={defaultCategory}
                        onChange={(e) => handleCategory(e)}
                        aria-required
                      >
                        {categoriesData?.map((category, idx) => {
                          return (
                            <Select.Option
                              key={category._id}
                              value={category._id}
                              className="mb-[1px]"
                            >
                              <span>{category.categoryEnglish}</span>
                            </Select.Option>
                          );
                        })}
                      </Select>
                    )}
                  </div>
                </div>
                {/* title */}
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Title (English)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Dua For Everyday"
                    defaultValue={myDua.titleEnglish}
                    required
                    onChange={(e) =>
                      setDua((prevState) => ({
                        ...prevState,
                        titleEnglish: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Title(Arabic)*/}
                <div className="w-full flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Title (Arabic)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Dua For Everyday"
                    defaultValue={myDua?.titleArabic}
                    required
                    onChange={(e) =>
                      setDua((prevState) => ({
                        ...prevState,
                        titleArabic: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Title(Turkish)*/}
                <div className="w-full flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Title (Turkish)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Dua For Everyday"
                    defaultValue={myDua?.titleTurkish}
                    required
                    onChange={(e) =>
                      setDua((prevState) => ({
                        ...prevState,
                        titleTurkish: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Title(titleUrdu)*/}
                <div className="w-full flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Title (Urdu)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Dua For Everyday"
                    defaultValue={myDua?.titleUrdu}
                    required
                    onChange={(e) =>
                      setDua((prevState) => ({
                        ...prevState,
                        titleUrdu: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Title(titleBangla)*/}
                <div className="w-full flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Title (Bangla)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Dua For Everyday"
                    defaultValue={myDua?.titleBangla}
                    required
                    onChange={(e) =>
                      setDua((prevState) => ({
                        ...prevState,
                        titleBangla: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Title(titleHindi)*/}
                <div className="w-full flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Title (Hindi)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Dua For Everyday"
                    defaultValue={myDua?.titleHindi}
                    required
                    onChange={(e) =>
                      setDua((prevState) => ({
                        ...prevState,
                        titleHindi: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Title(titleFrench)*/}
                <div className="w-full flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Title (French)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Dua For Everyday"
                    defaultValue={myDua?.titleFrench}
                    required
                    onChange={(e) =>
                      setDua((prevState) => ({
                        ...prevState,
                        titleFrench: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Dua Arabic */}
              <div className="flex flex-col gap-1 text-blackHigh mt-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Dua Arabic
                </span>
                <textarea
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                  placeholder="Enter dua in arabic"
                  required
                  defaultValue={myDua?.duaArabic}
                  onChange={(e) =>
                    setDua((prev) => ({
                      ...prev,
                      duaArabic: e.target.value,
                    }))
                  }
                />
              </div>
              {/* Dua English */}
              <div className="flex flex-col gap-1 text-blackHigh mt-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Dua English
                </span>
                <textarea
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                  placeholder="Enter dua in english"
                  required
                  defaultValue={myDua?.duaEnglish}
                  onChange={(e) =>
                    setDua((prev) => ({
                      ...prev,
                      duaEnglish: e.target.value,
                    }))
                  }
                />
              </div>
              {/* Dua duaTurkish */}
              <div className="flex flex-col gap-1 text-blackHigh mt-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Dua Turkish
                </span>
                <textarea
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                  placeholder="Enter dua in turkish"
                  required
                  defaultValue={myDua?.duaTurkish}
                  onChange={(e) =>
                    setDua((prev) => ({
                      ...prev,
                      duaTurkish: e.target.value,
                    }))
                  }
                />
              </div>
              {/* Dua Urdu  */}
              <div className="flex flex-col gap-1 text-blackHigh mt-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Dua Urdu
                </span>
                <textarea
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                  placeholder="Enter dua in urdu"
                  required
                  defaultValue={myDua?.duaUrdu}
                  onChange={(e) =>
                    setDua((prev) => ({
                      ...prev,
                      duaUrdu: e.target.value,
                    }))
                  }
                />
              </div>
              {/* Dua Bangla */}
              <div className="flex flex-col gap-1 text-blackHigh mt-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Dua Bangla
                </span>
                <textarea
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                  placeholder="Enter dua in bangla"
                  required
                  defaultValue={myDua?.duaBangla}
                  onChange={(e) =>
                    setDua((prev) => ({
                      ...prev,
                      duaBangla: e.target.value,
                    }))
                  }
                />
              </div>
              {/* Dua Hindi */}
              <div className="flex flex-col gap-1 text-blackHigh mt-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Dua Hindi
                </span>
                <textarea
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                  placeholder="Enter dua in hindi"
                  required
                  defaultValue={myDua?.duaHindi}
                  onChange={(e) =>
                    setDua((prev) => ({
                      ...prev,
                      duaHindi: e.target.value,
                    }))
                  }
                />
              </div>
              {/* Dua French */}
              <div className="flex flex-col gap-1 text-blackHigh mt-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Dua French
                </span>
                <textarea
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                  placeholder="Enter dua in french"
                  required
                  defaultValue={myDua?.duaFrench}
                  onChange={(e) =>
                    setDua((prev) => ({
                      ...prev,
                      duaFrench: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            {/* submit button  */}
            {/* button components - index.css */}
            <div className="mt-6">
              <button className={`btn-main`} onClick={handleUpdate}>
                {dua.requestisLoading ? (
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

export default DuaUpdateForm;
