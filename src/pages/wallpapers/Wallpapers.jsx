import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchLoader from "../../components/loaders/SearchLoader";
import UploadModal from "../../components/modals/UploadModal";
import WallpaperCards from "../../components/shared/cards/WallpaperCards";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import {
  addWallpaper,
  deleteWallpaper,
  fetchWallpapers,
} from "../../features/wallpapers/wallpaperSlice";
import { errorNotify, infoNotify } from "../../util/getNotify";
function Wallpaper() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [wallpaperName, setWallpaperName] = useState("");
  const [file, setFile] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();

  //data
  const wallpapers = useSelector((state) => state.wallpapers);
  const wallpapersData = wallpapers?.allWallpapers || [];
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    dispatch(fetchWallpapers());
  }, []);

  //actions
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setTypeError(false);
    } else {
      setFile("");
      setImagePreview("");
      setTypeError(true);
      fileRef.current.value = "";
    }
  };
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ wallpaperName }));
    formData.append("file", file);
    dispatch(addWallpaper(formData))
      .then((res) => {
        const objKey = Object.keys(res?.payload)[0];
        if (objKey === "error") {
          errorNotify("Something went wrong");
        } else {
          infoNotify("Successfully added");
          setFile("");
          setImagePreview("");
          setTypeError(true);
          setIsButtonDisabled(true);
          fileRef.current.value = "";
        }
      })
      .catch((error) => {
        errorNotify("Something went wrong");
      });
  };

  const handleFileDelete = () => {
    setImagePreview(null);
    setFile(null);
    setTypeError(false);
    fileRef.current.value = "";
  };
  const handleFileRemove = (id) => {
    dispatch(deleteWallpaper(id))
      .unwrap()
      .then((res) => {
        errorNotify("Successfully removed");
      })
      .catch((error) => {
        errorNotify("Something went wrong");
      });
  };

  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const sortByTime = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.wallpaperName
        ?.toLowerCase()
        .includes(searchValue?.toLowerCase());
    } else {
      return data;
    }
  };

  let content = null;

  if (wallpapers.isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!wallpapers.isLoading && wallpapers.isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (
    !wallpapers.isLoading &&
    !wallpapers.isError &&
    wallpapersData?.length === 0
  ) {
    content = <NoData></NoData>;
  } else if (
    !wallpapers.isLoading &&
    !wallpapers.isError &&
    wallpapersData?.length > 0
  ) {
    const newData = [...wallpapersData]
      .sort(sortByTime)
      ?.filter(filterBySearch);
    content = (
      <WallpaperCards
        data={newData}
        handler={handleFileRemove}
      ></WallpaperCards>
    );
  }

  useEffect(() => {
    if (wallpaperName && file) {
      setIsButtonDisabled(false);
    }
  }, [wallpaperName, file]);

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Wallpapers"
          path=""
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
          isWallpaperSearchBar={true}
          modalId={"uploadPopUp"}
        ></SearchBar>

        <div className="h-[calc(100%-75px)] overflow-auto flex flex-col justify-between flex-wrap">
          {content}
        </div>
      </div>
      <UploadModal
        modalClose={true}
        handleStatus={handleFileChange}
        file={file}
        imagePreview={imagePreview}
        handleFileDelete={handleFileDelete}
        fileRef={fileRef}
        handleWallPaperName={setWallpaperName}
        handleFileUpload={handleFileUpload}
        wallpaperName={wallpaperName}
      />
    </section>
  );
}

export default Wallpaper;
