import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { postAzkarCategory } from "../../features/azkarCategories/AzkarCategoriesSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";

function AzkarCategoriesForm() {
  const { isRequestLoading } = useSelector((state) => state.azkarCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const categoryEnglish = form.categoryEnglish.value;
    const categoryArabic = form.categoryArabic.value;
    const categoryTurkish = form.categoryTurkish.value;
    const categoryUrdu = form.categoryUrdu.value;
    const categoryBangla = form.categoryBangla.value;
    const categoryHindi = form.categoryHindi.value;
    const categoryFrench = form.categoryFrench.value;

    const isComplete =
      categoryEnglish &&
      categoryArabic &&
      categoryTurkish &&
      categoryUrdu &&
      categoryBangla &&
      categoryHindi &&
      categoryFrench;

    if (!isComplete) {
      errorNotify("Incomplete Input");
    } else {
      const data = {
        categoryEnglish,
        categoryArabic,
        categoryTurkish,
        categoryUrdu,
        categoryBangla,
        categoryHindi,
        categoryFrench,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      dispatch(postAzkarCategory(formData))
        .unwrap()
        .then((res) => {
          const objKey = Object.keys(res)[0];
          if (objKey === "error") {
            errorNotify("Something went wrong");
          } else {
            navigate("/azkar-categories");
            infoNotify("Successfully added");
          }
        })
        .catch((error) => {
          errorNotify("Something went wrong");
        });
    }
  };
  return (
    <section className="py-6 px-8">
      <div>
        <BackToPrev path="/azkar-categories" title={`Back`}></BackToPrev>
        <div className="bg-white p-6 rounded-2xl">
          <form action="" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* english  */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (English)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in english"
                  name="categoryEnglish"
                  required
                />
              </div>
              {/* arabic  */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Arabic)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in arabic"
                  name="categoryArabic"
                  required
                />
              </div>
              {/* turkish  */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Turkish)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in turkish"
                  name="categoryTurkish"
                  required
                />
              </div>
              {/* urdu  */}

              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Urdu)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in urdu"
                  name="categoryUrdu"
                  required
                />
              </div>
              {/* bangla  */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Bangla)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in bangla"
                  name="categoryBangla"
                  required
                />
              </div>
              {/* hindi  */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (Hindi)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in hindi"
                  name="categoryHindi"
                  required
                />
              </div>
              {/* french  */}
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name (French)
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter category in french"
                  name="categoryFrench"
                  required
                />
              </div>
            </div>

            {/* submit button  */}
            {/* button components - index.css */}
            <div className="mt-8">
              <button className={`btn-main`} disabled={isRequestLoading}>
                {isRequestLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AzkarCategoriesForm;
