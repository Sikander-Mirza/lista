import React from "react";
import { Field, Label, Select, Switch, Textarea } from "@headlessui/react";
// COMPONENTS
import Navbar from "../../Components/Navbar/Navbar";
import MiniFooter from "../../Components/Footer/MiniFooter";
import Footer from "../../Components/Footer/Footer";
// IMAGES
import AddPropertyBanner from "../../assets/Banners/AddPropertyBanner1.1.jpg";
import ContactImage1_2 from "../../assets/Banners/ContactImage1.2.png";
import ImagePlaceholder from "../../assets/fallback/ImagePlaceholder.png";
import { ChevronDownIcon } from "../../Components/Icons/Icons";

const AddProperty = () => {
  return (
    <>
      <Navbar></Navbar>
      {/* BANNER START  */}
      <section>
        <div>
          <img
            className="h-[40vh] object-cover w-[100%]"
            src={AddPropertyBanner}
            alt="Newlista"
          />
        </div>
      </section>
      {/* BANNER END   */}

      {/* PROPERTY FORM START  */}
      <section className="px-28 py-28 relative overflow-hidden">
        {/* SHAPE  */}
        <div className="absolute -z-10 -end-30 overflow -top-10">
          <img className="w-[80%]" src={ContactImage1_2} alt="" />
        </div>

        {/* CONTACT FORM SECTION */}
        <div className="w-[70%] flex flex-col gap-8">
          {/* CONTACT INFO  */}
          <div>
            <h1 className="text-7xl font-[700] font-Urbanist  text-[#1E1E1E] sm:text-[43px] leading-[48px]">
              Add a Property
            </h1>
            <p className="text-md font-Inter font-medium text-pretty text-Paracolor mt-2 sm:text-[14px]/8 sm:leading-[18px] ">
              List your property to attract serious buyers, investors, and
              tenants.
            </p>
          </div>

          {/* CONTACT FORM */}
          <form className="flex flex-col gap-7">
            <div className="flex gap-5 w-[100%]">
              <span className="w-[100%]">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Property Title
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-[#F3EEFF] border-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
                  placeholder="Enter property title (e.g., Downtown Office Tower)"
                />
              </span>
            </div>
            <div>
              <label
                for="text"
                className="block mb-1 text-[15px] font-[700] text-[#222222]"
              >
                Street Address
              </label>
              <input
                type="email"
                id="email"
                className="bg-[#F3EEFF] border-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
                placeholder="Enter street address"
              />
            </div>
            <div className=" flex gap-14">
              <div className="w-[50%] relative">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Country
                </label>
                <Select
                  className={
                    "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                  }
                  name="status"
                  aria-label="Project status"
                >
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px] "
                    value="active"
                  >
                    Select country
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="paused"
                  >
                    Paused
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="delayed"
                  >
                    Delayed
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="canceled"
                  >
                    Canceled
                  </option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-10 right-2.5 size-5 fill-black/60"
                  aria-hidden="true"
                />
              </div>
              <div className="w-[50%] relative">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  State/Province
                </label>
                <Select
                  className={
                    "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                  }
                  name="status"
                  aria-label="Project status"
                >
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px] "
                    value="active"
                  >
                    Select state or province
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="paused"
                  >
                    Paused
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="delayed"
                  >
                    Delayed
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="canceled"
                  >
                    Canceled
                  </option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-10 right-2.5 size-5 fill-black/60"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className=" flex gap-14">
              <div className="w-[50%]">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Zip/Postal Code
                </label>
                <input
                  type="number"
                  id="email"
                  className="bg-[#F3EEFF] border-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
                  placeholder="Enter zip/postal code"
                />
              </div>
              <div className="w-[50%] relative">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Enter City
                </label>
                <Select
                  className={
                    "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                  }
                  name="status"
                  aria-label="Project status"
                >
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px] "
                    value="active"
                  >
                    Enter city
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="paused"
                  >
                    Paused
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="delayed"
                  >
                    Delayed
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="canceled"
                  >
                    Canceled
                  </option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-10 right-2.5 size-5 fill-black/60"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className=" flex gap-14">
              <div className="w-[50%] relative">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Property Type
                </label>
                <Select
                  className={
                    "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                  }
                  name="status"
                  aria-label="Project status"
                >
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px] "
                    value="active"
                  >
                    Commercial for Sale
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="paused"
                  >
                    Paused
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="delayed"
                  >
                    Delayed
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="canceled"
                  >
                    Canceled
                  </option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-10 right-2.5 size-5 fill-black/60"
                  aria-hidden="true"
                />
              </div>
              <div className="w-[50%]">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Price / Lease Amount
                </label>
                <input
                  type="number"
                  id="email"
                  className="bg-[#F3EEFF] border-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
                  placeholder="Enter price (e.g., $2,500,000) or lease rate"
                />
              </div>
            </div>
            <div className=" flex gap-14">
              <div className="w-[50%] relative">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Square Footage
                </label>
                <Select
                  className={
                    "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                  }
                  name="status"
                  aria-label="Project status"
                >
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px] "
                    value="active"
                  >
                    Select country
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="paused"
                  >
                    Paused
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="delayed"
                  >
                    Delayed
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="canceled"
                  >
                    Canceled
                  </option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-10 right-2.5 size-5 fill-black/60"
                  aria-hidden="true"
                />
              </div>
              <div className="w-[50%] relative">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  State/Province
                </label>
                <Select
                  className={
                    "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                  }
                  name="status"
                  aria-label="Project status"
                >
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px] "
                    value="active"
                  >
                    Select state or province
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="paused"
                  >
                    Paused
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="delayed"
                  >
                    Delayed
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="canceled"
                  >
                    Canceled
                  </option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-10 right-2.5 size-5 fill-black/60"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className=" flex gap-14">
              <div className="w-[50%]">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Zip/Postal Code
                </label>
                <input
                  type="number"
                  id="email"
                  className="bg-[#F3EEFF] border-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
                  placeholder="Enter zip/postal code"
                />
              </div>
              <div className="w-[50%] relative">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  Enter City
                </label>
                <Select
                  className={
                    "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none appearance-none "
                  }
                  name="status"
                  aria-label="Project status"
                >
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px] "
                    value="active"
                  >
                    Enter city
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="paused"
                  >
                    Paused
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="delayed"
                  >
                    Delayed
                  </option>
                  <option
                    className="text-[#1a1919] font-[500] font-Urbanist text-[14px]"
                    value="canceled"
                  >
                    Canceled
                  </option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-10 right-2.5 size-5 fill-black/60"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="flex gap-14">
              <div className="w-[50%]">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  NOI (Net Operating Income)
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-[#F3EEFF] border-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
                  placeholder="Enter NOI"
                />
              </div>
              <div className="w-[50%]">
                <label
                  for="text"
                  className="block mb-1 text-[15px] font-[700] text-[#222222]"
                >
                  CAP Rate
                </label>
                <input
                  type="number"
                  id="email"
                  className="bg-[#F3EEFF] border-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-[100%] h-12 px-4 rounded-[6px] outline-none"
                  placeholder="Enter CAP rate (e.g., 6%)"
                />
              </div>
            </div>
            <div className="border-dashed pb-4 border-b-[1px] border-[#BBBBBB] ">
              <label
                for="text"
                className="block mb-3 text-[15px] font-[700] text-[#222222]"
              >
                Lease Type
              </label>
              <div class="flex items-center mb-4 gap-5">
                <span className="flex justify-center items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-PurpleColor bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    NNN (Triple Net Lease)
                  </label>
                </span>
                <span className="flex justify-center items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-PurpleColor bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    NNN (Triple Net Lease)
                  </label>
                </span>
                <span className="flex justify-center items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    class="w-4 h-4 text-PurpleColor bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-1"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    NNN (Triple Net Lease)
                  </label>
                </span>
              </div>
            </div>

            <div className="border-[#BBBBBB] border-[1px] border-solid flex gap-3 px-5 py-7 w-[70%] items-center rounded-[5px]">
              <div>
                <img src={ImagePlaceholder} alt="" />
              </div>
              <div>
                <label
                  class="block mb-2 text-[16px] font-semibold text-gray-900 dark:text-white font-Urbanist italic"
                  for="file_input"
                >
                  Upload at least one image to showcase your property.
                </label>
                <div className="bg-[#F8FCFF] py-2 px-3">
                  <input
                    className="text-PurpleColor  border-solid border-[1px] font-Inter font-semibold px-2 py-2.5 border-PurpleColor rounded-[7px]"
                    type="file"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="border-dashed py-7 border-y-[1px] border-[#BBBBBB]">
              <label
                for="text"
                className="block mb-1 text-[15px] font-[700] text-[#222222]"
              >
                Property Description
              </label>
              <Textarea
                className={
                  "bg-[#F3EEFF] border-[#F3EEFF] text-[#868686] font-[500] font-Urbanist text-[15px] w-[100%]  px-4 rounded-[6px] outline-none py-5"
                }
                rows={6}
                name="description"
                placeholder="Describe the property, its features, location advantages, and any unique selling points."
              ></Textarea>
            </div>
            {/* SWITCH  */}
            <div className="flex gap-28">
              <div className="flex  items-center gap-2">
                <Switch
                  // checked={enabled}
                  // onChange={}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-PurpleColor outline-none"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>
                <label className="block font-Urbanist text-[15px] font-[600] text-[#222222]">
                  Make this Property Off the Market
                </label>
              </div>
              <div className="flex  items-center gap-2">
                <Switch
                  // checked={enabled}
                  // onChange={}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-PurpleColor outline-none"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>
                <label className="block font-Urbanist text-[15px] font-[600] text-[#222222]">
                  Make this a Featured Listing
                </label>
              </div>
            </div>
            <p className="font-Urbanist text-[15px] font-semibold text-Paracolor -mt-[15px]">
              Note: Off-the-market properties will not be shown to free users.
            </p>

            {/* Send Message Button */}
            <div className="mt-1 flex justify-end gap-5">
              <button className="bg-transparent border-[#6C757D] cursor-pointer text-[17px] border-solid border-[2px] font-[600] px-6 py-2.5 text-[#6C757D] font-Urbanist rounded-[6px]">
                Save Draft
              </button>
              <button className="bg-PurpleColor font-[600] cursor-pointer text-[17px] px-6 py-2.5 text-white font-Urbanist rounded-[6px]">
                Submit Listing
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* PROPERTY FORM END  */}

      <MiniFooter></MiniFooter>
      <Footer></Footer>
    </>
  );
};

export default AddProperty;
