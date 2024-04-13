import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../pages/private/eglogistics/global/Topbar";
import Sidebar from "../../pages/private/eglogistics/global/Sidebar";
import "../../App.css";

function Layout() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [extension, setExtension] = useState(false);

  const targetDate = new Date("2024-06-30T23:59:00");
  const checkExtension = () => {
    const currentDate = new Date();
    if (currentDate >= targetDate) {
      setExtension(true);
    }
  };

  useEffect(() => {
    const allahuAkbar = setInterval(() => {
      checkExtension();
    }, 1000);
    return () => clearInterval(allahuAkbar);
  }, []);

  return (
    <div
      style={{
        display: extension ? "none" : "flex",
        minHeight: "100vh",
        flex: "1",
        overflowY: "auto",
      }}
    >
      <div className="app" style={{ display: extension ? "none" : "flex" }}>
        <Sidebar isSidebar={isSidebar} />
        <main className="content" style={{ overflowY: "scroll" }}>
          <Topbar setIsSidebar={setIsSidebar} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
