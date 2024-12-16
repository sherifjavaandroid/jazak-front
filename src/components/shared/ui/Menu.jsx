import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = ({
  handleMenu,
  svg,
  menutitle,
  showSidebar,
  menuitem,
  submenuRef,
  isSubmenuOpen,
  isArrowUp,
  menulist,
  navitem,
  activePath,
  handleLocalstore,
}) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  return (
    <div className="w-full  overflow-hidden capitalize select-none">
      <div
        onClick={handleMenu}
        className={`navlink  ${
          navitem === menuitem ? "active" : "text-[#474747]"
        } 
              font-poppins flex items-stretch gap-4 w-full p-4 cursor-pointer font-normal text-base `}
      >
        <span className="h-[24px] shrink-0 ">{svg}</span>
        <span
          className={` ${
            !showSidebar ? "hidden" : "block"
          } shrink-0  origin-left duration-200 flex justify-between items-center w-full`}
        >
          {menutitle}
        </span>
      </div>
      {/* nested submenu */}
      {showSidebar && (
        <ul
          ref={(ref) => (submenuRef.current[`${menuitem}`] = ref)}
          className={`flex flex-col gap-1 duration-300 dropdown-menu pl-10`}
          style={{
            maxHeight: isSubmenuOpen[`${menuitem}`]
              ? `${submenuRef.current[`${menuitem}`]?.scrollHeight}px`
              : "0",
          }}
        >
          {/* users  */}

          {menulist.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`nested ${
                    activePath == item?.path.split("/")[1]
                      ? "text-[#75BFC0]"
                      : "text-[#474747]"
                  } font-poppins flex items-center gap-4 w-full p-4 cursor-pointer `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocalstore(`${item?.path.split("/")[1]}`);
                  }}
                >
                  <span
                    className={` ${
                      showSidebar ? "block" : "hidden"
                    } origin-left  duration-300 font-poppins font-normal shrink-0`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Menu;
