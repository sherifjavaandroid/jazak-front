import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/loaders/SearchLoader";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { addZakat, fetchZakat } from "../../features/zakat/zakatSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";

function Zakat() {
  const { isLoading, isError, allZakat, isRequestLoading } = useSelector(
    (state) => state.zakat
  );
  const dispatch = useDispatch();
  const [USD, setUSD] = useState("");
  const [BDT, setBDT] = useState("");
  const [INR, setINR] = useState("");
  const [PKR, setPKR] = useState("");
  const [IDR, setIDR] = useState("");
  const [TRY, setTRY] = useState("");
  const [MYR, setMYR] = useState("");
  const [SAR, setSAR] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!USD || !BDT || !INR || !PKR || !IDR || !TRY || !MYR || !SAR) {
      errorNotify("Incomplete input");
      return;
    } else {
      const data = {
        USD,
        BDT,
        INR,
        PKR,
        IDR,
        TRY,
        MYR,
        SAR,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      dispatch(addZakat(formData))
        .unwrap()
        .then((res) => {
          const objKey = Object.keys(res)[0];
          if (objKey === "error") {
            errorNotify("Something went wrong");
          } else {
            const status = allZakat?.id
              ? "Successfully updated"
              : "Successfully added";
            infoNotify(status);
          }
        })
        .catch((error) => {
          errorNotify("Something went wrong");
        });
    }
  };

  const handleInput = (event, setState) => {
    let value = event.target.value.replace(/[^\d.]/g, ""); // Allow digits and a single dot
    const dotIndex = value.indexOf(".");
    if (dotIndex !== -1) {
      value =
        value.slice(0, dotIndex + 1) +
        value.slice(dotIndex + 1).replace(/\./g, "");
    }
    setState(value);
  };

  useEffect(() => {
    if (!allZakat?.id) {
      dispatch(fetchZakat());
    }
  }, []);

  useEffect(() => {
    if (allZakat?.id) {
      setUSD(allZakat?.USD);
      setBDT(allZakat?.BDT);
      setINR(allZakat?.INR);
      setPKR(allZakat?.PKR);
      setIDR(allZakat?.IDR);
      setTRY(allZakat?.TRY);
      setMYR(allZakat?.MYR);
      setSAR(allZakat?.SAR);
    }
  }, [allZakat?.id]);

  return isLoading ? (
    <SearchLoader></SearchLoader>
  ) : isError ? (
    <SomethingWrong></SomethingWrong>
  ) : (
    <section className="h-full w-full p-6 overflow-auto">
      <div className="w-full bg-white  rounded-2xl">
        <div className="mb-6 bg-maincolor p-4 rounded-t-2xl">
          <h2 className="text-white text-lg sm:text-xl font-bold">
            Set Nisab Amount
          </h2>
          <p className="text-white text-sm">
            Set the nisab amount in all currency
          </p>
        </div>
        <form action="" onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-6 ">
            {/* BDT  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Bangladesh (BDT)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="BDT"
                value={BDT}
                onChange={(e) => handleInput(e, setBDT)}
                required
              />
            </div>
            {/* USD  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                United States of America (USD)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="USD"
                value={USD}
                onChange={(e) => handleInput(e, setUSD)}
                required
              />
            </div>
            {/* INR  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                India (INR)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="INR"
                value={INR}
                onChange={(e) => handleInput(e, setINR)}
                required
              />
            </div>
            {/* PKR  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Pakistan (PKR)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="PKR"
                value={PKR}
                onChange={(e) => handleInput(e, setPKR)}
                required
              />
            </div>
            {/* IDR  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Indonesia (IDR)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="IDR"
                value={IDR}
                onChange={(e) => handleInput(e, setIDR)}
                required
              />
            </div>
            {/* TRY  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Turkey (TRY)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="TRY"
                value={TRY}
                onChange={(e) => handleInput(e, setTRY)}
                required
              />
            </div>
            {/* MYR  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Malaysia (MYR)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="MYR"
                value={MYR}
                onChange={(e) => handleInput(e, setMYR)}
                required
              />
            </div>
            {/* SAR  */}
            <div className="w-full flex flex-col gap-1 ">
              <span className="text-base font-poppins font-bold text-blackMediumEmp">
                Saudi Arabia (SAR)
              </span>
              <input
                type="text"
                className=" font-poppins p-4 border border-neutralColorTwoHundread rounded-lg outline-none leading-[19.5px]"
                placeholder="Enter zakat amount"
                name="SAR"
                value={SAR}
                onChange={(e) => handleInput(e, setSAR)}
                required
              />
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="btn-main"
              disabled={isRequestLoading}
            >
              {isRequestLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <span>{allZakat?.id ? "Update" : "Add Zakat"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Zakat;
