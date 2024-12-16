import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/navbar/Navbar";
import Sidebar from "../components/shared/sidebar/Sidebar";

function Layout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="bg-backgroundPrimary h-screen w-full overflow-hidden">
      <div className="flex items-start h-full">
        <div className="h-full">
          <Sidebar showSidebar={showSidebar} toggleSidebar={setShowSidebar} ></Sidebar>
        </div>
        <div className="h-full flex-1 w-full overflow-hidden">
          <Navbar toggleSidebar={setShowSidebar}></Navbar>
          <div className="h-[calc(100%-90px)] overflow-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
