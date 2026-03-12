import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Lock, UserRoundCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// IMAGES
import Logo from "../../assets/NewlistaLogo.webp";
import DummyLogo from "../../assets/fallback/UnknowUser.png";
// COMPONENTS
import Spinner from "../Spinner/Spinner";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useConfirmation } from "../../Screens/Admin/AccountSetting/Fields/Confirmation";

function TransparentNavbar() {

  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const status = localStorage.getItem("status");
  const isLocked = !token || status !== "active";
  const location = useLocation()

  // STATES 
  const [user, setUser] = useState([]);
  const [loading, setloading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpen, confirm, handleConfirm, handleCancel } = useConfirmation();


  const handleConfirmation = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      setloading(true);
      try {
        const response = await axios.post(
          `${ApiKey}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.removeItem("token");
        localStorage.removeItem("status");
        localStorage.removeItem("passwordResetSuccess");
        localStorage.removeItem("ProfileComplete");
        localStorage.removeItem("ForgetUser");
        navigate("/login");
      } catch (error) {
        setloading(false);
      } finally {
        setloading(false);
      }
    }
  };

  useEffect(() => {
    const FindUser = async () => {
      try {
        setloading(true);
        const response = await axios.get(`${ApiKey}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
      } finally {
        setloading(false);
      }
    };
    FindUser();
  }, []);

  const totalUnreadCount = useSelector(
    (state) => state.unread.totalUnreadCount
  );


  return (


    <header className={`relative z-10 ${location.pathname === '/' ? "bg-transparent" : "bg-black" }`}>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-3.5 md:px-12 lg:px-8"
      >
        {/* LOGO SECTION  */}
        <div className="flex lg:flex-1">
          <Link to={"/"} className="-m-1.5 p-1">
            <span className="sr-only">New Lista</span>
            <img alt="" src={Logo} className="h-18 sm:h-16 lg:h-18 w-[200px]" />
          </Link>
        </div>
        <div className="flex items-center md:gap-8 lg:gap-5 xl:gap-8 justify-between">
          {/* MENU ICON MOBILE  */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2 inline-flex items-center justify-center rounded-md p-3 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="size-7.5 md:size-8 font-bold"
              />
            </button>
          </div>
          {/* MAIN MENU SECTION  */}
          <PopoverGroup className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
            <Link
              to={"/about-us"}
              className="text-sm/6 lg:text-[14px] xl:text-sm/6 font-[500] text-textColor font-Inter hover:text-[#c4c4c4]"
            >
              About Us
            </Link>
            <Link
              to={"/pricing"}
              className="text-sm/6 lg:text-[14px] xl:text-sm/6 font-[500] text-textColor font-Inter hover:text-[#c4c4c4]"
            >
              Pricing
            </Link>

            <Link
              to={"/properties"}
              className="text-sm/6 lg:text-[14px] xl:text-sm/6 font-[500]  text-textColor  font-Inter hover:text-[#c4c4c4] "
            >
              Properties
            </Link>
            <Link
              to={token ? "/admin/network" : "/login"}
              className="text-sm/6 lg:text-[14px] xl:text-sm/6 font-[500]  text-textColor  font-Inter hover:text-[#c4c4c4] "
            >
              Networking
            </Link>
            <Link
              to={"/contact-us"}
              className="text-sm/6 lg:text-[14px] xl:text-sm/6 font-[500] text-textColor font-Inter hover:text-[#c4c4c4]"
            >
              Contact
            </Link>
          </PopoverGroup>
          {/* MAIN MENU SECTION  END  */}
          {/* BUTTONS  */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
            <div>
              <Link
                to={token ? "/create-property" : "/register"}
                className="text-sm/6 font-semibold text-gray-900"
              >
                <button className="hover-btn-yellow hover-btn text-black px-5 py-2 rounded-md font-Inter cursor-pointer">
                  <span>{token ? "Add a Property" : "Register"}</span>
                </button>
              </Link>
            </div>
            <div>
              <Link
                to={token ? "/admin" : "/login"}
                className="text-sm/6 font-semibold text-gray-900"
              >
                <button className="bg-transparent hover-btn-yellow hover-btn hover:border-black border-[1px] border-solid text-textColor border-textColor px-5 py-2 rounded-md cursor-pointer">
                  <span>{token ? "Dashboard" : "Log In"}</span>
                </button>
              </Link>
            </div>
          </div>
          {token && (
            <Menu as="div" className="relative ml-3">
              <MenuButton className="flex rounded-full overflow-hidden">
                <span className="sr-only">Open user menu</span>
                {loading ? (
                  <Spinner style={"w-5 h-12 text-PurpleColor z-50"} />
                ) : (
                  <>
                    <img
                      className="max-[380px]:w-10 max-[380px]:h-10 w-12.5 h-12.5 sm:h-12 sm:w-12 object-cover rounded-full cursor-pointer border-none"
                      src={
                        user?.headshot
                          ? import.meta.env.VITE_IMAGE_KEY + user.headshot
                          : DummyLogo
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DummyLogo;
                      }}
                    />
                    {!isLocked && totalUnreadCount > 0 && (
                      <div className="absolute text-red-600  -right-2 top-0">
                        <span
                          className={`text-white bg-red-500 text-[12px] font-Urbanist px-1.5 py-[1px] rounded-full flex items-center justify-center font-semibold min-w-[19px] h-[19px] `}
                          style={{ paddingTop: "1.5px" }}
                        >
                          {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 border-none w-48 text-[18px] font-[500] bg-[#fcfcfc] rounded-md shadow-lg font-Urbanist py-1 z-20 ring-0">
                <MenuItem className="cursor-not-allowed">
                  <div className="block px-4 py-2 text-sm text-gray-700">
                    {user
                    ? [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Guest"
                    : "loading.."}
                  </div>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={"/admin/account-setting"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={isLocked ? "#" : "/admin/inbox"}
                    className={`block px-4 py-2 text-[15px] text-gray-700 hover:bg-gray-100 ${isLocked && "cursor-not-allowed"
                      } relative flex justify-between items-center`}
                  >
                    {isLocked && (
                      <Lock
                        strokeWidth={2.5}
                        className="absolute text-red-600 size-2 right-7  sm:size-3 -mt-1 sm:mt-0 "
                      />
                    )}
                    Inbox
                    {!isLocked && totalUnreadCount > 0 && (
                      <div className="absolute text-red-600  right-7 top-2">
                        <span
                          className={`text-white bg-red-500 text-[12px] font-Urbanist px-1.5 py-[1px] rounded-full flex items-center justify-center font-semibold min-w-[19px] h-[19px] `}
                          style={{ paddingTop: "1.5px" }}
                        >
                          {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                        </span>
                      </div>
                    )}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleConfirmation}>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
        </div>
      </nav>

      {/* MOBILE DRAWER SECTION  */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-8 bg-black sm:px-6 sm:py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link className="-m-1.5 ">
              <img alt="" src={Logo} className="h-17 -ml-1.5 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5  text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-7 " />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* MAIN MENU SECTION START  */}
              <div className="space-y-2 pt-10 pb-4">
                {/* DROP DOWN MENU END  */}
                <Link
                  to={"/about-us"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-[500] text-[#e9e9e9]   font-Inter"
                >
                  About Us
                </Link>
                <Link
                  to={"/pricing"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-[500] text-[#e9e9e9]   font-Inter"
                >
                  Pricing
                </Link>

                <Link
                  to={"/properties"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-[500] text-[#e9e9e9]   font-Inter"
                >
                  Properties
                </Link>
                <Link
                  to={"/admin/network"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-[500] text-[#e9e9e9]   font-Inter"
                >
                  Networking
                </Link>
                <Link
                  to={"/contact-us"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-[500] text-[#e9e9e9]   font-Inter"
                >
                  Contact
                </Link>
              </div>
              {/* MAIN MENU SECTION START  */}

              <div className="py-4 border-t-[1px] border-[#e9e9e9]">
                <Link className="-mx-2  rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[#e9e9e9]   gap-4 flex flex-col">
                  <div>
                    <Link
                      to={token ? "/create-property" : "/register"}
                      className="text-sm/7 font-[500] text-gray-900"
                    >
                      <button className="bg-YellowColor px-5 py-2 text-[15px]  rounded-md font-Inter">
                        {token ? "Add a Property" : "Register"}
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={token ? "/admin" : "/login"}
                      className="text-sm/6 font-[500] text-gray-900"
                    >
                      <button className="bg-transparent border-[1px] border-solid text-white border-white px-5 py-2 rounded-md font-Inter">
                        {token ? "Dashboard" : "Log In"}
                      </button>
                    </Link>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        message="Do you want to Logout?"
        confirmLabel="Yes, Logout"
        icon={
          <UserRoundCheck className="size-20 text-PurpleColor  bg-amber-50 PurpleColor px-3.5 py-3.5 rounded-full" />
        }
        style="bg-PurpleColor"
      />
    </header>
  );
}

export default TransparentNavbar;
