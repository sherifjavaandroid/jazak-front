import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SearchLoader from "../../components/loaders/SearchLoader";
import BackToPrev from "../../components/shared/back/BackToPrev";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { updateHadith } from "../../features/hadith/hadithSlice";
import { fetchAllHadithCategory } from "../../features/hadithCategories/hadithCategoriesSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";
function HadithUpdateForm() {
  const dispatch = useDispatch();
  const { isRequestLoading } = useSelector((state) => state.hadith);
  const { allHadithCategory, isLoading, isError } = useSelector(
    (state) => state.hadithCategories
  );
  const navigate = useNavigate();
  const [category_id, setCategoryId] = useState("");
  const { state } = useLocation();
  const { payload } = state || {};

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const narratedBy = form.narratedBy.value;
    const referenceBook = form.referenceBook.value;
    const hadithArabic = form.hadithArabic.value;
    const hadithEnglish = form.hadithEnglish.value;
    const hadithTurkish = form.hadithTurkish.value;
    const hadithUrdu = form.hadithUrdu.value;
    const hadithBangla = form.hadithBangla.value;
    const hadithHindi = form.hadithHindi.value;
    const hadithFrench = form.hadithFrench.value;

    const isComplete =
      narratedBy &&
      referenceBook &&
      hadithArabic &&
      hadithEnglish &&
      hadithTurkish &&
      hadithUrdu &&
      hadithBangla &&
      hadithHindi &&
      hadithFrench &&
      category_id;

    if (!isComplete) {
      errorNotify("Incomplete Input");
      return;
    } else {
      const data = {
        narratedBy,
        referenceBook,
        hadithArabic,
        hadithEnglish,
        hadithTurkish,
        hadithUrdu,
        hadithBangla,
        hadithHindi,
        hadithFrench,
        category_id,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      dispatch(updateHadith({ data: formData, id: payload?._id }))
        .unwrap()
        .then((res) => {
          const objKey = Object.keys(res)[0];
          if (objKey === "error") {
            errorNotify("Something went wrong");
          } else {
            navigate("/hadith");
            infoNotify("Successfully updated");
          }
        });
    }
  };

  useEffect(() => {
    if (allHadithCategory?.length === 0) {
      dispatch(fetchAllHadithCategory());
    }
  }, []);

  useEffect(() => {
    setCategoryId(payload?.category_id);
  }, [payload?.category_id]);
  return isLoading ? (
    <SearchLoader></SearchLoader>
  ) : isError ? (
    <SomethingWrong></SomethingWrong>
  ) : (
    <section className="w-full h-full px-8 py-6">
      <BackToPrev path="/hadith" title={`Back`}></BackToPrev>

      <div className="bg-white p-6 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div>
            {/* narrated by and reference */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Narrated By
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter author name"
                  required
                  name="narratedBy"
                  defaultValue={payload?.narratedBy}
                />
              </div>
              {/* Reference Book */}
              <div className="w-full flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Reference Book
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter reference book"
                  required
                  name="referenceBook"
                  defaultValue={payload?.referenceBook}
                />
              </div>
              {/* category */}
              <div className="w-full mb-8 col-span-2">
                <div className="flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Category
                  </span>
                  <Select
                    className="font-poppins border border-neutralColorTwoHundread rounded-lg outline-none adSetting w-2/4"
                    value={category_id}
                    onChange={(e) => setCategoryId(e)}
                    aria-required
                    name="category_id"
                  >
                    {allHadithCategory?.map((category, idx) => {
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

            {/* hadith in arabic */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Arabic
              </span>
              <textarea
                type="text"
                className="font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                placeholder="Enter hadith in arabic"
                required
                name="hadithArabic"
                defaultValue={payload?.hadithArabic}
              ></textarea>
            </div>
            {/* hadith in english */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in English
              </span>
              <textarea
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none text-black"
                placeholder="Enter hadith in english"
                required
                name="hadithEnglish"
                defaultValue={payload?.hadithEnglish}
              ></textarea>
            </div>

            {/* hadith in Turkish */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Turkish
              </span>
              <textarea
                type="text"
                className="font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                placeholder="Enter hadith in turkish"
                required
                name="hadithTurkish"
                defaultValue={payload?.hadithTurkish}
              ></textarea>
            </div>
            {/* hadith in Urdu */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Urdu
              </span>
              <textarea
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none text-black"
                placeholder="Enter hadith in urdu"
                required
                name="hadithUrdu"
                defaultValue={payload?.hadithUrdu}
              ></textarea>
            </div>
            {/* hadith in Bangla */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Bangla
              </span>
              <textarea
                type="text"
                className="font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                placeholder="Enter hadith in bangla"
                required
                name="hadithBangla"
                defaultValue={payload?.hadithBangla}
              ></textarea>
            </div>
            {/* hadith in Hindi */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in Hindi
              </span>
              <textarea
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none text-black"
                placeholder="Enter hadith in hindi"
                required
                name="hadithHindi"
                defaultValue={payload?.hadithHindi}
              ></textarea>
            </div>
            {/* hadith in French */}
            <div className="flex-1 flex flex-col gap-1 mb-8 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Hadith in French
              </span>
              <textarea
                type="text"
                className="font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] h-[89px] resize-none"
                placeholder="Enter hadith in french"
                required
                name="hadithFrench"
                defaultValue={payload?.hadithFrench}
              ></textarea>
            </div>
          </div>
          {/* submit button  */}
          {/* button components - index.css */}
          <div className="mt-6">
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
    </section>
  );
}

export default HadithUpdateForm;
