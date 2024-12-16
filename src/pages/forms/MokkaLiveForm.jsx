import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { fetchLink, postLink } from "../../features/mokka/mokkaSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";

function MokkaLifeForm() {
  const dispatch = useDispatch();
  const { link, isRequestLoading, isLoading, isError } = useSelector(
    (state) => state.mokka
  );
  const [liveLink, setLiveLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!liveLink) {
      errorNotify("Incomplete input");
      return;
    } else {
      const form = event.target;
      const mylink = liveLink;
      dispatch(postLink({ data: { live_link: mylink } }))
        .unwrap()
        .then((res) => {
          const objKey = Object.keys(res)[0];
          if (objKey === "error") {
            errorNotify("Something went wrong");
          } else {
            const status = link?.id
              ? "Successfully update Link"
              : "Successfully add Link";
            infoNotify(status);
          }
        })
        .catch((error) => {
          const status = link?.id
            ? "Failed to update Link"
            : "Failed to aadd Link";
          errorNotify(status);
        });
    }
  };

  useEffect(() => {
    if (!link?.id) {
      dispatch(fetchLink());
    }
  }, []);

  useEffect(() => {
    if (link?.id) {
      setLiveLink(link?.live_link);
    }
  }, [link?.id]);

  return isLoading ? (
    <SearchLoader></SearchLoader>
  ) : isError ? (
    <SomethingWrong></SomethingWrong>
  ) : (
    <section className="w-full h-full px-8 py-6">
      <div className="bg-white h-[calc(100%-50px)] p-6 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div>
            {/* narrated by and reference */}
            <div className="w-full">
              <div className="flex-1 flex flex-col gap-1 ">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Live Link
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                  placeholder="Enter your link"
                  required
                  name="livelink"
                  value={liveLink}
                  onChange={(e) => setLiveLink(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* submit button  */}
          {/* button components - index.css */}
          <div className="mt-6">
            <button
              className={`btn-main disabled:cursor-default`}
              disabled={isRequestLoading}
            >
              {isRequestLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : link.id ? (
                "Update"
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MokkaLifeForm;
