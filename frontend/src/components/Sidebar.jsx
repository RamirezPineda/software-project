import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import {
  RiMenuFill,
  RiCloseLine,
  RiLogoutCircleLine,
  RiUserLine,
  RiAddLine,
} from "react-icons/ri";
import { resetUser } from "../redux/states/user.state";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    // console.log("click");
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 w-3/4 xl:left-0 md:w-64 h-full bg-[#1E1F25]  p-8 flex flex-col justify-between z-50 transition-all 
        ${showMenu ? "left-0" : "-left-full"}`}
      >
        {/* Navegacion  */}
        <div>
          <h1 className="text-2xl text-center text-white uppercase font-bold mb-2">
            Software Project
          </h1>
          <p className="text-gray-400 text-center mb-8">User: {user.email}</p>
          <ul>
            <li>
              <NavLink
                to="/private/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#131517] "
                    : "flex items-center mb-1 gap-4 hover:bg-[#131517] transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiAddLine />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/private/users"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#131517] "
                    : "flex items-center mb-1 gap-4 hover:bg-[#131517] transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiUserLine />
                Users
              </NavLink>
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            dispatch(resetUser());
            navigate("/login", { replace: true });
          }}
          className="flex items-center gap-2 hover:bg-[#131517] transition-colors py-2 px-4 rounded-lg"
        >
          <RiLogoutCircleLine />
          <div>
            <h5 className="font-medium">Cerrar sesión</h5>
          </div>
        </button>
      </div>

      {/* Btn menu movil */}
      <button
        onClick={toggleMenu}
        className="xl:hidden fixed bottom-6 right-6 bg-[#131517] ring-1 ring-white  p-4 rounded-full"
      >
        {showMenu ? <RiCloseLine /> : <RiMenuFill />}
      </button>
    </>
  );
}

export default Sidebar;
