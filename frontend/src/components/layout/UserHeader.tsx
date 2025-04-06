import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/button";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../types/redux";
import { mainMenu, mainMenuRestaurantManager } from "../../constants/menu";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import userPlaceholder from "../../assets/userPlaceholder.png";
import { AiOutlineShoppingCart } from "react-icons/ai";

const UserHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, user } = useSelector((root: IRootReducer) => root.auth);
  const cart = useSelector((state) => state.cart.cart);

  // const { user: userData } = useSelector((state) => state.cart.auth);

  const isAuthorized = !!accessToken;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleCart = () => {
    navigate("cart");
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-semibold">SnackRush</h1>
        <div className="flex items-center gap-10">
          {user ? mainMenu?.map((item, index: number) => {
            const isActive = location?.pathname === item.link;
            return (
              <NavLink
                to={item.link}
                key={index}
                className={`text-sm text-slate-700 font-semibold ${isActive && "border-b border-purple-500"
                  }`}
              >
                {item.title}
              </NavLink>
            );
          }) : mainMenuRestaurantManager?.map((item, index: number) => {
            const isActive = location?.pathname === item.link;
            return (
              <NavLink
                to={item.link}
                key={index}
                className={`text-sm text-slate-700 font-semibold ${isActive && "border-b border-purple-500"
                  }`}
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>

        {/* Shopping Cart */}
        <Menu as="div" className="relative" onClick={() => handleCart()}>
          <MenuButton className="relative flex items-center">
            <AiOutlineShoppingCart className="text-2xl text-gray-700" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md py-2 z-50">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <MenuItem key={index}>
                  <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700">
                    <span>{item.name}</span>
                    <button
                      // onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <p className="text-center text-gray-500 px-4 py-2">Cart is empty</p>
              </MenuItem>
            )}
          </MenuItems>
        </Menu>

        <div>
          {isAuthorized ? (
            <>
              <div className="flex items-center gap-3">
                {/* User Profile */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user?.image || userPlaceholder}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Orders
                      </a>
                    </MenuItem>
                    {user?._id && <MenuItem>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Your Profile
                      </a>
                    </MenuItem>}
                    <MenuItem>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Logout
                      </button>
                    </MenuItem>
                    <div>
                      {
                        user?.restaurant?.map((item) => {
                          return (
                            <MenuItem>
                              <button
                                type="button"
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                              >
                                {item.name}
                              </button>
                            </MenuItem>
                          )
                        })
                      }
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </>
          ) : (
            // Dropdown for Login/Signup options
            <Menu as="div" className="relative">
              <MenuButton className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none">
                Sign In
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md py-2 z-50">
                <MenuItem>
                  <button
                    onClick={() => navigate("/login")}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Login as Admin
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => navigate("/restaurantlogin")}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Login as Restaurant Manager
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => navigate("/register")}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign Up
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
        </div>
      </nav>
    </>
  );
};

export default UserHeader;
