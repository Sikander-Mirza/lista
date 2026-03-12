import { Link } from "react-router-dom";
// IMAGES
import WhiteLogo from "../../assets/NewlistaLogo.png";
import FooterIcon from "../../assets/Icons/FooterIcon.png";
import FooterIcon2 from "../../assets/Icons/FooterIcon2.png";

const Footer = () => {
  return (
    <footer>
      {/* Footer Section START  */}
      <div className="">
        <div className="flex flex-col justify-center items-center bg-[#0F0F0F]">
          <div className="py-12 max-[400px]:px-6 px-10 lg:flex lg:justify-between bg-[#0F0F0F] sm:px-10 md:px-14 lg:px-20 lg:py-20 gap-10 w-full xl:w-[92%] 2xl:w-[80%] min-[1780px]:!w-[70%]">
            {/* SECTION 1  */}
            <div className="mb-6 md:mb-0 flex flex-col gap-10 lg:w-[35%] ">
              <div>
                <Link to={"/"} className="flex items-center">
                  <img
                    src={WhiteLogo}
                    className="h-[65px] sm:h-[80px] me-3"
                    alt="FlowBite Logo"
                  />
                </Link>
              </div>

              <form className="w-[100%] bg-[#262626] rounded-lg  py-0.5 border-[1px] border-solid border-[#5f5f5f] sm:w-[80%] md:w-[55%] lg:w-[90%]">
                <div className="relative flex justify-center items-center">
                  <div className=" inset-y-0  start-0 flex items-center pl-4 pointer-events-none">
                    <img src={FooterIcon} alt="" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block  w-full p-3.5  ps-4 text-sm font-Urbanist font-semibold placeholder:text-[#999999]  text-[#ffffff] outline-none rounded-lg"
                    placeholder="Subscribe To Our Newsletter "
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-4  bottom-3 sm:bottom-3.5 "
                  >
                    <img className="w-6 h-6 sm:w-5 sm:h-5" src={FooterIcon2} alt="" />
                  </button>
                </div>
              </form>
            </div>
            {/* SECTION 2  */}
            <div className="flex flex-col lg:justify-end grid-cols-2 gap-5 sm:gap-7 sm:flex-row sm:grid-cols-5 sm:mt-10 lg:w-[65%] md:gap-12">
              {/* TAB 1  */}
              <div>
                <h2 className="mb-4 text-[15px] font-semibold font-Urbanist text-[#999999] uppercase dark:text-white">
                  Quick Links
                </h2>
                <ul className="text-white flex flex-col gap-2 sm:gap-4 dark:text-gray-400 text-[15px] font-[500] font-Urbanist sm:text-[14px]">
                  <li className=" hover:text-[#c4c4c4]">
                    <Link to={"/about-us"}>About Us</Link>
                  </li>
                  <li className=" hover:text-[#c4c4c4]">
                    <Link to={"/terms-of-use"}>Terms of Usage</Link>
                  </li>
                  <li className=" hover:text-[#c4c4c4]">
                    <Link to={"/privacy-policy"}>Privacy Policy</Link>
                  </li>
                  <li className=" hover:text-[#c4c4c4]">
                    <Link to={"/accessibility"}>Accessibility</Link>
                  </li>
                </ul>
              </div>
              {/* TAB 2  */}
              <div>
                <h2 className="mb-4 text-[15px] font-semibold font-Urbanist text-[#999999] uppercase dark:text-white">
                  Properties
                </h2>
                <ul className="text-white flex flex-col gap-2 sm:gap-4 dark:text-gray-400 font-[500] text-[15px] font-Urbanist">
                  <a href={"/#featurelisting"}>
                    <li className=" hover:text-[#c4c4c4]">Featured Listings</li>
                  </a>
                  <a href={"/#OffMarketingListing"}>
                    <li className=" hover:text-[#c4c4c4]">
                      Off-Market Listings
                    </li>
                  </a>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-[15px] font-semibold font-Urbanist text-[#999999] uppercase dark:text-white">
                  Contact Us
                </h2>
                <ul className="flex flex-col gap-2 sm:gap-4 text-white dark:text-gray-400 text-[15px] font-[500] font-Urbanist">
                  <li className=" hover:text-[#c4c4c4]">
                    <Link to={"/contact-us"}>Contact Form</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* COPYRIGHT AND SOCIAL MEDIA  */}
        <div className="bg-[#1A1A1A]">
          <div className=" max-[400px]:px-6 px-10 sm:flex sm:items-center sm:px-8 sm:justify-between  py-6 md:p-4 lg:py-8 mx-auto w-full md:px-20 xl:w-[92%] 2xl:w-[80%] min-[1780px]:!w-[70%]">
            <span className="text-[15px] text-white font-Urbanist sm:text-center dark:text-gray-400">
              © 2026{" "}
              <Link to={"/"} className="hover:underline">
                Newlista
              </Link>
              . All Rights Reserved..
            </span>
            <div className="flex  mt-4 gap-4 sm:justify-center sm:mt-0">
              <Link
                to={"https://www.facebook.com/Newlista"}
                title="Facebook"
                className="text-white hover:bg-PurpleColor bg-[#141414] px-2 py-2 rounded-full dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link
                to={"https://x.com/newlista"}
                title="Twitter"
                className="text-white hover:bg-PurpleColor bg-[#141414] px-2 py-2 rounded-full dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 30 30" className="w-4 h-4 text-white" fill="#fff" >
                  <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                </svg>
                <span className="sr-only">Twitter page</span>
              </Link>
              <Link
                to={"https://www.linkedin.com/in/newlista"}
                title="GitHub"
                className="text-white hover:bg-PurpleColor bg-[#141414] px-2 py-2 rounded-full dark:hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin-icon w-4 h-4 lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                <span className="sr-only">Linkedin</span>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Footer Section END  */}
    </footer>
  );
};

export default Footer;
