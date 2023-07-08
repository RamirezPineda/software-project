import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

function MainContent() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Sidebar />

      {/* <main className="
        xl:pl-[270px] xl:pr-[35px] py-5 px-4 min-h-screen grid justify-center items-center
      "> */}
      <main className="
        xl:pl-[270px] xl:pr-[35px] py-5 px-4 min-h-screen flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}

export default MainContent;
