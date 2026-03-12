import React from 'react'
import HomeSec5_1 from "../../../assets/Illustration/HomeSec5.1.png";
import HomeSec5_2 from "../../../assets/Illustration/HomeSec5.2.png";
import { Link } from 'react-router-dom';

const PropertySell = () => {
    const token = localStorage.getItem("token")
    return (
        <>
            <section className="flex flex-col justify-center gap-6  px-6 py-20 sm:pt-12 sm:gap-5 sm:pb-9 lg:pb-20 sm:px-8 md:px-0 md:items-center w-[100%] xl:w-[94%] 2xl:w-[80%]">
                <div className="md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%]">
                    <h1 className="text-[30px] leading-[38px] font-[700] font-Urbanist  text-[#1E1E1E] sm:text-[33px] sm:leading-[48px] md:text-[30px]">
                        Have a Property to Sell?
                    </h1>
                </div>
                <div className="md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%] border-solid border-[1px] border-[#BBBBBB] flex flex-col items-center rounded-[10px] pb-7 pt-3 md:py-4 lg:py-5 xl:py-0  md:flex-row relative">
                    <div className="w-[65%] sm:w-[32%]  md:w-[25%] sm:h-[90%]">
                        <img className="" src={HomeSec5_1} alt="" />
                    </div>
                    <div className="flex flex-col justify-center items-center text-center gap-5 py-2 px-5 sm:px-10 md:w-[50%] md:px-3 lg:px-5 xl:px-20 ">
                        <h1 className="font-Inter font-bold text-[20px] leading-[25px] sm:text-[22px] md:text-[20px] lg:text-[22px] sm:leading-[25px]">
                            Reach serious buyers, close deals faster, and maximize your
                            property's potential.{" "}
                        </h1>
                        <Link className="w-full" to={`${token ? '/create-property' : "/login"} `}>
                            <button className="hover-btn-purple hover-btn py-2.5 text-[14px] text-white font-Inter rounded-[8px] w-full cursor-pointer">
                                <span>Sell your Property</span>
                            </button>
                        </Link>
                    </div>
                    <div className="hidden md:block  w-[25%] h-[90%]">
                        <img className="" src={HomeSec5_2} alt="" />
                    </div>
                </div>
            </section></>
    )
}

export default PropertySell