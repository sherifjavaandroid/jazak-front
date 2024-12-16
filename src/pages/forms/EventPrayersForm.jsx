import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import SearchLoader from "../../components/loaders/SearchLoader";
import {
  postEventPrayers,
  updateEventPrayers,
} from "../../features/eventPrayers/eventPrayersSlice";
import { fetchAllEventPrayersCategory } from "../../features/eventPrayersCategories/eventPrayersCategoriesSlice";
import { toast } from "react-toastify";

const EventPrayersForm = () => {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.eventPrayersCategories);
  const categoriesData = categories?.allCategory;

  const [myEvents, setEvents] = useState({
    eventPrayerArabic: payload?.eventPrayerArabic || "",
    eventPrayerEnglish: payload?.eventPrayerEnglish || "",
    categoryArabic: payload?.categoryArabic || "",
    categoryEnglish: payload?.categoryEnglish || "",
  });

  const [defaultCategory, setDefaultCategory] = useState(
    payload?.categoryEnglish || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  //load category
  useEffect(() => {
    if (categoriesData.length > 0 && !categories.isLoading) {
      setDefaultCategory(
        payload?.categoryEnglish || categoriesData[0]?.categoryEnglish
      );
      setIsLoading(false);
      setEvents((prevState) => ({
        ...prevState,
        categoryArabic:
          payload?.categoryArabic || categoriesData[0]?.categoryArabic,
        categoryEnglish:
          payload?.categoryEnglish || categoriesData[0]?.categoryEnglish,
      }));
    } else {
      setIsLoading(false);
    }
  }, [categories.isLoading, categoriesData]);

  useEffect(() => {
    if (window.location.pathname === "/event-prayers-edit" && !payload) {
      navigate("/event-prayers");
    }
  }, [payload, navigate]);

  // load all the categories
  useEffect(() => {
    dispatch(fetchAllEventPrayersCategory());
  }, []);

  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled =
      myEvents.eventPrayerArabic && myEvents.eventPrayerEnglish;

    // Enable or disable the button based on the condition
    setIsButtonDisabled(!allFieldsFilled);
  }, [myEvents]);

  //notify

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
  //post
  const handleAddEvents = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    dispatch(postEventPrayers({ eventPrayersData: myEvents }))
      .unwrap()
      .then((originalPromiseResult) => {
        setIsLoading(false);
        setIsButtonDisabled(false);
        navigate("/event-prayers");
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  //handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    const isDataUpdated = Object.keys(myEvents).some(
      (key) => myEvents[key] !== payload[key]
    );

    if (isDataUpdated) {
      const editedFields = {};

      // Compare each field with its original value and store the edited ones
      Object.keys(myEvents).forEach((key) => {
        const newValue = myEvents[key].trim(); // Remove leading/trailing spaces
        if (newValue !== payload[key] && newValue !== "") {
          editedFields[key] = newValue;
        }
      });

      dispatch(updateEventPrayers({ data: editedFields, id: payload._id }))
        .unwrap()
        .then((originalPromiseResult) => {
          setIsLoading(false);
          setIsButtonDisabled(false);
          navigate("/event-prayers");
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
    } else {
      notify();
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };
  //category
  const handleCategory = (id) => {
    // find category
    const category = categoriesData.find((item) => item._id == id);
    // update state
    setEvents((prevState) => ({
      ...prevState,
      categoryArabic: category.categoryArabic,
      categoryEnglish: category.categoryEnglish,
    }));
  };

  return categories.isLoading ? (
    <SearchLoader></SearchLoader>
  ) : (
    <section className="py-6 px-8">
      <div>
        <BackToPrev path="/event-prayers" title={`Back`}></BackToPrev>

        <div className="bg-white p-6 rounded-2xl">
          <form action="">
            <div className="">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Name(English) */}
                <div className="flex-1 flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Name(English)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Enter prayer in english"
                    defaultValue={myEvents.eventPrayerEnglish}
                    required
                    onChange={(e) =>
                      setEvents((prevState) => ({
                        ...prevState,
                        eventPrayerEnglish: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* Name(Arabic)*/}
                <div className="w-full flex flex-col gap-1 ">
                  <span className="text-base font-poppins font-bold text-blackMediumEmp">
                    Name(Arabic)
                  </span>
                  <input
                    type="text"
                    className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                    placeholder="Enter prayer in arabic"
                    defaultValue={myEvents?.eventPrayerArabic}
                    required
                    onChange={(e) =>
                      setEvents((prevState) => ({
                        ...prevState,
                        eventPrayerArabic: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* topic */}
                <div className="w-full ">
                  <div className="flex flex-col gap-1 ">
                    <span className="text-base font-poppins font-bold text-blackMediumEmp">
                      Topic
                    </span>
                    {categoriesData && (
                      <Select
                        className="font-poppins border border-neutralColorTwoHundread rounded-lg outline-none adSetting w-2/4"
                        defaultValue={defaultCategory}
                        onChange={(e) => handleCategory(e)}
                        aria-required
                      >
                        {categoriesData?.map((category, idx) => {
                          return (
                            <Select.Option
                              key={idx}
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
              </div>
            </div>
            {/* submit button  */}
            {/* button components - index.css */}
            <div>
              {type === "edit" ? (
                <button
                  className={`btn-main`}
                  disabled={isButtonDisabled}
                  onClick={handleUpdate}
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
                  disabled={isButtonDisabled}
                  onClick={handleAddEvents}
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
};

export default EventPrayersForm;
