import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { updateAzkar } from "../../features/azkar/azkarSlice";
import { fetchAllAzkarCategory } from "../../features/azkarCategories/AzkarCategoriesSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";

const AzkarUpdateForm = () => {
  const dispatch = useDispatch();
  const { isRequestLoading } = useSelector((state) => state.azkar);
  const { allCategory, isLoading, isError } = useSelector(
    (state) => state.azkarCategories
  );
  const { state } = useLocation();
  const { payload } = state || {};

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
      dispatch(updateAzkar({ data: formData, id: payload?._id }))
        .unwrap()
        .then((res) => {
          const objKey = Object.keys(res)[0];
          if (objKey === "error") {
            errorNotify("Something went wrong");
          } else {
            navigate("/azkar");
            infoNotify("Successfully updated");
          }
        })
        .catch((error) => {
          errorNotify("Something went wrong");
        });
    }
  };

  useEffect(() => {
    dispatch(fetchAllAzkarCategory());
    setCategoryId(payload?.category_id);
  }, []);

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
                  defaultValue={payload?.azkarEnglish}
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
                  defaultValue={payload?.azkarArabic}
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
                  defaultValue={payload?.azkarTurkish}
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
                  defaultValue={payload?.azkarUrdu}
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
                  defaultValue={payload?.azkarBangla}
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
                  defaultValue={payload?.azkarHindi}
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
                  defaultValue={payload?.azkarFrench}
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
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AzkarUpdateForm;
