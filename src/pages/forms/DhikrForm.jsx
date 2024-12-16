import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackToPrev from "../../components/shared/back/BackToPrev";
import { postDhikr, updateDhikr } from "../../features/dhikr/dhikrSlice";

function DhikrForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [myDhikr, setMyDhikr] = useState({
    dhikrArabic: payload?.dhikrArabic || "",
    dhikrEnglish: payload?.dhikrEnglish || "",
    dhikrTurkish: payload?.dhikrTurkish || "",
    dhikrUrdu: payload?.dhikrUrdu || "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Check if the current location is /dhikr-edit and there's no payload in the URL
    if (window.location.pathname === "/dhikr-edit" && !payload) {
      navigate("/dhikr");
    }
  }, [payload, navigate]);

  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled =
      myDhikr?.dhikrArabic &&
      myDhikr?.dhikrEnglish &&
      myDhikr?.dhikrTurkish &&
      myDhikr?.dhikrUrdu;
    // Enable or disable the button based on the condition
    setIsButtonDisabled(!allFieldsFilled);
  }, [myDhikr]);

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

  const handleAdddhikr = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);

    dispatch(postDhikr({ dhikrData: myDhikr }))
      .unwrap()
      .then((originalPromiseResult) => {
        setIsLoading(false);
        setIsButtonDisabled(false);
        navigate("/dhikr");
      })
      .catch((rejectedValueOrSerializedError) => {
        setIsLoading(false);
        setIsButtonDisabled(false);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true);
    const isDataUpdated = Object.keys(myDhikr).some(
      (key) => myDhikr[key] !== payload[key]
    );
    if (isDataUpdated) {
      const editedFields = {};
      // Compare each field with its original value and store the edited ones
      Object.keys(myDhikr).forEach((key) => {
        const newValue = myDhikr[key].trim(); // Remove leading/trailing spaces
        if (newValue !== payload[key] && newValue !== "") {
          editedFields[key] = newValue;
        }
      });

      dispatch(updateDhikr({ data: editedFields, id: payload._id }))
        .unwrap()
        .then((originalPromiseResult) => {
          setIsLoading(false);
          setIsButtonDisabled(false);
          navigate("/dhikr");
        })
        .catch((rejectedValueOrSerializedError) => {
          setIsLoading(false);
          setIsButtonDisabled(false);
        });
    } else {
      notify();
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <section className="py-6 px-8">
      <div>
        <BackToPrev path="/dhikr" title={`Back`}></BackToPrev>
        <div className="bg-white p-6 rounded-2xl ">
          <form action="">
            <div className="grid md:grid-cols-2 gap-x-8">
              {/* dhikr english */}
              <div className="flex-1 flex flex-col gap-y-1 text-blackHigh mb-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name English
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] "
                  placeholder="Enter dhikr in english"
                  required
                  defaultValue={payload?.dhikrEnglish}
                  onChange={(e) =>
                    setMyDhikr((prev) => ({
                      ...prev,
                      dhikrEnglish: e.target.value,
                    }))
                  }
                />
              </div>

              {/* dhikr arabic */}
              <div className="flex-1 flex flex-col gap-1 text-blackHigh mb-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name Arabic
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] "
                  placeholder="Enter dhikr in arabic"
                  required
                  defaultValue={payload?.dhikrArabic}
                  onChange={(e) =>
                    setMyDhikr((prev) => ({
                      ...prev,
                      dhikrArabic: e.target.value,
                    }))
                  }
                />
              </div>
              {/* dhikr turkish */}
              <div className="flex-1 flex flex-col gap-y-1 text-blackHigh mb-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name Turkish
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] "
                  placeholder="Enter dhikr in turkish"
                  required
                  defaultValue={payload?.dhikrTurkish}
                  onChange={(e) =>
                    setMyDhikr((prev) => ({
                      ...prev,
                      dhikrTurkish: e.target.value,
                    }))
                  }
                />
              </div>

              {/* dhikr urdo */}
              <div className="flex-1 flex flex-col gap-1 text-blackHigh mb-8">
                <span className="text-base font-poppins font-bold text-blackMediumEmp">
                  Name Urdu
                </span>
                <input
                  type="text"
                  className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px] "
                  placeholder="Enter dhikr in urdu"
                  required
                  defaultValue={payload?.dhikrUrdu}
                  onChange={(e) =>
                    setMyDhikr((prev) => ({
                      ...prev,
                      dhikrUrdu: e.target.value,
                    }))
                  }
                />
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
                  onClick={handleAdddhikr}
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

export default DhikrForm;
