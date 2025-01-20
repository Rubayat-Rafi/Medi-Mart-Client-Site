import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { IoLanguage } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
    </>
  );

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-base-100 shadow-lg">
      <nav className="navbar mx-auto max-w-[1440px]">
        <div className="flex-1">
          <Link to="/">
            <a className=" text-xl font-bold text-primaryTextColor">MediMart</a>
          </Link>
        </div>
        <div className="flex-none">
          {user === null && (
            <ul className="menu menu-horizontal px-1">{links}</ul>
          )}
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-mainColor py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white">
              Lan
              <IoLanguage />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom"
              className="w-16 mt-2 origin-top-right rounded-xl border border-black bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button className="group  flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  Eng
                </button>
              </MenuItem>

              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                  Ban
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>

          {/* join us button  */}
          {/* cart icon dropdown */}
          {/*user image icon dropdown */}
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-36 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">0 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                      <Link to='/dashboard/cart-page' className="py-1 w-full text-center text-white rounded-lg bg-mainColor ">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
                >
                  {links}
                  <li>
                    <NavLink to={`/dashboard`}>Dashboard</NavLink>
                  </li>
                  <li>
                    <a>Update Profile</a>
                  </li>
                  <li className="bg-mainColor text-center w-full hover:bg-secondBgColor rounded-md text-white  mt-0.5">
                    <a onClick={handleLogOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/join-us">
              <Button className=" mx-2 rounded-md bg-mainColor py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white">
                Join US
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
