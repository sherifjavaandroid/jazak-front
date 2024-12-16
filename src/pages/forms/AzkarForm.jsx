import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { postAzkar } from "../../features/azkar/azkarSlice";
import { fetchAllAzkarCategory } from "../../features/azkarCategories/AzkarCategoriesSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";

const AzkarForm = () => {
  const dispatch = useDispatch();
  const { isRequestLoading } = useSelector((state) => state.azkar);
  const { allCategory, isLoading, isError } = useSelector(
    (state) => state.azkarCategories
  );

  const navigate = useNavigate();
  const [category_id, setCategoryId] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const azkarEnglish = form.azkarEnglish.value;
    const azkarArabic = form.azkarArabic.value;
    const azkarTurkish = form.azkarTurkish.value;
    const azkarUrdu = form.azkarUrdu.value;
    const azkarBangla = form.azkarBangla.value;
    const azkarHindi = form.azkarHindi.value;
    const azkarFrench = form.azkarFrench.value;

    const isComplete =
      azkarEnglish &&
      azkarArabic &&
      azkarTurkish &&
      azkarUrdu &&
      azkarBangla &&
      azkarHindi &&
      azkarFrench &&
      category_id;

    if (!isComplete) {
      errorNotify("Incomplete Input");
      return;
    } else {
      const data = {
       azkarEnglish,
        azkarArabic,
        azkarTurkish,
        azkarUrdu,
        azkarBangla,
        azkarHindi,
        azkarFrench,
        category_id,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      dispatch(postAzkar(formData))
        .unwrap()
        .then((res) => {
          const objKey = Object.keys(res)[0];
          if (objKey === "error") {
            errorNotify("Something went wrong");
          } else {
            navigate("/azkar");
            infoNotify("Successfully added");
          }
        })
        .catch((error) => {
          errorNotify("Something went wrong");
        });
    }
  };

  useEffect(() => {
    dispatch(fetchAllAzkarCategory());
  }, []);

  useEffect(() => {
    if (allCategory?.length > 0) {
      setCategoryId(allCategory[0]?._id);
    }
  }, [allCategory]);

  return isLoading ? (
    <SearchLoader></SearchLoader>
  ) : isError ? (
    <SomethingWrong></SomethingWrong>
  ) : (
    <section className="py-6 px-8">
      <div>
        <BackToPrev path="/azkar" title={`Back`}></BackToPrev>

        <div className="bg-white p-6 rounded-2xl">
          <form action="" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Name (English) */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (English)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter azkar in english"
                  required
                  name="azkarEnglish"
                />
              </div>
              {/* Name (Arabic)*/}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Arabic)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter azkar in arabic"
                  required
                  name="azkarArabic"
                />
              </div>
              {/* Name (turkish)*/}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Turkish)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter azkar in turkish"
                  name="azkarTurkish"
                  required
                />
              </div>
              {/* Name (urdu)*/}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Urdu)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter azkar in urdu"
                  required
                  name="azkarUrdu"
                />
              </div>
              {/* Name (bangla)*/}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Bangla)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter azkar in bangla"
                  required
                  name="azkarBangla"
                />
              </div>
              {/* Name (hindi)*/}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Hindi)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter azkar in hindi"
                  required
                  name="azkarHindi"
                />
              </div>
              {/* Name (french)*/}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (French)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter azkar in french"
                  required
                  name="azkarFrench"
                />
              </div>

              <div className="w-full">
                <div className="flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Topic
                  </span>
                  <Select
                    className="font-poppins border border-neutralColorTwoHundread rounded-lg outline-none adSetting w-2/4"
                    value={category_id}
                    onChange={(e) => setCategoryId(e)}
                    aria-required
                    name="category_id"
                  >
                    {allCategory?.map((category, idx) => {
                      return (
                        <Select.Option
                          key={category?._id}
                          value={category?._id}
                          className="mb-[1px]"
                        >
                          <span>{category?.categoryEnglish}</span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>

            {/* submit button  */}
            {/* button components - index.css */}
            <div>
              {/* <button className={`btn-main`}>Update</button> */}
              <button className={`btn-main`} disabled={isRequestLoading}>
                {isRequestLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AzkarForm;
