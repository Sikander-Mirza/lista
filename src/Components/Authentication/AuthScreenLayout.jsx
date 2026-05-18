import React from 'react'
import { Link } from 'react-router-dom';
import ListingRightArrow from "../../assets/Icons/ListingRightSideArrow.png";



const AuthScreenLayout = ({ children, BannerImage, Heading, Description, SocialLogin, Disclaimer, Style, BackLogin }) => {
    
    const BannerBackground = {
        backgroundImage: `url(${BannerImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#00000026",
        backgroundBlendMode: "color",
    };

    return (
        <>
            <div className=" md:flex min-h-screen max-[769px]:grid  ">

                <div style={BannerBackground} className="md:w-[30%] min-[900px]:!w-[45%] lg:!w-[43%] xl:!w-[48%]">
                    <img
                        className="w-[100%] object-cover h-[20vh] sm:h-[30vh] md:h-full opacity-0"
                        src={BannerImage}
                        alt="Newlista"
                    />
                </div>

                <div className={` flex flex-col justify-center gap-7 py-10 max-[380px]:px-6 px-8 sm:px-16 md:py-20 md:w-[70%] lg:w-[55%] lg:px-20 lg:py-20 xl:py-24  ${Style ? 'xl:px-28' : "xl:px-23"} 2xl:px-32 `}>
                    <div>
                        {BackLogin &&
                            <p className="font-Urbanist  text-Paracolor font-[700] text-[15px] mb-2 sm:mb-1">
                                <Link to={"/login"} className="flex items-center gap-1.5">
                                    <img className="h-3 w-2" src={ListingRightArrow} alt="Newlista" />{" "}
                                    Back to login
                                </Link>
                            </p>
                        }

                        <h1 className={`font-Poppins font-[700] text-[31px] leading-[36px] max-[380px]:text-[26.5px] max-[380px]:leading-[33px] sm:text-[35px] md:text-[35px] sm:leading-[45px] lg:text-[40px] lg:leading-[40px] `}>
                            {Heading}
                        </h1>
                        <p className="font-Urbanist text-Paracolor font-[600] max-[380px]:text-[12px] text-[13px] sm:text-[13.5px] lg:text-[14.5px] mt-2.5 sm:mt-2">
                            {Description}
                        </p>
                    </div>

                    {children}

                    {SocialLogin &&
                        <div>
                            <div className="flex justify-center items-center gap-3 mt-0">
                                <div className="bg-[#a5a5a5] h-0.5 max-[380px]:w-[70px]  w-[80px] sm:w-[90px]"></div>
                                <p className="font-Urbanist text-Paracolor font-[600] max-[380px]:text-[13px] text-[15px] sm:text-[16px] text-center">
                                    or continue with{" "}
                                </p>
                                <div className="bg-[#a5a5a5] h-0.5 max-[380px]:w-[70px] w-[80px] sm:w-[90px]"></div>
                            </div>

                            <div className="flex justify-center gap-2 mt-5">
                                <div id="google-login-button"></div>
                            </div>
                        </div>}

                    {Disclaimer &&
                        <p className="text-xs text-gray-500 mt-4">
                            Disclaimer: Newlista is a networking platform for real estate
                            investors. We do not broker deals, provide investment advice, or vet
                            listings or users. All users are responsible for their own due
                            diligence. Use of this platform is at your own risk.
                        </p>
                    }

                </div>
            </div>
        </>
    )
}

export default AuthScreenLayout