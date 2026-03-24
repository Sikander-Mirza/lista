import React, { useEffect, useState } from 'react'
import SearchBar from '../../SearchBar/SearchBar'
import HeroBg from "../../../assets/Banners/bg-image.jpg";
import MobileBg from "../../../assets/Banners/HeroSectionMobile.webp";
import { Link } from 'react-router-dom';


const HeroSection = () => {
    const token = localStorage.getItem('token')

    const [bgImage, setBgImage] = useState(
        window.innerWidth <= 768 ? MobileBg : HeroBg
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                console.log('hello');

                setBgImage(MobileBg);
            } else {
                setBgImage(HeroBg);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const HeroBackground = {
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "#00000030",
        backgroundBlendMode: "color",
       
    };

    return (
        <>
            <section className='flex flex-col justify-center items-center'>
                <section
                    style={HeroBackground}
                    className="relative max-[400px]:px-6 px-10 -mt-[40%] sm:pt-10 sm:-mt-[18%] max-[891px]:pt-20 min-[891px]:pt-18 md:-mt-[15%] lg:px-8 lg:pt-18 xl:-mt-[10%] xl:pt-14 2xl:pt-40 bg-cover  bg-no-repeat bg-blend-color
                     bg-[center_30px] 
                     2xl:bg-[center_55px]
                     "
                >
                    {/* Hero image area (keeps text below the orbs) */}
                    <div className="h-[370px] sm:h-[330px] md:h-[440px] lg:h-[430px] xl:h-[480px]" />

                    <div className="flex flex-col justify-center items-center pb-28  sm:pb-36 md:pb-20 lg:pb-20">
                        <h1 className="text-[28px] leading-[40px] min-[370px]:!text-[37.5px] min-[370px]:!leading-[47px] sm:!text-[37px] sm:!leading-[46px] md:!text-[42px] md:!leading-[53px] lg:!text-[53px] lg:!leading-[65px] xl:!text-[68px] font-[600] font-Poppins tracking-tight text-white text-center 2xl:w-[66%] 2xl:!leading-[1.2em]">
                            Connect with Commercial Real Estate Investors
                        </h1>

                        <p className='text-[16px] sm:text-[16.5px] lg:text-[20px] font-[500] mt-4 text-white text-center sm:w-[80%]  lg:w-[60%] leading-relaxed'>
                           Join an exclusive commercial real estate investor network to discover off market opportunities, connect with capital partners, and build high value acquisition partnerships
                        </p>

                        <div className="mt-8">
                            <Link to={token ? "/pricing" : "/register"}>
                                <button className="hover-btn-purple hover-btn text-[17.5px] text-Purple px-8 py-3 font-Inter cursor-pointer rounded-full">
                                    <span>Join the Network</span>
                                </button>
                            </Link>
                        </div>

                        <p className='text-[14px] sm:text-[16px] text-center font-[500] mt-5 text-white/90 sm:w-[80%]'>
                            A private network built for active commercial real estate investors
                        </p>
                    </div>
                </section>

                <div className="max-[350px]:w-[90%] w-[75%] sm:w-[50%] md:w-[90%] min-[800px]:w-[80%] lg:w-[100%] xl:w-[97%] 2xl:w-[75%] min-[1780px]:!w-[65%] -mt-17">
                    <SearchBar />
                </div>
            </section>
        </>
    )
}

export default HeroSection