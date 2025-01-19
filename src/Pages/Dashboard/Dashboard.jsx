import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaProductHunt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { Helmet } from "react-helmet-async";
import { AiFillMedicineBox } from "react-icons/ai";



const Dashboard = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-11/12 max-w-[1440px] ">
    <Helmet>
        <title>Dashboard | Home</title>
    </Helmet>
    <div className="flex ">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 md:hidden bg-gray-800 text-white"
      >
        <FaBars />
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800  text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 `}
      >
        <div className="p-5 text-center text-xl font-bold">
          <h1>Dashboard</h1>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col text-sm space-y-4 p-5">
            {/* home  */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaHome className="mr-3" /> Home
            </NavLink>
            {/* Manage Medicines */}
            <NavLink
              to="/dashboard/manage-medicines"
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <AiFillMedicineBox className="mr-3" /> Manage Medicines
            </NavLink>
            {/* Manage Products */}
            <NavLink
              to="/dashboard/products"
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaProductHunt className="mr-3" /> Manage Products
            </NavLink>
            {/* Banner Advertise */}
            <NavLink
              to="/dashboard/advertise"
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <RiAdvertisementFill className="mr-3" /> Banner Advertise
            </NavLink>

            {/* user  */}
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaUser className="mr-3" /> Users
            </NavLink>
            {/* profile  */}
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaUser className="mr-3" /> Profile
            </NavLink>
            {/* logout  */}
            <NavLink
              onClick={handleLogOut}
              to="/dashboard/logout"
              className={({ isActive }) =>
                `flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </NavLink>

        </nav>
      </aside>
      {/* Dynamic Content */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
